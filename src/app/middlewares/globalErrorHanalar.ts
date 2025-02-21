import { NextFunction, Request, Response } from 'express';

const globalErrorHanalar = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong';
  error: err;

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHanalar;
