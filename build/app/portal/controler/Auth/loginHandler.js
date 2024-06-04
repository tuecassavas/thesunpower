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
exports.loginHandler = void 0;
const phoneHelper_1 = require("../../../shared/helpers/phoneHelper");
const context_1 = require("../../../shared/core/context");
const logError_1 = require("../../../shared/core/error/logError");
const errorVars_1 = require("../../../shared/core/error/errorVars");
const sLogin_1 = require("shared/core/services/Auth/sLogin");
const loginHandler = (ctx, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || (req.body.username && !(0, phoneHelper_1.phoneValidation)(req.body.username))) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
        return;
    }
    if (!req.body.password || (req.body.password && !req.body.password.trim())) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
        return;
    }
    const token = yield (0, sLogin_1.sLogin)(req.body.username, req.body.password);
    (0, context_1.responseSuccess)(req, res, { token });
});
exports.loginHandler = loginHandler;
