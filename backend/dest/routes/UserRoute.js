"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const CommontAuth_1 = require("../middlewares/CommontAuth");
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.UserRoute = router;
router.post('/Exist', controllers_1.CheckEmailExist);
router.use(CommontAuth_1.Authenticate);
router.get('/Profile', controllers_1.GetProfile);
