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
exports.rGetAdmin = void 0;
const db_1 = require("../../../types/db");
const rGetAdmin = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.ADMIN);
    const user = yield collection.findOne({ username });
    if (!user) {
        return null;
    }
    return {
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        isBlocked: user.is_blocked,
        name: user.name,
        createdAt: user.created_at
    };
});
exports.rGetAdmin = rGetAdmin;
