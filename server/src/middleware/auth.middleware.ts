import jwt from "jsonwebtoken";
import type { ApiNext, ApiResponse, AuthRequest, AuthUser } from "../types/auth.js";

type JwtPayload = {
  id?: string;
  sub?: string;
  email?: string;
  agentId?: string;
  role?: "agent" | "master";
};

export function requireAuth(
  req: AuthRequest,
  res: ApiResponse,
  next: ApiNext
) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Missing authorization token.",
    });
  }

  const token = header.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret"
    ) as JwtPayload;

    const userId = decoded.id || decoded.sub;

    if (!userId) {
      return res.status(401).json({
        message: "Invalid authorization token.",
      });
    }

    const user: AuthUser = {
      id: userId,
      email: decoded.email,
      agentId: decoded.agentId,
      role: decoded.role,
    };

    req.user = user;

    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid authorization token.",
    });
  }
}