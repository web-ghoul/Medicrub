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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const AppService_1 = __importDefault(require("./services/AppService"));
const DBService_1 = __importDefault(require("./services/DBService"));
const SockerIO_1 = require("./services/SockerIO");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    app.use((0, cors_1.default)(config_1.CORS_OPTIONS));
    /* ----------------------------- Initialize App ----------------------------- */
    yield (0, AppService_1.default)(app);
    /* ---------------------------- Connect To MogoDB --------------------------- */
    yield (0, DBService_1.default)(process.env.MONGO_URL);
    /* --------------------- Create App Server -------------------- */
    if (process.env.NODE_ENV !== 'production') {
        const server = app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, () => {
            var _a;
            console.log("App Is Running on PORT: " + ((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000));
        });
        /* --------------------- Initialize WebSocket.IO Service -------------------- */
        (0, SockerIO_1.initIO)(server);
    }
    /* ------------------------------ Connect Admin ----------------------------- */
    (0, SockerIO_1.connectAdmin)(process.env.JWT_KEY);
});
if (process.env.NODE_ENV !== 'production') {
    startServer();
}
exports.default = app;
