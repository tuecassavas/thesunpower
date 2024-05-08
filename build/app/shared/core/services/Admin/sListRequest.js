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
exports.sListAdminRequest = void 0;
const rGetRequests_1 = require("shared/core/repo/Requests/rGetRequests");
const sListAdminRequest = (pageSize, id, requestId, createdBy, status) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield (0, rGetRequests_1.rGetRequests)(pageSize, true, id, undefined, status, requestId, undefined, createdBy);
    return requests.map((request) => ({
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
        requestQueue: request.requestQueue,
        address: request.address,
        createdBy: request.createdBy,
        isCancel: request.isCancel,
        assignTo: request.assignTo,
        status: request.status,
        contact: request.contact
    }));
});
exports.sListAdminRequest = sListAdminRequest;
