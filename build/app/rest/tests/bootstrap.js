"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const db_1 = require("../../shared/types/db");
const users_1 = require("./seed/users");
const tags_1 = require("./seed/tags");
const admin_1 = require("./seed/admin");
const mongoDb = __importStar(require("mongodb"));
const connectToDb = () => {
    return new Promise((resolve, reject) => {
        var _a;
        if (!process.env.CONNECTION) {
            reject('No connection string');
        }
        const url = (_a = process.env.CONNECTION) !== null && _a !== void 0 ? _a : '';
        mongoDb.MongoClient.connect(url)
            .then((mongoClient) => {
            resolve(mongoClient);
        })
            .catch(() => {
            reject('error');
        });
    });
};
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield connectToDb();
    const instance = connector.db('codetheoyeucau');
    yield Promise.all([instance.dropCollection(db_1.COLLECTION.USERS), instance.dropCollection(db_1.COLLECTION.TAGS), instance.dropCollection(db_1.COLLECTION.ADMIN)]);
    yield Promise.all([(0, users_1.usersSeeding)(instance), (0, tags_1.tagsSeeding)(instance), (0, admin_1.adminSeeding)(instance)]);
    yield connector.close();
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initDB();
}));
