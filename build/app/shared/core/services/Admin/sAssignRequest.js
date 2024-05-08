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
exports.sAssignRequest = void 0;
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const rAssignRequest_1 = require("shared/core/repo/Admin/rAssignRequest");
const rGetRequest_1 = require("shared/core/repo/Requests/rGetRequest");
const sCreateNotice_1 = require("shared/core/services/Notification/sCreateNotice");
const const_1 = require("../../../const");
const sAssignRequest = (requestId, assignTo) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield (0, userValidation_1.userValidation)(assignTo);
    yield (0, rAssignRequest_1.rAssignRequest)(requestId, assignTo);
    const currentRequest = yield (0, rGetRequest_1.rGetRequest)(requestId);
    if (!currentRequest) {
        return;
    }
    yield (0, sCreateNotice_1.sCreateNotice)(const_1.APPROVE_TITLE, (0, const_1.APPROVE_DESCRIPTION)(requestId), assignTo);
    if (currentRequest.requestQueue && currentRequest.requestQueue.length === 0) {
        return;
    }
    (_a = currentRequest.requestQueue) === null || _a === void 0 ? void 0 : _a.map((username) => __awaiter(void 0, void 0, void 0, function* () {
        if (username !== assignTo) {
            yield (0, sCreateNotice_1.sCreateNotice)(const_1.REJECT_TITLE, (0, const_1.REJECT_DESCRIPTION)(requestId), username);
        }
    }));
});
exports.sAssignRequest = sAssignRequest;
