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
exports.rGetRequests = exports.rGetTodayRequestsByUser = void 0;
const db_1 = require("../../../types/db");
const modal_1 = require("../../../types/modal");
const rGetTodayRequestsByUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.REQUESTS);
    const now = new Date();
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return yield collection
        .find({
        username,
        created_at: {
            $gte: now,
            $lt: twentyFourHoursFromNow
        }
    })
        .toArray();
});
exports.rGetTodayRequestsByUser = rGetTodayRequestsByUser;
const rGetRequests = (pageSize, isAdmin, id, tags, status, requestId, isDelete, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.REQUESTS);
    const query = { $and: [] };
    if (id) {
        query.$and.push({
            _id: {
                $gt: id
            }
        });
    }
    if (tags && tags.length > 0) {
        query.$and.push({
            tags: { $in: tags }
        });
    }
    if (status && status.length > 0 && typeof status !== 'string') {
        query.$and.push({ status: { $in: status } });
    }
    if (status && status.length > 0 && typeof status === 'string') {
        query.$and.push({ status: status });
    }
    if (requestId) {
        query.$and.push({ request_id: requestId });
    }
    if (isDelete) {
        query.$and.push({ deleted_at: { $ne: null } });
    }
    if (createdBy) {
        query.$and.push({ created_by: createdBy });
    }
    if (!isAdmin) {
        query.$and.push({ status: modal_1.REQUEST_STATUS.APPROVE });
        query.$and.push({ deleted_at: null });
        query.$and.push({
            request_queue: { $exists: true, $not: { $size: 5 } }
        });
        query.$and.push({ is_cancel: false });
    }
    const requests = yield collection
        .find(query.$and.length === 0 ? {} : query)
        .limit(pageSize)
        .sort({ _id: -1 })
        .toArray();
    return requests.map((request) => ({
        id: request._id.toString(),
        requestId: request.request_id,
        title: request.title,
        description: request.description,
        address: request.address,
        contact: request.contact,
        feeType: request.fee_type,
        fee: request.fee,
        tags: request.tags,
        paid: request.paid,
        status: request.status,
        assignTo: request.assign_to,
        deletedAt: request.deleted_at,
        createdAt: request.created_at,
        requestQueue: request.request_queue,
        isCancel: request.is_cancel,
        createdBy: request.created_by
    }));
});
exports.rGetRequests = rGetRequests;
