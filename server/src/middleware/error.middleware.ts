import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

type HttpError = Error & {
  statusCode?: number;
  code?: number | string;
};

export const errorMiddleware: ErrorRequestHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);

  if (err?.code === 11000) {
    res.status(409).json({ message: "Email or username already exists." });
    return;
  }

  res.status(err.statusCode ?? 500).json({
    message: err.message ?? "Internal server error.",
  });
};
