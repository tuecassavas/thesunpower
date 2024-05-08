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
exports.registerHandler = void 0;
const logError_1 = require("../../../shared/core/error/logError");
const context_1 = require("../../../shared/core/context");
const errorVars_1 = require("../../../shared/core/error/errorVars");
const phoneHelper_1 = require("../../../shared/helpers/phoneHelper");
const emailHelper_1 = require("../../../shared/helpers/emailHelper");
const sRegister_1 = require("shared/core/services/Auth/sRegister");
const registerHandler = (ctx, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || (req.body.username && !((0, phoneHelper_1.phoneValidation)(req.body.username) || (0, emailHelper_1.emailValidation)(req.body.username)))) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
        return;
    }
    if (!req.body.password || (req.body.password && !req.body.password.trim())) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
        return;
    }
    yield (0, sRegister_1.sRegister)(req.body.username, req.body.password);
    (0, context_1.responseSuccess)(req, res, {}, true);
});
exports.registerHandler = registerHandler;
