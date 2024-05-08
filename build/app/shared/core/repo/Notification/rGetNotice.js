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
exports.rGetNotice = void 0;
const db_1 = require("../../../types/db");
const rGetNotice = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.NOTIFICATION);
    const result = yield collection.findOne({ $and: [{ $or: [{ username: username }, { username: null }] }, { _id: id }] });
    if (!result) {
        return null;
    }
    return {
        id: result._id.toString(),
        title: result.title,
        description: result.description,
        read: result.read,
        createdAt: result.created_at,
        username: result.username
    };
});
exports.rGetNotice = rGetNotice;
