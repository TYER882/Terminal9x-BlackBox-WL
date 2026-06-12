import type { ApiNext, ApiResponse, AuthRequest } from "../types/auth.js";

export function errorMiddleware(
  err: unknown,
  _req: AuthRequest,
  res: ApiResponse,
  _next: ApiNext
) {
  const message = err instanceof Error ? err.message : "Internal server error";

  return res.status(500).json({
    message,
  });
}