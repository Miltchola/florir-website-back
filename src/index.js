import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { fileURLToPath } from 'url';
import db from "./database/configdb.js";
import swaggerMiddleware from "./middleware/swagger.js";

import userRoute from "./routes/user.route.js";
import produtoRoute from "./routes/produto.route.js";
import contatoRoute from "./routes/contato.route.js";
import perguntaRoute from "./routes/pergunta.route.js";

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

// Rotas públicas
app.get("/", (req, res) => {
    res.send({message: 'Florir: As melhores flores desidratadas da região!'});
});

// Rotas da API
app.use("/users", userRoute);
app.use("/produtos", produtoRoute);
app.use("/contatos", contatoRoute);
app.use("/perguntas", perguntaRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Erro interno' });
});

export default app;

const __filename = fileURLToPath(import.meta.url);
const scriptPath = process.argv[1];

if (scriptPath === __filename) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}/`);
  });
}