import express from 'express';
import perguntaController from '../controller/pergunta.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

// Rota para criar uma nova pergunta (POST /perguntas)
router.post('/', verifyToken, perguntaController.createPergunta);

// Rota para buscar todas as perguntas (GET /perguntas)
router.get('/', perguntaController.getAllPerguntas);

// Rota para buscar uma pergunta por ID (GET /perguntas/:id)
router.get('/:id', perguntaController.getPerguntaById);

// Rota para atualizar uma pergunta por ID (PATCH /perguntas/:id)
router.patch('/:id', verifyToken, perguntaController.updatePerguntaById);

// Rota para deletar uma pergunta por ID (DELETE /perguntas/:id)
router.delete('/:id', verifyToken, perguntaController.deletePerguntaById);

export default router;