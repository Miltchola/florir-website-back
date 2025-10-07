import express from 'express';
import textoController from '../controller/texto.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

// Rota para criar um novo texto (POST /textos)
router.post('/', verifyToken, textoController.createTexto);

// Rota para buscar todos os textos (GET /textos)
router.get('/', textoController.getAllTextos);

// Rota para buscar um texto por ID (GET /textos/:id)
router.get('/:id', textoController.getTextoById);

// Rota para atualizar um texto por ID (PATCH /textos/:id)
router.patch('/:id', verifyToken, textoController.updateTextoById);

// Rota para deletar um texto por ID (DELETE /textos/:id)
router.delete('/:id', verifyToken, textoController.deleteTextoById);

export default router;