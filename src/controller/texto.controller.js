import Texto from '../models/Texto.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createTexto = handleAsync(async (req, res, next) => {
    const newTexto = new Texto(req.body);
    await newTexto.save();
    sendSuccess(res, 201, newTexto, 'Texto criado com sucesso.');
});

const getAllTextos = handleAsync(async (req, res, next) => {
    const textos = await Texto.find();
    sendSuccess(res, 200, textos);
});

const getTextoById = handleAsync(async (req, res, next) => {
    const texto = await Texto.findById(req.params.id);
    if (!texto) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Texto');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, texto);
});

const updateTextoById = handleAsync(async (req, res, next) => {
    const texto = await Texto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!texto) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Texto');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, texto, 'Texto atualizado com sucesso.');
});

const deleteTextoById = handleAsync(async (req, res, next) => {
    const texto = await Texto.findByIdAndDelete(req.params.id);
    if (!texto) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Texto');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, null, 'Texto deletado com sucesso.');
});

export default {
    createTexto,
    getAllTextos,
    getTextoById,
    updateTextoById,
    deleteTextoById
};