import Pergunta from '../models/Pergunta.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createPergunta = handleAsync(async (req, res, next) => {
    const newPergunta = new Pergunta(req.body);
    await newPergunta.save();
    sendSuccess(res, 201, newPergunta, 'Pergunta criada com sucesso.');
});

const getAllPerguntas = handleAsync(async (req, res, next) => {
    const perguntas = await Pergunta.find();
    sendSuccess(res, 200, perguntas);
});

const getPerguntaById = handleAsync(async (req, res, next) => {
    const pergunta = await Pergunta.findById(req.params.id);
    if (!pergunta) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Pergunta');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, pergunta);
});

const updatePerguntaById = handleAsync(async (req, res, next) => {
    const pergunta = await Pergunta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pergunta) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Pergunta');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, pergunta, 'Pergunta atualizada com sucesso.');
});

const deletePerguntaById = handleAsync(async (req, res, next) => {
    const pergunta = await Pergunta.findByIdAndDelete(req.params.id);
    if (!pergunta) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Pergunta');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, null, 'Pergunta deletada com sucesso.');
});

export default {
    createPergunta,
    getAllPerguntas,
    getPerguntaById,
    updatePerguntaById,
    deletePerguntaById
};