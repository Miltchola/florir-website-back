import jwt from 'jsonwebtoken';
import { registerUser, authenticateUser } from '../services/user.service.js';
import User from '../models/User.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const register = handleAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        const { statusCode, message } = ERROR_MESSAGES.USER_MISSING_FIELDS;
        throw new AppError(statusCode, message);
    }
    if (!isValidEmail(email)) {
        const { statusCode, message } = ERROR_MESSAGES.USER_INVALID_EMAIL;
        throw new AppError(statusCode, message);
    }
    if (password.length < 6) {
        const { statusCode, message } = ERROR_MESSAGES.USER_SHORT_PASSWORD;
        throw new AppError(statusCode, message);
    }

    await registerUser({ username, email, password });
    sendSuccess(res, 201, null, 'Usuário registrado com sucesso!');
});

const login = handleAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const { statusCode, message } = ERROR_MESSAGES.USER_MISSING_FIELDS;
        throw new AppError(statusCode, message);
    }
    
    const user = await authenticateUser({ email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    const responseData = {
        token,
        userId: user._id,
        username: user.username
    };
    sendSuccess(res, 200, responseData, 'User logged in successfully!');
});

const getUserByIdentifier = handleAsync(async (req, res, next) => {
    const { identifier } = req.params;
    const query = identifier.includes('@') ? { email: identifier } : { username: identifier };
    const user = await User.findOne(query).select('username email');
    
    if (!user) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Usuário');
        throw new AppError(statusCode, message);
    }
    
    sendSuccess(res, 200, user);
});

const updateProfile = handleAsync(async (req, res, next) => {
    const { identifier } = req.params;
    const { username, email } = req.body;
    const query = identifier.includes('@') ? { email: identifier } : { username: identifier };

    const user = await User.findOneAndUpdate(query, { username, email }, { new: true }).select('username email');

    if (!user) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Usuário');
        throw new AppError(statusCode, message);
    }
    
    sendSuccess(res, 200, user, 'Perfil atualizado com sucesso.');
});

export default {
    register,
    login,
    getUserByIdentifier,
    updateProfile,
};