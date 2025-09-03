import express from "express";
import dotenv from "dotenv";
import db from "./database/configdb.js";
import userRoute from "./routes/user.route.js";
import cors from 'cors';

import User from './models/User.js';
import swaggerMiddleware from "./middleware/swagger.js";

dotenv.config();
db.connect();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    'https://florirvercel.app',

    'http://localhost:5173', // ajuste para a porta do seu frontend local
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
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




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});
