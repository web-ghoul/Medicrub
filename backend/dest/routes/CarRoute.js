"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoute = void 0;
const CommontAuth_1 = require("../middlewares/CommontAuth");
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.CarRoute = router;
router.use(CommontAuth_1.Authenticate);
router.post('/Create', controllers_1.CreateCar);
router.post('/AddAlbum', controllers_1.AddCarAlbum);
router.get('/MyCar', controllers_1.GetMyCar);
