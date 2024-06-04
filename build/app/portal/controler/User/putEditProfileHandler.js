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
exports.putEditProfileHandler = void 0;
const context_1 = require("../../../shared/core/context");
const logError_1 = require("../../../shared/core/error/logError");
const errorVars_1 = require("../../../shared/core/error/errorVars");
const emailHelper_1 = require("../../../shared/helpers/emailHelper");
const dateValidation_1 = require("shared/core/services/helpers/dateValidation");
const sEditUserProfile_1 = require("shared/core/services/User/sEditUserProfile");
const helpers_1 = require("../../../shared/helpers");
const putEditProfileHandler = (ctx, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { lastName, firstName, address, email, dob, gender, tags, school } = req.body;
    if (!req.headers.authorization) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
        return;
    }
    if (lastName && lastName.length > 39) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    }
    if (firstName && firstName.length > 39) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    }
    if (address && address.length > 256) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    }
    if (school && school.length > 256) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    }
    if (email && email.length > 256) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    }
    if (email && !(0, emailHelper_1.emailValidation)(email)) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E008_EMAIL_INVALID, 'LOGIC'), req, res);
    }
    if (dob && !(0, dateValidation_1.isValidDOB)(dob)) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E015_DATE_IS_NOT_VALID, 'LOGIC'), req, res);
    }
    if (gender && gender !== 'MALE' && gender !== 'FEMALE') {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC'), req, res);
    }
    if (tags && tags.length > 0 && !(0, helpers_1.isStringArray)(tags)) {
        (0, context_1.responseError)(new logError_1.LogError(errorVars_1.ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC', ['tags']), req, res);
    }
    const payload = (0, helpers_1.getTokenPayload)(req.headers.authorization.split(' ')[1], (_a = process.env.SECRET_TOKEN) !== null && _a !== void 0 ? _a : '');
    yield (0, sEditUserProfile_1.sEditUserProfile)(payload.username, lastName, firstName, gender, address, email, dob, tags, school);
    (0, context_1.responseSuccess)(req, res, {}, true);
});
exports.putEditProfileHandler = putEditProfileHandler;
