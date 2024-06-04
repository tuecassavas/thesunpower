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
exports.rListNotice = void 0;
const db_1 = require("../../../types/db");
const rListNotice = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.NOTIFICATION);
    const result = yield collection
        .find({ $or: [{ username: username }, { username: null }] })
        .limit(50)
        .sort({ _id: -1 })
        .toArray();
    return result.map((r) => ({
        id: r._id.toString(),
        title: r.title,
        description: r.description,
        read: r.read,
        createdAt: r.created_at,
        username: r.username
    }));
});
exports.rListNotice = rListNotice;
