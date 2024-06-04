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
exports.requestValidation = void 0;
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const modal_1 = require("../../../types/modal");
const rGetRequest_1 = require("shared/core/repo/Requests/rGetRequest");
const requestValidation = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, rGetRequest_1.rGetRequest)(requestId);
    if (!request) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
    }
    if (!(request.status === modal_1.REQUEST_STATUS.PENDING)) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E029_REQUEST_NOT_AVAILABLE, 'LOGIC');
    }
    if (request.deletedAt || request.isCancel) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E029_REQUEST_NOT_AVAILABLE, 'LOGIC');
    }
    return request;
});
exports.requestValidation = requestValidation;
