import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";

const router = express.Router();

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
        url: "http://localhost:8080",
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
  apis: ["./docs/**/*.yml"], 
};

const swaggerSpec = swaggerJsdoc(options);

// Custom options for Swagger UI, including CDN links for Vercel compatibility
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

console.log("✅ Swagger middleware carregado!");
console.log(`📄 Documentação disponível em: http://localhost:8008/docs`);

export default router;