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
exports.Trip = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const tripSchema = new mongoose_1.Schema({
    driver: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Driver',
    },
    patient: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: 'User',
    },
    pickup: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: 'Location',
    },
    destination: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: 'Location',
    },
    addedBy: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: 'Admin',
    },
    updatedBy: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Admin',
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    number: { type: String },
    startedAt: { type: String },
    arrivedAt: { type: String },
    finishedAt: { type: String },
    signature: { type: String },
    specialNeeds: { type: String },
    mileage: { type: Number },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.addedBy;
            delete ret.updatedBy;
        }
    }
});
const Trip = mongoose_1.default.model('Trip', tripSchema);
exports.Trip = Trip;
