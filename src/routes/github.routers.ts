import { Router } from 'express';
import {
  searchUsers,
  getUserProfileById,
  likeUser,
  getFavorites,
} from '@controllers/github.controller';

const router = Router();

// GET  /v1/api/github/search-github-users?q=&page=&per_page=
router.get('/search-github-users', searchUsers);

// GET  /v1/api/github/find-github-user-profile?github_user_id=
router.get('/find-github-user-profile', getUserProfileById);

// POST /v1/api/github/like-github-user
// body: { phone_number, github_user_id }
router.post('/like-github-user', likeUser);

// GET  /v1/api/github/get-user-profile?phone_number=
router.get('/get-user-profile', getFavorites);

export default router;
