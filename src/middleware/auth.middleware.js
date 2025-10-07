// middleware/auth.middleware.js
import User from '../models/User.js';
import { AppError } from '../utils/errors.js';

export const checkIsAdmin = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.admin) {
            return next(new AppError(403, 'Acesso negado. Apenas administradores podem fazer login.'));
        }
    } catch (error) {
        next(error);
    }
};