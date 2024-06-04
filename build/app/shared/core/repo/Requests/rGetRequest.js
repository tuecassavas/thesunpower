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
exports.rGetRequest = void 0;
const db_1 = require("../../../types/db");
const rGetRequest = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.REQUESTS);
    const request = yield collection.findOne({ request_id: requestId });
    if (!request) {
        return null;
    }
    return {
        id: request._id.toString(),
        requestId: request.request_id,
        title: request.title,
        fee: request.fee,
        tags: request.tags,
        paid: request.paid,
        status: request.status,
        assignTo: request.assign_to,
        address: request.address,
        contact: request.contact,
        feeType: request.fee_type,
        createdAt: request.created_at,
        createdBy: request.created_by,
        description: request.description,
        deletedAt: request.deleted_at,
        isCancel: request.is_cancel,
        requestQueue: request.request_queue
    };
});
exports.rGetRequest = rGetRequest;
