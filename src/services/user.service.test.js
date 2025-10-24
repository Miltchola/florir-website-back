import * as userService from './user.service.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../utils/errors.js';

jest.mock('../models/User.js');
jest.mock('bcrypt');

describe('user.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('deve registrar um novo usuário se o email não existir', async () => {
            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
            const saveMock = jest.fn().mockResolvedValue({ username: 'user', email: 'mail', password: 'hashedPassword' });
            User.mockImplementation(() => ({ save: saveMock }));

            const data = { username: 'user', email: 'mail', password: '123' };
            const result = await userService.registerUser(data);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'mail' });
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith('123', 'salt');
            expect(saveMock).toHaveBeenCalled();
            expect(result).toEqual({ username: 'user', email: 'mail', password: 'hashedPassword' });
        });

        it('deve lançar erro se o email já existir', async () => {
            User.findOne.mockResolvedValue({ email: 'mail' });
            await expect(userService.registerUser({ username: 'user', email: 'mail', password: '123' }))
                .rejects.toThrow(ERROR_MESSAGES.USER_EMAIL_EXISTS.message);
        });
    });

    describe('authenticateUser', () => {
        it('deve autenticar usuário com senha correta', async () => {
            const user = { _id: '123', username: 'user', password: 'hashed', email: 'mail' };
            
            const selectMock = jest.fn().mockResolvedValue(user);
            User.findOne.mockReturnValue({ select: selectMock });
            bcrypt.compare.mockResolvedValue(true);

            const result = await userService.authenticateUser({ email: 'mail', password: '123' });

            expect(User.findOne).toHaveBeenCalledWith({ email: 'mail' });
            expect(selectMock).toHaveBeenCalledWith('+password +email');
            expect(bcrypt.compare).toHaveBeenCalledWith('123', 'hashed');
            expect(result).toEqual(user);
        });

        it('deve lançar erro se usuário não for encontrado', async () => {
            User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });
            await expect(userService.authenticateUser({ email: 'notfound@mail.com', password: '123' }))
                .rejects.toThrow(ERROR_MESSAGES.USER_NOT_FOUND.message);
        });

        it('deve lançar erro se a senha estiver incorreta', async () => {
            const user = { username: 'user', password: 'hashed', email: 'mail' };
            User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(user) });
            bcrypt.compare.mockResolvedValue(false);

            await expect(userService.authenticateUser({ email: 'mail', password: 'wrong' }))
                .rejects.toThrow(ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS.message);
        });
    });
});