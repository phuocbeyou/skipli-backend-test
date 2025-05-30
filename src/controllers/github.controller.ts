import { Request, Response, NextFunction } from 'express';
import { AppError } from '@utils/app-error';
import { successResponse } from '@utils/response';
import {
  searchGithubUsers,
  findGithubUserProfile,
  likeGithubUser,
  getUserProfile,
} from '@services/github.service';

export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, page = '1', per_page = '30' } = req.query;
    if (!q || typeof q !== 'string') throw new AppError('Query q is required', 400);

    const users = await searchGithubUsers(q, Number(page), Number(per_page));
    successResponse(res, users);
  } catch (err) {
    next(err);
  }
};

export const getUserProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.query.github_user_id);
    if (!id) throw new AppError('github_user_id is required', 400);

    const profile = await findGithubUserProfile(id);
    successResponse(res, profile);
  } catch (err) {
    next(err);
  }
};

export const likeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone_number, github_user_id } = req.body;
    if (!phone_number || !github_user_id) {
      throw new AppError('phone_number and github_user_id are required', 400);
    }

    await likeGithubUser(phone_number, Number(github_user_id));
    successResponse(res, null, 'Liked successfully');
  } catch (err) {
    next(err);
  }
};

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phone = req.query.phone_number as string;
    if (!phone) throw new AppError('phone_number is required', 400);

    const favorites = await getUserProfile(phone);
    successResponse(res, { favorite_github_users: favorites });
  } catch (err) {
    next(err);
  }
};
