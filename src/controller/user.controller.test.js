import userController from './user.controller.js';
import * as userService from '../services/user.service.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendSuccess from '../utils/successResponse.js';

jest.mock('../services/user.service.js');
jest.mock('../models/User.js');
jest.mock('jsonwebtoken');
jest.mock('../utils/successResponse.js');

describe('userController', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, params: {}, userId: 'user123' };
        res = {};
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('deve chamar registerUser e enviar uma resposta de sucesso', async () => {
            req.body = { username: 'test', email: 'test@test.com', password: 'password123' };
            await userController.register(req, res, next);
            expect(userService.registerUser).toHaveBeenCalledWith(req.body);
            expect(sendSuccess).toHaveBeenCalledWith(res, 201, null, 'Usuário registrado com sucesso!');
        });
    });

    describe('login', () => {
        it('deve autenticar o usuário, gerar um token e enviar uma resposta de sucesso', async () => {
            const fakeUser = { _id: 'user123', username: 'test' };
            req.body = { email: 'test@test.com', password: 'password123' };
            
            userService.authenticateUser.mockResolvedValue(fakeUser);
            jwt.sign.mockReturnValue('fakeToken');

            await userController.login(req, res, next);

            expect(userService.authenticateUser).toHaveBeenCalledWith(req.body);
            expect(jwt.sign).toHaveBeenCalledWith({ id: fakeUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            expect(sendSuccess).toHaveBeenCalledWith(res, 200, { token: 'fakeToken', userId: fakeUser._id, username: fakeUser.username }, 'User logged in successfully!');
        });
    });

    describe('getMe', () => {
        it('deve buscar e retornar os dados do usuário logado', async () => {
            const fakeUser = { username: 'test', email: 'test@test.com' };
            const selectMock = jest.fn().mockResolvedValue(fakeUser);
            User.findById.mockReturnValue({ select: selectMock });

            await userController.getMe(req, res, next);

            expect(User.findById).toHaveBeenCalledWith('user123');
            expect(selectMock).toHaveBeenCalledWith('username email');
            expect(sendSuccess).toHaveBeenCalledWith(res, 200, fakeUser);
        });
    });
});