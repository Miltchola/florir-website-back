import jwt from 'jsonwebtoken';
import { registerUser, authenticateUser } from '../services/user.service.js';
import User from '../models/User.js';
import { AppError, ERROR_MESSAGES } from '../utils/errors.js';
import sendSuccess from '../utils/successResponse.js';
import bcrypt from "bcrypt";

const handleAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const register = handleAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new AppError(ERROR_MESSAGES.USER_MISSING_FIELDS.statusCode, ERROR_MESSAGES.USER_MISSING_FIELDS.message);
    if (!isValidEmail(email)) throw new AppError(ERROR_MESSAGES.USER_INVALID_EMAIL.statusCode, ERROR_MESSAGES.USER_INVALID_EMAIL.message);
    if (password.length < 6) throw new AppError(ERROR_MESSAGES.USER_SHORT_PASSWORD.statusCode, ERROR_MESSAGES.USER_SHORT_PASSWORD.message);

    await registerUser({ username, email, password });
    sendSuccess(res, 201, null, 'Usuário registrado com sucesso!');
});

const login = handleAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const { statusCode, message } = ERROR_MESSAGES.AUTH_MISSING_CREDENTIALS;
        throw new AppError(statusCode, message);
    }
    
    const user = await authenticateUser({ email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    const responseData = { token, userId: user._id, username: user.username };
    sendSuccess(res, 200, responseData, 'User logged in successfully!');
});

const getMe = handleAsync(async (req, res, next) => {
    const user = await User.findById(req.userId).select('username email');
    
    if (!user) {
        const error = ERROR_MESSAGES.NOT_FOUND('Usuário');
        throw new AppError(error.statusCode, error.message);
    }
    
    sendSuccess(res, 200, user);
});

const updateMe = handleAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
        if (password.length < 6) throw new AppError(ERROR_MESSAGES.USER_SHORT_PASSWORD.statusCode, ERROR_MESSAGES.USER_SHORT_PASSWORD.message);
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
    }

    if (Object.keys(updateData).length === 0) {
        const { statusCode, message } = ERROR_MESSAGES.UPDATE_NO_FIELDS;
        throw new AppError(statusCode, message);
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, { new: true }).select('username email');

    if (!updatedUser) {
        const error = ERROR_MESSAGES.NOT_FOUND('Usuário');
        throw new AppError(error.statusCode, error.message);
    }
    
    sendSuccess(res, 200, updatedUser, 'Perfil atualizado com sucesso.');
});

const deleteMe = handleAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
        const { statusCode, message } = ERROR_MESSAGES.NOT_FOUND('Usuário');
        throw new AppError(statusCode, message);
    }
    sendSuccess(res, 200, null, 'Usuário deletado com sucesso.');
});

export default {
    register,
    login,
    getMe,
    updateMe,
    deleteMe
};