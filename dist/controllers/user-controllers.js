import { hash, compare } from "bcrypt";
import User from "../models/user-model.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
// cookie options helper
const getCookieOptions = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    const options = {
        path: "/",
        httpOnly: true,
        signed: true,
        expires,
        sameSite: "lax",
        secure: false,
    };
    if (process.env.NODE_ENV === "production" && process.env.DOMAIN) {
        options.domain = process.env.DOMAIN;
    }
    return options;
};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "ERROR",
                cause: "User with same email already exists",
            });
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = createToken(user._id.toString(), user.email, "7d");
        const cookieOptions = getCookieOptions();
        res.clearCookie(COOKIE_NAME, cookieOptions);
        res.cookie(COOKIE_NAME, token, cookieOptions);
        return res.status(201).json({
            message: "OK",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({
                message: "ERROR",
                cause: "No account with given emailID found",
            });
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "ERROR",
                cause: "Incorrect Password",
            });
        }
        const token = createToken(user._id.toString(), user.email, "7d");
        const cookieOptions = getCookieOptions();
        res.clearCookie(COOKIE_NAME, cookieOptions);
        res.cookie(COOKIE_NAME, token, cookieOptions);
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "ERROR",
                cause: "User doesn't exist or token malfunctioned",
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "ERROR",
                cause: "Permissions didn't match",
            });
        }
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const logoutUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "ERROR",
                cause: "User doesn't exist or token malfunctioned",
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "ERROR",
                cause: "Permissions didn't match",
            });
        }
        const cookieOptions = getCookieOptions();
        res.clearCookie(COOKIE_NAME, cookieOptions);
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map