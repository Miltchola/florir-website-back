import express from 'express';
import userController from '../controller/user.controller.js';

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', userController.register);

// Rota para autenticar um usuário e obter um token
router.post('/login', userController.login);

// Rota para buscar um usuário por nome de usuário ou email
router.get('/:identifier', userController.getUserByIdentifier);

// Rota para atualizar as informações do perfil de um usuário
router.put('/:identifier/profile', userController.updateProfile);

export default router;