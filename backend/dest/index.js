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
const express_1 = __importDefault(require("express"));
const AppService_1 = __importDefault(require("./services/AppService"));
const DBService_1 = __importDefault(require("./services/DBService"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: __dirname.replace('/src', '').replace('/dest', '') + '/.env' });
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const app = (0, express_1.default)();
    yield (0, AppService_1.default)(app);
    yield (0, DBService_1.default)(process.env.MONGO_URL);
    app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, () => {
        console.log("App Is Running on PORT: " + process.env.PORT);
    });
});
startServer();
