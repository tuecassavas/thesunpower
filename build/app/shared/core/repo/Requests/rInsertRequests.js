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
exports.rInsertRequests = void 0;
const dateHelper_1 = require("../../../helpers/dateHelper");
const db_1 = require("../../../types/db");
const modal_1 = require("../../../types/modal");
const rInsertRequests = (username, requestId, title, description, address, feeType, fee, contact, tags) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.REQUESTS);
    yield collection.insertOne({
        title,
        description,
        fee_type: feeType,
        address: address,
        request_id: requestId,
        fee,
        contact: contact !== null && contact !== void 0 ? contact : null,
        created_by: username,
        created_at: (0, dateHelper_1.getCurrentUTC)(),
        status: modal_1.REQUEST_STATUS.PENDING,
        request_queue: [],
        assign_to: null,
        registered_fee: 0,
        tags,
        paid: null,
        is_cancel: false,
        deleted_at: null
    });
});
exports.rInsertRequests = rInsertRequests;
