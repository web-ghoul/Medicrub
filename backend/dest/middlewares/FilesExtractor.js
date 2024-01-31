"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractFiles = exports.ExtractForm = void 0;
const formidable_1 = __importDefault(require("formidable"));
const ExtractForm = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({ multiples: true });
    const [fields, files] = yield form.parse(req);
    const uploads = files;
    const fieldsObj = fields;
    const fieldsValues = {};
    for (const key in fieldsObj) {
        fieldsValues[key] = fieldsObj[key][0];
    }
    return [fieldsValues, uploads];
});
exports.ExtractForm = ExtractForm;
const ExtractFiles = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({ multiples: true });
    const [fields, files] = yield form.parse(req);
    const uploads = files;
    return uploads;
});
exports.ExtractFiles = ExtractFiles;
