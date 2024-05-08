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
exports.rListRequestManager = void 0;
const modal_1 = require("../../../types/modal");
const db_1 = require("../../../types/db");
const rListRequestManager = (username, pageSize, status, id) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.REQUESTS);
    let query;
    switch (status) {
        case modal_1.REQUEST_STATE_STATUS.CREATED:
            query = {
                $and: [
                    {
                        created_by: username
                    },
                    {
                        is_cancel: false
                    }
                ]
            };
            break;
        case modal_1.REQUEST_STATE_STATUS.ASSIGN:
            query = {
                $and: [
                    {
                        assign_to: username
                    },
                    {
                        is_cancel: false
                    }
                ]
            };
            break;
        case modal_1.REQUEST_STATE_STATUS.CANCEL:
            query = {
                $and: [
                    { $or: [{ assign_to: username }, { created_by: username }] },
                    {
                        is_cancel: true
                    }
                ]
            };
            break;
    }
    if (id) {
        query.$and.push({
            _id: {
                $gt: id
            }
        });
    }
    const requests = yield collection.find(query).limit(pageSize).sort({ _id: -1 }).toArray();
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
exports.rListRequestManager = rListRequestManager;
