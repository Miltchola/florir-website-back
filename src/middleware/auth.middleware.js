import User from '../models/User.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';

export const checkIsAdmin = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            const { statusCode, message } = ERROR_MESSAGES.AUTH_MISSING_CREDENTIALS;
            return next(new AppError(statusCode, message));
        }

        const user = await User.findOne({ email });
        
        if (!user || !user.admin) {
            const { statusCode, message } = ERROR_MESSAGES.FORBIDDEN;
            return next(new AppError(statusCode, 'Acesso negado. Apenas administradores podem fazer login.'));
        }
        
        next();
    } catch (error) {
        next(error);
    }
};