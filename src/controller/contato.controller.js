import Contato from '../models/Contato.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createContato = handleAsync(async (req, res, next) => {
    const existingContato = await Contato.findOne();
    if (existingContato) {
        throw new AppError(ERROR_MESSAGES.CONTATO_EXISTS.statusCode, ERROR_MESSAGES.CONTATO_EXISTS.message);
    }
    const newContato = new Contato(req.body);
    await newContato.save();
    sendSuccess(res, 201, newContato, 'Contato criado com sucesso.');
});

const getAllContatos = handleAsync(async (req, res, next) => {
    const contatos = await Contato.findOne();
    if (!contatos) {
        return res.status(204).send();
    }
    sendSuccess(res, 200, contatos);
});

const getContatoById = handleAsync(async (req, res, next) => {
    const contato = await Contato.findById(req.params.id);
    if (!contato) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Contato');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, contato);
});

const updateContatoById = handleAsync(async (req, res, next) => {
    const contato = await Contato.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contato) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Contato');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, contato, 'Contato atualizado com sucesso.');
});

const deleteContatoById = handleAsync(async (req, res, next) => {
    const contato = await Contato.findByIdAndDelete(req.params.id);
    if (!contato) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Contato');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, null, 'Contato deletado com sucesso.');
});

export default {
    createContato,
    getAllContatos,
    getContatoById,
    updateContatoById,
    deleteContatoById
};