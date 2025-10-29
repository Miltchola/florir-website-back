import express from 'express';
import imagemCarrosselController from '../controller/imagemCarrossel.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';
import { uploadImage } from '../middleware/upload.middleware.js';

const router = express.Router();

// Rota para criar uma nova imagem de carrossel (POST /)
router.post('/', verifyToken, uploadImage, imagemCarrosselController.createImagemCarrossel);

// Rota para buscar todas as imagens de carrossel (GET /)
router.get('/', imagemCarrosselController.getAllImagensCarrossel);

// Rota para buscar uma imagem de carrossel por ID (GET /:id)
router.get('/:id', imagemCarrosselController.getImagemCarrosselById);

// Rota para atualizar uma imagem de carrossel por ID (PATCH /:id)
router.patch('/:id', verifyToken, uploadImage, imagemCarrosselController.updateImagemCarrosselById);

// Rota para deletar uma imagem de carrossel por ID (DELETE /:id)
router.delete('/:id', verifyToken, imagemCarrosselController.deleteImagemCarrosselById);

export default router;