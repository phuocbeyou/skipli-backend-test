import { Router } from 'express';
import { createNewAccessCode, verifyAccessCode } from '@controllers/auth.controller';

const router = Router();

// POST v1/api/auth/create-access-code
// body: { phone_number }
router.post('/auth/create-access-code', createNewAccessCode);

// POST v1/api/auth/verify-access-code
// body: {phoneNumber, accessCode}
router.post('/auth/verify-access-code', verifyAccessCode);

export default router;
