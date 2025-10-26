import HeroSection from '../models/HeroSection.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';
import { uploadFile, deleteFile } from '../services/r2.service.js';

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createHeroSection = handleAsync(async (req, res, next) => {
    if (req.file) {
      const imageUrl = await uploadFile(req.file.buffer, req.file.mimetype);
      req.body.imagem = imageUrl;
    }

    const newHeroSection = new HeroSection(req.body);
    await newHeroSection.save();
    sendSuccess(res, 201, newHeroSection, 'Seção Hero criada com sucesso.');
});

const getAllHeroSections = handleAsync(async (req, res, next) => {
    const heroSections = await HeroSection.find();
    sendSuccess(res, 200, heroSections);
});

const getHeroSectionById = handleAsync(async (req, res, next) => {
    const heroSection = await HeroSection.findById(req.params.id);
    if (!heroSection) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Seção Hero');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, heroSection);
});

const updateHeroSectionById = handleAsync(async (req, res, next) => {
    let oldImageUrl = null;

    if (req.file) {
      const oldHeroSection = await HeroSection.findById(req.params.id);
      if (oldHeroSection && oldHeroSection.imagem) {
        oldImageUrl = oldHeroSection.imagem;
      }
      
      const newImageUrl = await uploadFile(req.file.buffer, req.file.mimetype);
      req.body.imagem = newImageUrl;
    }
    
    const heroSection = await HeroSection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!heroSection) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Seção Hero');
        throw new AppError(statusCode, message);
    }

    if (oldImageUrl) {
      await deleteFile(oldImageUrl);
    }

    sendSuccess(res, 200, heroSection, 'Seção Hero atualizada com sucesso.');
});

const deleteHeroSectionById = handleAsync(async (req, res, next) => {
    const heroSection = await HeroSection.findById(req.params.id);
    if (!heroSection) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Seção Hero');
        throw new AppError(statusCode, message);
    }
    
    await HeroSection.findByIdAndDelete(req.params.id);

    if (heroSection.imagem) {
        await deleteFile(heroSection.imagem);
    }

    sendSuccess(res, 200, null, 'Seção Hero deletada com sucesso.');
});

export default {
    createHeroSection,
    getAllHeroSections,
    getHeroSectionById,
    updateHeroSectionById,
    deleteHeroSectionById
};