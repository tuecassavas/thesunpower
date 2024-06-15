"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
let path = '';
if (process.env.NODE_ENV) {
    path = `.${process.env.NODE_ENV}.env`;
}
if (process.env.NODE_ENV === 'production') {
    path = '.env';
}
if (!process.env.NODE_ENV) {
    path = '.dev.env';
}
dotenv_1.default.config({
    path
});
// global.db = db;
// global.logger = logger;
