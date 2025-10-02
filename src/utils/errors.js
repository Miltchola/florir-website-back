export class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // To distinguish from programming errors (??)
    Error.captureStackTrace(this, this.constructor);
  }
}

export const ERROR_MESSAGES = {
  // Erros gerais
  INTERNAL_SERVER_ERROR: { statusCode: 500, message: 'Erro interno do servidor.' },
  
  // Autenticação e autorização
  AUTH_NO_TOKEN: { statusCode: 401, message: 'Nenhum token fornecido.' },
  AUTH_FAILED: { statusCode: 403, message: 'Falha ao autenticar o token.' },
  AUTH_INVALID_CREDENTIALS: { statusCode: 401, message: 'Credenciais inválidas.' },
  
  // Erros de usuário
  USER_NOT_FOUND: { statusCode: 404, message: 'Usuário não encontrado.' },
  USER_EMAIL_EXISTS: { statusCode: 409, message: 'Este email já está em uso.' },
  USER_MISSING_FIELDS: { statusCode: 400, message: 'Nome de usuário, email e senha são obrigatórios.' },
  USER_INVALID_EMAIL: { statusCode: 400, message: 'Formato de email inválido.' },
  USER_SHORT_PASSWORD: { statusCode: 400, message: 'A senha deve ter pelo menos 6 caracteres.' },

  // Recurso não encontrado
  NOT_FOUND: (resource = 'Recurso') => ({
    statusCode: 404,
    message: `${resource} não encontrado(a).`
  }),

  // Erros de CRUD
  CREATE_FAILED: (resource = 'recurso') => ({
    statusCode: 400,
    message: `Erro ao criar ${resource}.`
  }),
  UPDATE_FAILED: (resource = 'recurso') => ({
    statusCode: 400,
    message: `Erro ao atualizar ${resource}.`
  }),
  DELETE_FAILED: (resource = 'recurso') => ({
    statusCode: 500,
    message: `Erro ao deletar ${resource}.`
  }),
  FETCH_FAILED: (resource = 'recursos') => ({
    statusCode: 500,
    message: `Erro ao buscar ${resource}.`
  }),

  // Lógica de negócios
  CONTATO_EXISTS: { statusCode: 409, message: 'Um documento de contato já existe. Para modificá-lo, use a rota de atualização (PUT).' }
};