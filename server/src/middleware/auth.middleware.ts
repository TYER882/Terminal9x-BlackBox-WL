import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export type AuthRequest = Request & { userId?: string };

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing bearer token." });
    }

    const token = header.slice(7);
    const payload = verifyToken(token);
    const user = await User.findById(payload.userId).select("_id");

    if (!user) return res.status(401).json({ message: "Invalid token user." });

    req.userId = String(user._id);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized." });
  }
}
