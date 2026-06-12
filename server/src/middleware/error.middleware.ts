import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err?.code === 11000) {
    return res.status(409).json({ message: "Email or username already exists." });
  }

  res.status(err.statusCode ?? 500).json({
    message: err.message ?? "Internal server error.",
  });
};
