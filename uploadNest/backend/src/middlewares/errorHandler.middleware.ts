import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';
import { HTTPSTATUS } from '../config/http.config';
import { AppError } from '../utils/app-error';
import { logger } from '../utils/logger';
import { ErrorCodeEnum } from '../enums/error-code.enum';

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: 'Validation failed',
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
): any => {
  logger.error(`Error occured on PATH: ${req.path}`, {
    body: req.body,
    params: req.params,
    error,
  });

  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid json format, please check your request body',
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server error',
    error: error?.message || 'Unknown error',
  });
};
