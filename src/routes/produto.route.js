import express from 'express';
import produtoController from '../controller/produto.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';
import { uploadImage } from '../middleware/upload.middleware.js';

const router = express.Router();

// Rota para criar um novo produto (POST /produtos)
router.post('/', verifyToken, uploadImage, produtoController.createProduto);

// Rota para buscar todos os produtos (GET /produtos)
router.get('/', produtoController.getAllProdutos);

// Rota para buscar um produto por ID (GET /produtos/:id)
router.get('/:id', produtoController.getProdutoById);

// Rota para atualizar um produto por ID (PATCH /produtos/:id)
router.patch('/:id', verifyToken, uploadImage, produtoController.updateProdutoById);

// Rota para deletar um produto por ID (DELETE /produtos/:id)
router.delete('/:id', verifyToken, produtoController.deleteProdutoById);

export default router;