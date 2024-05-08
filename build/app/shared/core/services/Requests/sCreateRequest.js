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
exports.sCreateRequest = void 0;
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const rGetRequests_1 = require("shared/core/repo/Requests/rGetRequests");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const helpers_1 = require("../../../helpers");
const rInsertRequests_1 = require("shared/core/repo/Requests/rInsertRequests");
const sAlertNewRequest_1 = require("shared/core/services/Alert/sAlertNewRequest");
const sCreateRequest = (username, title, description, address, feeType, fee, contact, tags) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userValidation_1.userValidation)(username);
    const todayRequests = yield (0, rGetRequests_1.rGetTodayRequestsByUser)(username);
    if (todayRequests.length >= 5) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E017_LIMIT_CREATE_REQUEST_FOR_TODAY, 'LOGIC');
    }
    const requestId = (0, helpers_1.generateRequestId)();
    yield (0, rInsertRequests_1.rInsertRequests)(username, requestId, title, description, address, feeType, fee, contact, tags);
    (0, sAlertNewRequest_1.sAlertNewRequest)(requestId, title, description, username);
});
exports.sCreateRequest = sCreateRequest;
