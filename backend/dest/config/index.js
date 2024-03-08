"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRIVERS_SOCKET_CHANNEL = exports.CORS_OPTIONS = exports.REQUIREMENTS_ERROR_MSG = exports.USERNAME_EXIST_ERROR_MSG = exports.EMAIL_EXIST_ERROR_MSG = exports.LOGIN_FAILED_ERROR_MSG = exports.NOT_COMPLETED_DATA_ERROR_MSG = exports.NOT_EXIST_ERROR_MSG = exports.INCOMPLETE_ERROR_MSG = exports.DEFAULT_ERROR_MSG = exports.UNAUTHOREOZED_ERROR_MSG = exports.PATIENT = exports.DRIVER = exports.PAGINATION_PAGE = void 0;
exports.PAGINATION_PAGE = 10;
exports.DRIVER = "driver";
exports.PATIENT = "patient";
exports.UNAUTHOREOZED_ERROR_MSG = "You are not allowed to do this action";
exports.DEFAULT_ERROR_MSG = "An error has occurred. We kindly request that you try again at a later time";
exports.INCOMPLETE_ERROR_MSG = "An error has occurred. We kindly request that you try again at a later time";
exports.NOT_EXIST_ERROR_MSG = "You are trying to get data which is not exist";
exports.NOT_COMPLETED_DATA_ERROR_MSG = "Driver data not completed yet, can't verify driver until all is done";
exports.LOGIN_FAILED_ERROR_MSG = "Username or password is incorrect";
exports.EMAIL_EXIST_ERROR_MSG = "Email address already used";
exports.USERNAME_EXIST_ERROR_MSG = "Username already used";
exports.REQUIREMENTS_ERROR_MSG = "Missing requirements, maybe some uploads";
exports.CORS_OPTIONS = {
    origin: '*',
    credentials: true,
    exposedHeaders: ["set-cookie"],
};
exports.DRIVERS_SOCKET_CHANNEL = "drivers-positions";
// Yo6dhmOhidgYp5ve - 000
