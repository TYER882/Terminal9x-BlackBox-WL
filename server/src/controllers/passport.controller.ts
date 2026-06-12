
import { AgentPassport, divisions } from "../models/AgentPassport.js";
import { User } from "../models/User.js";
import type { ApiResponse, AuthRequest } from "../types/auth.js";
function getAuthUserId(req: AuthRequest) {
  return req.user?.id;
}

export async function getMyPassport(req: AuthRequest, res: ApiResponse) {
  const userId = getAuthUserId(req);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }

  const passport = await AgentPassport.findOne({ userId });

  if (!passport) {
    return res.status(404).json({
      message: "Passport not found.",
    });
  }

  return res.json({ passport });
}

export async function updateMyPassport(req: AuthRequest, res: ApiResponse) {
  const userId = getAuthUserId(req);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }

  const { codename, division, avatarUrl, avatarId, walletAddress } =
    req.body as {
      codename?: string;
      division?: string;
      avatarUrl?: string;
      avatarId?: string;
      walletAddress?: string;
    };

  if (division && !divisions.includes(division as never)) {
    return res.status(400).json({
      message: "Invalid division.",
    });
  }

  const update: Record<string, unknown> = {};

  if (codename) {
    update.codename = codename.trim().slice(0, 32);
  }

  if (division) {
    update.division = division;
  }

  if (avatarUrl !== undefined) {
    update.avatarUrl = avatarUrl.trim();
  }

  if (avatarId !== undefined) {
    update.avatarId = avatarId.trim();
  }

  const passport = await AgentPassport.findOneAndUpdate(
    { userId },
    update,
    {
      new: true,
      runValidators: true,
    }
  );

  if (walletAddress) {
    await User.findByIdAndUpdate(userId, {
      walletAddress: walletAddress.toLowerCase().trim(),
    });
  }

  const user = await User.findById(userId);

  return res.json({
    user: user ? user.toJSON() : null,
    passport,
  });
}

export async function markMinted(req: AuthRequest, res: ApiResponse) {
  const userId = getAuthUserId(req);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }

  const { tokenId, txHash, walletAddress } = req.body as {
    tokenId?: string;
    txHash?: string;
    walletAddress?: string;
  };

  if (!tokenId || !txHash || !walletAddress) {
    return res.status(400).json({
      message: "tokenId, txHash, and walletAddress are required.",
    });
  }

  const cleanWalletAddress = walletAddress.toLowerCase().trim();

  const passport = await AgentPassport.findOneAndUpdate(
    {
      userId,
      passportMinted: false,
    },
    {
      passportMinted: true,
      passportTokenId: tokenId,
      passportTxHash: txHash,
      walletAddress: cleanWalletAddress,
      mintedAt: new Date(),
      freeMintEligible: false,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!passport) {
    return res.status(409).json({
      message: "Passport already minted or not found.",
    });
  }

  await User.findByIdAndUpdate(userId, {
    walletAddress: cleanWalletAddress,
  });

  return res.json({ passport });
}