import Pergunta from '../models/Pergunta.js';

const createPergunta = async (req, res) => {
    try {
        const newPergunta = new Pergunta(req.body);
        await newPergunta.save();
        res.status(201).json(newPergunta);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar pergunta', error });
    }
};

const getAllPerguntas = async (req, res) => {
    try {
        const perguntas = await Pergunta.find();
        res.status(200).json(perguntas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar perguntas', error });
    }
};

const getPerguntaById = async (req, res) => {
    try {
        const pergunta = await Pergunta.findById(req.params.id);
        if (!pergunta) return res.status(404).json({ message: 'Pergunta não encontrada' });
        res.status(200).json(pergunta);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pergunta', error });
    }
};

const updatePerguntaById = async (req, res) => {
    try {
        const pergunta = await Pergunta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pergunta) return res.status(404).json({ message: 'Pergunta não encontrada' });
        res.status(200).json(pergunta);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar pergunta', error });
    }
};

const deletePerguntaById = async (req, res) => {
    try {
        const pergunta = await Pergunta.findByIdAndDelete(req.params.id);
        if (!pergunta) return res.status(404).json({ message: 'Pergunta não encontrada' });
        res.status(200).json({ message: 'Pergunta deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar pergunta', error });
    }
};

export default {
    createPergunta,
    getAllPerguntas,
    getPerguntaById,
    updatePerguntaById,
    deletePerguntaById
};