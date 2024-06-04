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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rInsertUser = void 0;
const db_1 = require("../../../types/db");
const dateHelper_1 = require("../../../helpers/dateHelper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const rInsertUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.USERS);
    const hashPassword = bcrypt_1.default.hashSync(password, 10);
    yield collection.insertOne({
        username,
        password: hashPassword,
        active: false,
        created_at: (0, dateHelper_1.getCurrentUTC)(),
        deleted_at: null,
        is_blocked: false,
        verified: false
    });
});
exports.rInsertUser = rInsertUser;
