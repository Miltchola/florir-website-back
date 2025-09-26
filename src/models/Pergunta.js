import mongoose from 'mongoose';

const perguntaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Pergunta = mongoose.model('Pergunta', perguntaSchema);

export default Pergunta;