"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecretcode";
const encryptPassword = async (password) => {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt_1.default.hash(String(password), SALT_ROUNDS);
    return hashedPassword;
};
exports.encryptPassword = encryptPassword;
const comparePassword = async (password, hashedPassword) => {
    const isPasswordCorrect = await bcrypt_1.default.compare(password, hashedPassword);
    return isPasswordCorrect;
};
const createJWT = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};
exports.createJWT = createJWT;
const verifyJWT = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
exports.verifyJWT = verifyJWT;
exports.default = {
    encryptPassword: exports.encryptPassword,
    comparePassword,
    createJWT: exports.createJWT,
    verifyJWT: exports.verifyJWT,
};
