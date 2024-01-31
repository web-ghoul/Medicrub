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
exports.Car = exports.CarAlbum = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const carAlbumSchema = new mongoose_1.Schema({
    car: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Car',
        required: true,
    },
    front: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: true,
    },
    right: {
        type: String,
        required: true,
    },
    left: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret._id;
            delete ret.car;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});
const CarAlbum = mongoose_1.default.model('CarAlbum', carAlbumSchema);
exports.CarAlbum = CarAlbum;
const carSchema = new mongoose_1.Schema({
    driver: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Driver',
        required: true,
    },
    carAlbum: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'CarAlbum',
    },
    registration: {
        type: String,
        required: true,
    },
    insurance: {
        type: String,
        required: true,
    },
    carType: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
        required: true,
    },
    plateNum: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});
const Car = mongoose_1.default.model('Car', carSchema);
exports.Car = Car;
