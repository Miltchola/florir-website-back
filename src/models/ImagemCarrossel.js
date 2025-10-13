import mongoose from 'mongoose';

const imagemCarrosselSchema = new mongoose.Schema({
    imagem: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        default: 'Imagem do carrossel'
    }
}, {
    timestamps: true
});

const ImagemCarrossel = mongoose.model('ImagemCarrossel', imagemCarrosselSchema);

export default ImagemCarrossel;