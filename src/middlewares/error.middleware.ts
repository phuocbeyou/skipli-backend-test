import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

// Đúng cách định nghĩa error middleware trong Express với TypeScript
export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Type guard để kiểm tra nếu err là instance của AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Xử lý lỗi mặc định
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};