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
exports.requestOTPHandler = void 0;
const sSendToken_1 = require("shared/core/services/Sender/sSendToken");
const context_1 = require("../../../shared/core/context");
const phoneHelper_1 = require("../../../shared/helpers/phoneHelper");
const logError_1 = require("../../../shared/core/error/logError");
const errorVars_1 = require("../../../shared/core/error/errorVars");
const context_2 = require("../../../shared/core/context");
const requestOTPHandler = (ctx, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || (req.body.username && !(0, phoneHelper_1.phoneValidation)(req.body.username))) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
        return;
    }
    yield (0, sSendToken_1.sSendToken)(req.body.username, 'VERIFY');
    (0, context_2.responseSuccess)(req, res, {}, true);
});
exports.requestOTPHandler = requestOTPHandler;
