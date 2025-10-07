// routes/user.route.js
import express from 'express';
import userController from '../controller/user.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';
import { checkIsAdmin } from '../middleware/auth.middleware.js'; // <-- 1. IMPORT THE MIDDLEWARE

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', checkIsAdmin, userController.login);

router.get('/me', verifyToken, userController.getMe);
router.patch('/me', verifyToken, userController.updateMe);

export default router;