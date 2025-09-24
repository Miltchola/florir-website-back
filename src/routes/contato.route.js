import express from 'express';
import contatoController from '../controller/contato.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

// Rota para criar um novo contato (POST /contatos)
router.post('/', verifyToken, contatoController.createContato);

// Rota para buscar todos os contatos (GET /contatos)
router.get('/', contatoController.getAllContatos);

// Rota para buscar um contato por ID (GET /contatos/:id)
router.get('/:id', contatoController.getContatoById);

// Rota para atualizar um contato por ID (PATCH /contatos/:id)
router.patch('/:id', verifyToken, contatoController.updateContatoById);

// Rota para deletar um contato por ID (DELETE /contatos/:id)
router.delete('/:id', verifyToken, contatoController.deleteContatoById);

export default router;