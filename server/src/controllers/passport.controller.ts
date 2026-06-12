import type { Response } from "express";
import { AgentPassport, divisions } from "../models/AgentPassport.js";
import { User } from "../models/User.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export async function getMyPassport(req: AuthRequest, res: Response) {
  const passport = await AgentPassport.findOne({ userId: req.userId });
  if (!passport) return res.status(404).json({ message: "Passport not found." });
  res.json({ passport });
}

export async function updateMyPassport(req: AuthRequest, res: Response) {
  const { codename, division, avatarUrl, avatarId, walletAddress } = req.body as {
    codename?: string;
    division?: string;
    avatarUrl?: string;
    avatarId?: string;
    walletAddress?: string;
  };

  if (division && !divisions.includes(division as never)) {
    return res.status(400).json({ message: "Invalid division." });
  }

  const update: Record<string, unknown> = {};
  if (codename) update.codename = codename.trim().slice(0, 32);
  if (division) update.division = division;
  if (avatarUrl !== undefined) update.avatarUrl = avatarUrl.trim();
  if (avatarId !== undefined) update.avatarId = avatarId.trim();

  const passport = await AgentPassport.findOneAndUpdate({ userId: req.userId }, update, {
    new: true,
    runValidators: true,
  });

  if (walletAddress) {
    await User.findByIdAndUpdate(req.userId, { walletAddress: walletAddress.toLowerCase().trim() });
  }

  const user = await User.findById(req.userId);
  res.json({ user, passport });
}

export async function markMinted(req: AuthRequest, res: Response) {
  const { tokenId, txHash, walletAddress } = req.body as {
    tokenId?: string;
    txHash?: string;
    walletAddress?: string;
  };

  if (!tokenId || !txHash || !walletAddress) {
    return res.status(400).json({ message: "tokenId, txHash, and walletAddress are required." });
  }

  const passport = await AgentPassport.findOneAndUpdate(
    { userId: req.userId, passportMinted: false },
    {
      passportMinted: true,
      passportTokenId: tokenId,
      passportTxHash: txHash,
      walletAddress: walletAddress.toLowerCase().trim(),
      mintedAt: new Date(),
      freeMintEligible: false,
    },
    { new: true }
  );

  if (!passport) {
    return res.status(409).json({ message: "Passport already minted or not found." });
  }

  await User.findByIdAndUpdate(req.userId, { walletAddress: walletAddress.toLowerCase().trim() });
  res.json({ passport });
}
