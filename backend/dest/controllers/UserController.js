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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfile = void 0;
const model_1 = require("../model");
const config_1 = require("../config");
/* -------------------------------------------------------------------------- */
/*                                 Get Profile                                */
/* -------------------------------------------------------------------------- */
const GetProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.user;
        if (userPayload) {
            const user = yield model_1.User.findById(userPayload._id).populate('location');
            if (user) {
                return res.status(400).json({ data: user });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetProfile = GetProfile;
