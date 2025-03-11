import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';

const globalErrorHanalar : ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  error: err;

  let errorSources : TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    }
  ]


  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if(err?.name === 'ValidationError'){
    const handleValidationError = ''
    
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'developmentt' ? err.stack : undefined,
  });
};

export default globalErrorHanalar;
