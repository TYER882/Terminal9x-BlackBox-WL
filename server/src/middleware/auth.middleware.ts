import type { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export type AuthRequest = Request & {
  userId?: string;
};

export const requireAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Missing bearer token." });
      return;
    }

    const token = header.slice(7);
    const payload = verifyToken(token);
    const user = await User.findById(payload.userId).select("_id");

    if (!user) {
      res.status(401).json({ message: "Invalid token user." });
      return;
    }

    authReq.userId = String(user._id);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized." });
  }
};
