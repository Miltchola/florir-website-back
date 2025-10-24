import express from 'express';
import request from 'supertest';
import userController from '../controller/user.controller.js';
import router from './user.route.js';

// Mock middleware
jest.mock('../middleware/jwt.token.middleware.js', () => ({
  __esModule: true,
  default: (req, res, next) => next(),
}));
jest.mock('../middleware/auth.middleware.js', () => ({
  checkIsAdmin: (req, res, next) => next(),
}));

// Corrected and completed controller mock
jest.mock('../controller/user.controller.js', () => ({
  __esModule: true,
  default: {
    register: jest.fn((req, res) => res.status(201).json({ registered: true })),
    login: jest.fn((req, res) => res.status(200).json({ token: 'jwt-token' })),
    getMe: jest.fn((req, res) => res.status(200).json({ user: 'data' })),
    updateMe: jest.fn((req, res) => res.status(200).json({ updated: true })),
    deleteMe: jest.fn((req, res) => res.status(200).json({ deleted: true })),
  },
}));

describe('User Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    // Use a prefix to match a real-world scenario
    app.use('/api/users', router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar userController.register ao fazer POST /api/users/register', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'joao', email: 'joao@email.com', password: '123456' });

    expect(userController.register).toHaveBeenCalled();
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ registered: true });
  });

  it('deve chamar userController.login ao fazer POST /api/users/login', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'joao@email.com', password: '123456' });

    expect(userController.login).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ token: 'jwt-token' });
  });
});