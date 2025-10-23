import jwt from 'jsonwebtoken';
import verifyToken from './jwt.token.middleware.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';

jest.mock('jsonwebtoken');

describe('verifyToken middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { headers: {} };
        res = {};
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('deve chamar next com erro se não houver token', () => {
        verifyToken(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].message).toBe(ERROR_MESSAGES.AUTH_NO_TOKEN.message);
    });

    it('deve chamar next com erro se o token for inválido', () => {
        req.headers = { authorization: 'Bearer invalidtoken' };
        const verifyError = new Error('invalid');
        jwt.verify.mockImplementation((token, secret, cb) => cb(verifyError, null));

        verifyToken(req, res, next);
        
        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].message).toBe(ERROR_MESSAGES.AUTH_FAILED.message);
    });

    it('deve chamar next com erro se o token estiver expirado', () => {
        req.headers = { authorization: 'Bearer expiredtoken' };
        const verifyError = new jwt.JsonWebTokenError('jwt expired');
        verifyError.name = 'TokenExpiredError';
        jwt.verify.mockImplementation((token, secret, cb) => cb(verifyError, null));

        verifyToken(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        expect(next.mock.calls[0][0].message).toBe(ERROR_MESSAGES.AUTH_TOKEN_EXPIRED.message);
    });

    it('deve definir req.userId e chamar next sem argumentos se o token for válido', () => {
        req.headers = { authorization: 'Bearer validtoken' };
        jwt.verify.mockImplementation((token, secret, cb) => cb(null, { id: 'user123' }));

        verifyToken(req, res, next);

        expect(req.userId).toBe('user123');
        expect(next).toHaveBeenCalledWith();
    });
});