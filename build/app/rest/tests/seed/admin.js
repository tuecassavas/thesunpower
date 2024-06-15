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
exports.adminSeeding = void 0;
const db_1 = require("../../../shared/types/db");
const adminSeeding = (db) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield db.collection(db_1.COLLECTION.ADMIN);
    yield collection.insertOne(
    // Full access user
    {
        username: '84344465654',
        password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC',
        is_blocked: false,
        name: 'Tue Nguyen',
        created_at: new Date()
    });
});
exports.adminSeeding = adminSeeding;
