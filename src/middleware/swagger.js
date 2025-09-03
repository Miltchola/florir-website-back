import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import express from "express";

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GAMES API",
      version: "1.0.0",
      description: "Documentação da API com Swagger",
    },
    servers: [
     
      {
        url: "https://vercel.com/florir-website-backend",
        description: "Servidor de Produção (Vercel)",
      },
      {
        url: "http://localhost:3000",
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
  apis: ["./src/routes/*.js"], // Garante que todos os arquivos da pasta routes sejam lidos
};

const swaggerSpec = swaggerJsDoc(options);

// ✅ Adição dos arquivos do Swagger via CDN (necessário para Vercel)
router.use(
  "/docs",
  serve,
  setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-init.js"
    ]
  })
);

console.log("✅ Swagger middleware carregado!");
console.log(`📄 Documentação disponível em: http://localhost:3000/docs/`);

export default router;
