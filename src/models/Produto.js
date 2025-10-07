import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
    imagem: {
        type: String,
    },
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
    },
    preco: {
        type: String,
    },
    recomendado: {
        type: Boolean,
        default: false,
    },
    tipo: {
        type: String,
    },
    disponiveis: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;