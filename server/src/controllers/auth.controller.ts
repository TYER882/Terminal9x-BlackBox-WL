import bcrypt from "bcryptjs";
import type { Response } from "express";
import { AgentPassport, divisions } from "../models/AgentPassport.js";
import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const ADMIN_INVITE_CODES = new Set([
  "T9X-ALPHA",
  "BLACKBOX-001",
  "DEM9X",
  "EARLYAGENT",
  "CASEZERO",
]);

const CAMPAIGN_INVITE_CODES = new Set([
  "TWITTER-X01",
  "DISCORD-NODE7",
  "EARLY-CASEFILE",
  "BLACKBOX-WL",
]);

function sanitizeUsername(value: string) {
  return value.trim().replace(/\s+/g, "_").replace(/[^A-Za-z0-9_]/g, "").slice(0, 32);
}

function normalizeCode(value?: string) {
  return value?.trim().toUpperCase().replace(/\s+/g, "") || "";
}

function codenamePrefix(username: string) {
  const safe = username.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  return safe || "AGENT";
}

function randomSegment(length = 4) {
  return Math.random().toString(36).slice(2, 2 + length).toUpperCase();
}

async function makeUniqueAgentId() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = `CIAP-${randomSegment(6)}`;
    const exists = await AgentPassport.exists({ agentId: code });
    if (!exists) return code;
  }

  return `CIAP-${Date.now().toString(36).slice(-6).toUpperCase()}`;
}

async function makeUniqueReferralCode(username: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = `${codenamePrefix(username)}-${randomSegment(4)}`;
    const exists = await AgentPassport.exists({ referralCode: code });
    if (!exists) return code;
  }
  return `${codenamePrefix(username)}-${Date.now().toString(36).slice(-5).toUpperCase()}`;
}

async function makeUniqueWhitelistCode(username: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = `T9X-WL-${codenamePrefix(username)}-${randomSegment(6)}`;
    const exists = await AgentPassport.exists({ whitelistCode: code });
    if (!exists) return code;
  }
  return `T9X-WL-${codenamePrefix(username)}-${Date.now().toString(36).slice(-6).toUpperCase()}`;
}


async function ensurePassportReferralFields(passport: any) {
  if (!passport) return passport;

  let changed = false;
  if (!passport.agentId) {
    passport.agentId = await makeUniqueAgentId();
    changed = true;
  }
  if (!passport.referralCode) {
    passport.referralCode = await makeUniqueReferralCode(passport.codename || "AGENT");
    changed = true;
  }
  if (!passport.whitelistCode) {
    passport.whitelistCode = await makeUniqueWhitelistCode(passport.codename || "AGENT");
    changed = true;
  }
  if (!passport.avatarUrl) {
    passport.avatarUrl = "/agents/unrevealed-agent.png";
    changed = true;
  }

  if (changed) await passport.save();
  return passport;
}

async function resolveInviteCode(input?: string) {
  const code = normalizeCode(input);
  if (!code) {
    return {
      code: undefined,
      source: "none" as const,
      referredByPassportId: undefined,
      priorityBoost: 0,
    };
  }

  if (ADMIN_INVITE_CODES.has(code)) {
    return {
      code,
      source: "admin" as const,
      referredByPassportId: undefined,
      priorityBoost: 25,
    };
  }

  if (CAMPAIGN_INVITE_CODES.has(code)) {
    return {
      code,
      source: "campaign" as const,
      referredByPassportId: undefined,
      priorityBoost: 15,
    };
  }

  const referrer = await AgentPassport.findOne({
    $or: [{ referralCode: code }, { whitelistCode: code }],
  });

  if (!referrer) {
    const error = new Error("Invite or referral code is not recognized.") as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }

  return {
    code,
    source: "agent" as const,
    referredByPassportId: referrer._id,
    priorityBoost: 10,
  };
}

export async function register(req: AuthRequest, res: Response) {
  const { username, email, password, division, referralCode } = req.body as {
    username?: string;
    email?: string;
    password?: string;
    division?: string;
    referralCode?: string;
  };

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  const cleanUsername = sanitizeUsername(username);
  if (cleanUsername.length < 3) {
    return res.status(400).json({ message: "Codename must contain at least 3 valid characters." });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase().trim() }, { username: cleanUsername }],
  });

  if (existingUser) {
    return res.status(409).json({
      message:
        existingUser.email === email.toLowerCase().trim()
          ? "Email is already registered. Please login instead."
          : "Codename is already taken. Choose another codename.",
    });
  }

  const selectedDivision = division && divisions.includes(division as never) ? division : "Cipher Analyst";
  const invite = await resolveInviteCode(referralCode);
  const passwordHash = await bcrypt.hash(password, 12);
  const ownAgentId = await makeUniqueAgentId();
  const ownReferralCode = await makeUniqueReferralCode(cleanUsername);
  const whitelistCode = await makeUniqueWhitelistCode(cleanUsername);

  const user = await User.create({
    username: cleanUsername,
    email: email.toLowerCase().trim(),
    passwordHash,
  });

  const passport = await AgentPassport.create({
    userId: user._id,
    agentId: ownAgentId,
    codename: cleanUsername,
    division: selectedDivision,
    freeMintEligible: true,
    whitelistStatus: "reserved",
    whitelistCode,
    referralCode: ownReferralCode,
    referredByCode: invite.code,
    referredByPassportId: invite.referredByPassportId,
    inviteSource: invite.source,
    waitlistPriority: invite.priorityBoost,
    whitelistJoinedAt: new Date(),
  });

  if (invite.source === "agent" && invite.referredByPassportId) {
    await AgentPassport.findByIdAndUpdate(invite.referredByPassportId, {
      $inc: { referralCount: 1, referralPoints: 10, waitlistPriority: 5 },
    });
  }

  const token = signToken(String(user._id));
  res.status(201).json({ token, user: user.toJSON(), passport });
}
export async function me(req: AuthRequest, res: Response) {
  const user = await User.findById(req.userId);
  const passport = await ensurePassportReferralFields(await AgentPassport.findOne({ userId: req.userId }));
  res.json({ user, passport });
}

export async function login(req: AuthRequest, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const passport = await ensurePassportReferralFields(
    await AgentPassport.findOne({ userId: user._id })
  );

  if (!passport) {
    return res.status(403).json({ message: "Agent passport is missing." });
  }

  const token = signToken(String(user._id));

  return res.json({
    token,
    user: user.toJSON(),
    passport,
  });
}
