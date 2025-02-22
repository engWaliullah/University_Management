import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    error: '',
  });
};

export default notFound;
