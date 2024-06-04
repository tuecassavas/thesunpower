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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sGetRequestDetail = void 0;
const rGetRequest_1 = require("shared/core/repo/Requests/rGetRequest");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const sGetRequestDetail = (username, requestId, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userValidation_1.userValidation)(username);
    const request = yield (0, rGetRequest_1.rGetRequest)(requestId);
    if (!request) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
    }
    if (isAdmin) {
        return request;
    }
    if (['ASSIGN', 'DONE'].includes(request.status) && request.assignTo !== username) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION');
    }
    if (['ASSIGN', 'DONE'].includes(request.status) && request.assignTo === username) {
        if (!request.contact) {
            request.contact = request.createdBy;
        }
        const { requestQueue } = request, rest = __rest(request, ["requestQueue"]);
        return rest;
    }
    if (request.createdBy === username) {
        if (!request.contact) {
            request.contact = request.createdBy;
        }
        const { requestQueue } = request, rest = __rest(request, ["requestQueue"]);
        return rest;
    }
    const { contact, requestQueue, address, assignTo } = request, rest = __rest(request, ["contact", "requestQueue", "address", "assignTo"]);
    if (rest.createdBy !== username) {
        rest.createdBy = undefined;
    }
    return rest;
});
exports.sGetRequestDetail = sGetRequestDetail;
