import ImagemCarrossel from '../models/ImagemCarrossel.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';
import { uploadFile, deleteFile } from '../services/r2.service.js';

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createImagemCarrossel = handleAsync(async (req, res, next) => {
    if (req.file) {
        const imageUrl = await uploadFile(req.file.buffer, req.file.mimetype);
        req.body.imagem = imageUrl;
    } else {
        throw new AppError(400, 'Nenhum arquivo de imagem enviado.');
    }

    const newImagemCarrossel = new ImagemCarrossel(req.body);
    await newImagemCarrossel.save();
    sendSuccess(res, 201, newImagemCarrossel, 'Imagem do carrossel criada com sucesso.');
});

const getAllImagensCarrossel = handleAsync(async (req, res, next) => {
    const imagensCarrossel = await ImagemCarrossel.find();
    sendSuccess(res, 200, imagensCarrossel);
});

const getImagemCarrosselById = handleAsync(async (req, res, next) => {
    const imagemCarrossel = await ImagemCarrossel.findById(req.params.id);
    if (!imagemCarrossel) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Imagem do carrossel');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, imagemCarrossel);
});

const updateImagemCarrosselById = handleAsync(async (req, res, next) => {
    let oldImageUrl = null;

    if (req.file) {
      const oldImagem = await ImagemCarrossel.findById(req.params.id);
      if (oldImagem && oldImagem.imagem) {
        oldImageUrl = oldImagem.imagem;
      }
      
      const newImageUrl = await uploadFile(req.file.buffer, req.file.mimetype);
      req.body.imagem = newImageUrl;
    }
    
    const imagemCarrossel = await ImagemCarrossel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!imagemCarrossel) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Imagem do carrossel');
        throw new AppError(statusCode, message);
    }

    if (oldImageUrl) {
        await deleteFile(oldImageUrl);
    }

    sendSuccess(res, 200, imagemCarrossel, 'Imagem do carrossel atualizada com sucesso.');
});

const deleteImagemCarrosselById = handleAsync(async (req, res, next) => {
    const imagemCarrossel = await ImagemCarrossel.findById(req.params.id);
    if (!imagemCarrossel) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Imagem do carrossel');
        throw new AppError(statusCode, message);
    }

    await ImagemCarrossel.findByIdAndDelete(req.params.id);

    if (imagemCarrossel.imagem) {
        await deleteFile(imagemCarrossel.imagem);
    }

    sendSuccess(res, 200, null, 'Imagem do carrossel deletada com sucesso.');
});

export default {
    createImagemCarrossel,
    getAllImagensCarrossel,
    getImagemCarrosselById,
    updateImagemCarrosselById,
    deleteImagemCarrosselById
};