import Produto from '../models/Produto.js';

const createProduto = async (req, res) => {
    try {
        const newProduto = new Produto(req.body);
        await newProduto.save();
        res.status(201).json(newProduto);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar produto', error: error.message });
    }
};

const getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
};

const getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
    }
};

const updateProdutoById = async (req, res) => {
    try {
        const updatedProduto = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduto) {
            return res.status(404).json({ message: 'Produto não encontrado para atualizar' });
        }
        res.status(200).json(updatedProduto);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
};

const deleteProdutoById = async (req, res) => {
    try {
        const deletedProduto = await Produto.findByIdAndDelete(req.params.id);
        if (!deletedProduto) {
            return res.status(404).json({ message: 'Produto não encontrado para deletar' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
    }
};


export default {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProdutoById,
    deleteProdutoById
};