"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: String, required: true },
    profileImage: { type: String, required: true },
    type: { type: String, required: true }, // driver / patient
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    ssn: { type: String, required: true },
    medicalInsurance: { type: String, required: true },
    phoneVerified: { type: Boolean, required: true },
    emailVerified: { type: Boolean, required: true },
    salt: { type: String, required: true },
    password: { type: String, required: true },
    location: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Location',
        required: true,
    },
    driver: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Driver',
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.password;
            delete ret.salt;
            delete ret._id;
            delete ret.driver;
        }
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
