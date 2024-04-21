"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const process = __importStar(require("process"));
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const sLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield (0, userValidation_1.userValidation)(username);
    if (!bcrypt_1.default.compareSync(password, user.password)) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E003_PASSWORD_NOT_CORRECT, 'LOGIC');
    }
    if (user.isBlocked) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
    }
    if (user.deletedAt) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
    }
    return jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
        dob: user.dob,
        gender: user.gender,
        email: user.email,
        address: user.address,
        avatarUrl: user.avatarUrl
    }, (_a = process.env.SECRET_TOKEN) !== null && _a !== void 0 ? _a : ' ');
});
exports.sLogin = sLogin;
