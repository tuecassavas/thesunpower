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
exports.sListRequestManagement = void 0;
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const rListUserRequests_1 = require("shared/core/repo/Requests/rListUserRequests");
const sListRequestManagement = (username, pageSize, filter, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userValidation_1.userValidation)(username);
    const requests = yield (0, rListUserRequests_1.rListRequestManager)(username, pageSize, filter, id);
    return requests.map((request) => {
        var _a;
        return ({
            id: request.id,
            tags: request.tags,
            requestId: request.requestId,
            deletedAt: request.deletedAt,
            fee: request.fee,
            feeType: request.feeType,
            createdAt: request.createdAt,
            paid: request.paid,
            title: request.title,
            description: request.description,
            address: request.address,
            contact: (_a = request.contact) !== null && _a !== void 0 ? _a : request.createdBy
        });
    });
});
exports.sListRequestManagement = sListRequestManagement;
