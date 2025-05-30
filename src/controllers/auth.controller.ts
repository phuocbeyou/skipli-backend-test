import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@utils/response';
import { AppError } from '@utils/app-error';
import { createAccessCodeForPhone } from '@services/auth.service';
import { phoneSchema,verifyCodeSchema } from '@models/auth.model';
import { clearAccessCode, getAccessCode } from '@services/access-code.service';

export const createNewAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parseResult = phoneSchema.safeParse(req.body);

    if (!parseResult.success) {
      const message = parseResult.error.errors[0].message;
      throw new AppError(message, 400);
    }

    const { phoneNumber } = parseResult.data;

    const accessCode = await createAccessCodeForPhone(phoneNumber);

    successResponse(res, { accessCode }, 'Access code generated'); // option res access code test 
  } catch (err) {
    next(err);
  }
};

export const verifyAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parseResult = verifyCodeSchema.safeParse(req.body);

    if (!parseResult.success) {
      const message = parseResult.error.errors[0].message;
      throw new AppError(message, 400);
    }

    const { phoneNumber, accessCode } = parseResult.data;

    const storedCode = await getAccessCode(phoneNumber);
    if (!storedCode) {
      throw new AppError('Phone number not found or code expired', 404);
    }

    if (storedCode !== accessCode) {
      throw new AppError('Access code does not match', 401);
    }

    await clearAccessCode(phoneNumber);

    successResponse(res, null, 'Access code verified successfully');
  } catch (err) {
    next(err);
  }
};