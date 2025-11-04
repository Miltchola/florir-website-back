import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";
import path from 'path';

const router = express.Router();
const PORT = process.env.PORT || 8080;
const docsPath = path.join(process.cwd(), 'docs', '**', '*.yml');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Florir API",
      version: "1.0.0",
      description: "Documentação da API com Swagger",
    },
    servers: [
      {
        url: "https://florir-website-back.vercel.app",
        description: "Servidor de Produção (Vercel)",
      },
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor Local (Desenvolvimento)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [docsPath], 
};

const swaggerSpec = swaggerJsdoc(options);
const swaggerUiOptions = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js",
  ],
};

router.use(
  "/docs",
  serve,
  setup(swaggerSpec, swaggerUiOptions)
);

if (process.env.NODE_ENV !== 'production') {
  console.log(`Documentação com Swagger disponível em: http://localhost:${PORT}/docs`);
}

export default router;