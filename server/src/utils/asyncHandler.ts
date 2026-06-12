import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRouteHandler<TReq extends Request = Request> = (
  req: TReq,
  res: Response,
  next: NextFunction
) => unknown | Promise<unknown>;

export function asyncHandler<TReq extends Request = Request>(
  fn: AsyncRouteHandler<TReq>
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    void Promise.resolve(fn(req as TReq, res, next)).catch((error: unknown) => {
      next(error);
    });
  };
}
