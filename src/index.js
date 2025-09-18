import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
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

const corsOptions = {
  origin: [
    'https://florirvercel.app', // URL de produção
    'http://localhost:5173', // Ajuste para a porta do seu Frontend local
    'http://localhost:3000', // Ajuste para a porta do seu Frontend local
    'https://improved-dollop-459xrw5g7wqfgr4-3000.app.github.dev' // Front Local - Code Space - Hugo
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
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
    res.send({message: 'Hello World!'});
});

// Rotas da API
app.use("/users", userRoute);
app.use("/produtos", produtoRoute);
app.use("/contatos", contatoRoute);
app.use("/perguntas", perguntaRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});
