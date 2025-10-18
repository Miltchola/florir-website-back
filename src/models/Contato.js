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
    telefone: { // DDD + Telefone
        type: String,
    },
    whatsappQRCode: {
        type: String,
        required: true,
    },
    altText:{
        type: String,
        default: 'Imagem do QR-Code'
    }
}, {
    timestamps: true
});

const Contato = mongoose.model('Contato', contatoSchema);

export default Contato;