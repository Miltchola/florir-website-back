import express from 'express';
import userController from '../controller/user.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';
import { checkIsAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Rota para registrar um novo usuário (POST /register)
router.post('/register', userController.register);

// Rota para logar o usuário (somente se for Admin) (POST /login)
router.post('/login', checkIsAdmin, userController.login);

// Rota para acessar os dados do usuário logado no momento (GET /me)
router.get('/me', verifyToken, userController.getMe);

// Rota para atualizar os dados do usuário logado no momento (PATCH /me)
router.patch('/me', verifyToken, userController.updateMe);

// Rota para deletar o usuário logado no momento (DELETE /me)
router.delete('/me', verifyToken, userController.deleteMe);

export default router;