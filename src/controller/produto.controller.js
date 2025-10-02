import Produto from '../models/Produto.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createProduto = handleAsync(async (req, res, next) => {
    const newProduto = new Produto(req.body);
    await newProduto.save();
    sendSuccess(res, 201, newProduto, 'Produto criado com sucesso.');
});

const getAllProdutos = handleAsync(async (req, res, next) => {
    const produtos = await Produto.find();
    sendSuccess(res, 200, produtos);
});

const getProdutoById = handleAsync(async (req, res, next) => {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Produto');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, produto);
});

const updateProdutoById = handleAsync(async (req, res, next) => {
    const updatedProduto = await Produto.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedProduto) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Produto');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, updatedProduto, 'Produto atualizado com sucesso.');
});

const deleteProdutoById = handleAsync(async (req, res, next) => {
    const deletedProduto = await Produto.findByIdAndDelete(req.params.id);
    if (!deletedProduto) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Produto');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, null, 'Produto deletado com sucesso.');
});

export default {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProdutoById,
    deleteProdutoById
};