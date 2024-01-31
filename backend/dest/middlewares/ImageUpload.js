"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Set storage for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const destination = path_1.default.join(__dirname, '../uploads');
        // Create the destination directory if it doesn't exist
        if (!fs_1.default.existsSync(destination)) {
            fs_1.default.mkdirSync(destination, { recursive: true });
        }
        callback(null, destination);
    },
    filename: (req, file, callback) => {
        // Use the original filename with a timestamp as the new filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname.replace(/ /g, "")}`;
        callback(null, filename);
    },
});
// Create the multer instance and configure its options
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
