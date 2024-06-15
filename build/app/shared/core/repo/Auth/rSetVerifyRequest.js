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
exports.rSetSubmitVerifyRequest = exports.rSetSendVerifyRequest = void 0;
const db_1 = require("../../../types/db");
const dateHelper_1 = require("../../../helpers/dateHelper");
const rSetSendVerifyRequest = (userName, otp, numberOfSendOTP, type) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.VERIFY);
    yield collection.updateOne({ username: userName }, {
        $set: {
            otp,
            number_of_submit_OTP: 0,
            number_of_send_OTP: numberOfSendOTP,
            updated_at: (0, dateHelper_1.getCurrentUTC)(),
            type
        }
    }, { upsert: true });
});
exports.rSetSendVerifyRequest = rSetSendVerifyRequest;
const rSetSubmitVerifyRequest = (userName, numberOfSubmitOTP) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = yield global.db;
    const instance = connector.db(db_1.DB);
    const collection = instance.collection(db_1.COLLECTION.VERIFY);
    yield collection.updateOne({ username: userName }, { $set: { number_of_submit_OTP: numberOfSubmitOTP } });
});
exports.rSetSubmitVerifyRequest = rSetSubmitVerifyRequest;
