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
exports.rInsertCustomerContact = void 0;
const dateHelper_1 = require("../../../helpers/dateHelper");
const db_1 = require("../../../types/db");
const modal_1 = require("../../../types/modal");
const rInsertCustomerContact = (phoneNumber, fullName, description) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.CUSTOMER_CONTACT);
    yield collection.insertOne({
        phone_number: phoneNumber,
        full_name: fullName,
        description,
        status: modal_1.CUSTOMER_CONTACT_STATUS.PENDING,
        created_at: (0, dateHelper_1.getCurrentUTC)(),
        deleted_at: null
    });
});
exports.rInsertCustomerContact = rInsertCustomerContact;
