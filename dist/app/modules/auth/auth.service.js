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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("./auth.utils");
const user_model_1 = __importDefault(require("../user/user.model"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No user found!");
    }
    //checking if the password is correct
    const isPasswordValid = yield bcrypt_1.default.compare(payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordValid)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match!");
    const token = (0, auth_utils_1.createToken)({ email: user === null || user === void 0 ? void 0 : user.email }, config_1.default.JWT_SECRET_KEY, "10d");
    return token;
});
exports.AuthServices = {
    loginUser,
};
