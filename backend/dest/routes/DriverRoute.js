"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoute = void 0;
const CommontAuth_1 = require("../middlewares/CommontAuth");
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.DriverRoute = router;
router.use(CommontAuth_1.Authenticate);
router.get('/Check', controllers_1.CheckDriver);
router.get('/Driver', controllers_1.GetDriver);
router.post('/AddLicense', controllers_1.AddDriverLicense);
router.put('/UpdatePosition', controllers_1.UpdateDriverPosition);
router.put('/UpdateStatus', controllers_1.UpdateDriverStatus);
