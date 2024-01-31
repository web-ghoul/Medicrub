"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSignature = exports.GenerateSignature = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateSignature = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, { expiresIn: '30d' });
};
exports.GenerateSignature = GenerateSignature;
const ValidateSignature = (req) => {
    const token = req.get('Authorization');
    if (token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token.split(' ')[1], process.env.JWT_KEY);
            req.user = payload;
            return true;
        }
        catch (_) {
            return false;
        }
    }
    return false;
};
exports.ValidateSignature = ValidateSignature;
