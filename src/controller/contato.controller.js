import Contato from '../models/Contato.js';

const createContato = async (req, res) => {
    try {
        const existingContato = await Contato.findOne();
        if (existingContato) {
            return res.status(409).json({ message: 'Um documento de contato já existe. Para modificá-lo, use a rota de atualização (PUT).' });
        }
        const newContato = new Contato(req.body);
        await newContato.save();
        res.status(201).json(newContato);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar contato', error: error.message });
    }
};

const getAllContatos = async (req, res) => {
    try {
        const contatos = await Contato.findOne();
        if (!contatos) {
            return res.status(204).send();
        }
        res.status(200).json(contatos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar contatos', error: error.message });
    }
};

const getContatoById = async (req, res) => {
    try {
        const contato = await Contato.findById(req.params.id);
        if (!contato) return res.status(404).json({ message: 'Contato não encontrado' });
        res.status(200).json(contato);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar contato', error: error.message });
    }
};

const updateContatoById = async (req, res) => {
    try {
        const contato = await Contato.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!contato) return res.status(404).json({ message: 'Contato não encontrado' });
        res.status(200).json(contato);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar contato', error: error.message });
    }
};

const deleteContatoById = async (req, res) => {
    try {
        const contato = await Contato.findByIdAndDelete(req.params.id);
        if (!contato) return res.status(404).json({ message: 'Contato não encontrado' });
        res.status(200).json({ message: 'Contato deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar contato', error: error.message });
    }
};


export default {
    createContato,
    getAllContatos,
    getContatoById,
    updateContatoById,
    deleteContatoById
};