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
exports.sPutRegisterRequest = void 0;
const rGetRequest_1 = require("shared/core/repo/Requests/rGetRequest");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const rUpdateRequestQueue_1 = require("shared/core/repo/Requests/rUpdateRequestQueue");
const sAlertNewSubmitRequest_1 = require("shared/core/services/Alert/sAlertNewSubmitRequest");
const sPutRegisterRequest = (username, requestId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield (0, userValidation_1.userValidation)(username);
    const currentRequest = yield (0, rGetRequest_1.rGetRequest)(requestId);
    if (!currentRequest) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
    }
    if (currentRequest.deletedAt || ['ASSIGN', 'DONE', 'PENDING'].includes(currentRequest.status)) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E029_REQUEST_NOT_AVAILABLE, 'LOGIC');
    }
    if (currentRequest.createdBy === username) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E030_UNABLE_SUBMIT_REQUEST, 'LOGIC');
    }
    if (((_a = currentRequest.requestQueue) === null || _a === void 0 ? void 0 : _a.length) === 5) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E031_LIMIT_SUBMIT_REQUEST, 'LOGIC');
    }
    if ((currentRequest === null || currentRequest === void 0 ? void 0 : currentRequest.requestQueue) && (currentRequest === null || currentRequest === void 0 ? void 0 : currentRequest.requestQueue.includes(username))) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E032_DUPLICATE_SUBMIT_REQUEST, 'LOGIC');
    }
    const newRequestQueue = (currentRequest === null || currentRequest === void 0 ? void 0 : currentRequest.requestQueue) ? [...currentRequest.requestQueue] : [];
    newRequestQueue.push(username);
    yield (0, rUpdateRequestQueue_1.rUpdateRequestQueue)(requestId, username, newRequestQueue);
    (0, sAlertNewSubmitRequest_1.sAlertNewSubmitRequest)(requestId, currentRequest.title, (_b = currentRequest.createdBy) !== null && _b !== void 0 ? _b : '', username, newRequestQueue.length);
});
exports.sPutRegisterRequest = sPutRegisterRequest;
