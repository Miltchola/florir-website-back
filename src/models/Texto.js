import mongoose from 'mongoose';

const textoSchema = new mongoose.Schema({
    textoBase: {
        type: String,
        required: true,
    },
    subTexto: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Texto = mongoose.model('Texto', textoSchema);

export default Texto;