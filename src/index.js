import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { fileURLToPath } from 'url';
import db from "./database/configdb.js";
import swaggerMiddleware from "./middleware/swagger.js";
import { MulterError } from "multer";

import userRoute from "./routes/user.route.js";
import produtoRoute from "./routes/produto.route.js";
import contatoRoute from "./routes/contato.route.js";
import perguntaRoute from "./routes/pergunta.route.js";
import heroSectionRoute from "./routes/heroSection.route.js";
import imagemCarrosselRoute from "./routes/imagemCarrossel.route.js";

dotenv.config();
db.connect();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(swaggerMiddleware);

// Rota pública
app.get("/", (req, res) => {
    res.send({message: 'Florir - As melhores flores desidratadas da região!'});
});

// Rotas da API
app.use("/users", userRoute);
app.use("/produtos", produtoRoute);
app.use("/contatos", contatoRoute);
app.use("/perguntas", perguntaRoute);
app.use("/hero-section", heroSectionRoute);
app.use("/imagens-carrossel", imagemCarrosselRoute);

app.use((err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';

  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      error.statusCode = 413;
      error.status = 'fail';
      error.message = 'Arquivo muito grande. O limite é de 10MB.';
    }
    
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      error.statusCode = 400;
      error.status = 'fail';
      error.message = `Nome do campo do arquivo é inválido. Verifique se está usando 'imagem' ou 'whatsappQRCode' corretamente.`;
    }
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  });
});

export default app;

const __filename = fileURLToPath(import.meta.url);
const scriptPath = process.argv[1];

if (scriptPath === __filename) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}/`);
  });
}