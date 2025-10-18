import User from "../models/User.js";
import bcrypt from "bcrypt";
import { AppError, ERROR_MESSAGES } from "../utils/errors.js";

export const registerUser = async ({ username, email, password }) => {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new AppError(ERROR_MESSAGES.USER_EMAIL_EXISTS.statusCode, ERROR_MESSAGES.USER_EMAIL_EXISTS.message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    return await newUser.save();
};

export const authenticateUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password +email");
    if (!user) {
        throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND.statusCode, ERROR_MESSAGES.USER_NOT_FOUND.message);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS.statusCode, ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS.message);
    }

    return user;
};