import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true,
    },
    subtexto: {
        type: String,
    },
    imagem: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        default: 'Imagem da seção principal'
    }
}, {
    timestamps: true
});

const HeroSection = mongoose.model('HeroSection', heroSectionSchema);

export default HeroSection;