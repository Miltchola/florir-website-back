import mongoose from 'mongoose';

const contatoSchema = new mongoose.Schema({
    instagram: {
        type: String,
    },
    tiktok: {
        type: String,
    },
    email: {
        type: String,
    },
    telefone: {
        type: String,
    },
    ddd: {
        type: String,
    },
    whatsapp: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Contato = mongoose.model('Contato', contatoSchema);

export default Contato;