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
}, {
    timestamps: true
});

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;