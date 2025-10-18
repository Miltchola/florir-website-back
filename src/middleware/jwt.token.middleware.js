import jwt from 'jsonwebtoken';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        const { statusCode, message } = ERROR_MESSAGES.AUTH_NO_TOKEN;
        return next(new AppError(statusCode, message));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                const { statusCode, message } = ERROR_MESSAGES.AUTH_TOKEN_EXPIRED;
                return next(new AppError(statusCode, message));
            }
            const { statusCode, message } = ERROR_MESSAGES.AUTH_FAILED;
            return next(new AppError(statusCode, message));
        }
        req.userId = decoded.id;
        next();
    });
};

export default verifyToken;