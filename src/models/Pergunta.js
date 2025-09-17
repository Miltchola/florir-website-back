import mongoose from 'mongoose';

const perguntaSchema = new mongoose.Schema({
    pergunta: {
        type: String,
        required: true,
    },
    resposta: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Pergunta = mongoose.model('Pergunta', perguntaSchema);

export default Pergunta;