
export function asyncHandler(handler: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(handler(req, res, next)).catch((error) => {
      next(error);
    });
  };
}
