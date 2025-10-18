import express from 'express';
import heroSectionController from '../controller/heroSection.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

// Rota para criar uma nova seção hero (POST /)
router.post('/', verifyToken, heroSectionController.createHeroSection);

// Rota para buscar todas as seções hero (GET /)
router.get('/', heroSectionController.getAllHeroSections);

// Rota para buscar uma seção hero por ID (GET /:id)
router.get('/:id', heroSectionController.getHeroSectionById);

// Rota para atualizar uma seção hero por ID (PATCH /:id)
router.patch('/:id', verifyToken, heroSectionController.updateHeroSectionById);

// Rota para deletar uma seção hero por ID (DELETE /:id)
router.delete('/:id', verifyToken, heroSectionController.deleteHeroSectionById);

export default router;