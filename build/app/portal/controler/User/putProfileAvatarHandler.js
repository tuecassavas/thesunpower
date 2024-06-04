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
exports.putProfileAvatarHandler = void 0;
const context_1 = require("../../../shared/core/context");
const logError_1 = require("../../../shared/core/error/logError");
const errorVars_1 = require("../../../shared/core/error/errorVars");
const helpers_1 = require("../../../shared/helpers");
const sEditUserAvatar_1 = require("shared/core/services/User/sEditUserAvatar");
const putProfileAvatarHandler = (ctx, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers.authorization) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
        return;
    }
    const payload = (0, helpers_1.getTokenPayload)(req.headers.authorization.split(' ')[1], (_a = process.env.SECRET_TOKEN) !== null && _a !== void 0 ? _a : '');
    if (!req.file) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E025_UPLOAD_DATA_FAILURE, 'INTEGRATION');
    }
    const extension = req.file.mimetype.split('/')[1];
    yield (0, sEditUserAvatar_1.sEditUserProfile)(payload.username, req.file.buffer, extension);
    (0, context_1.responseSuccess)(req, res, {}, true);
});
exports.putProfileAvatarHandler = putProfileAvatarHandler;
