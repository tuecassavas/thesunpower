"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lVerifyTokenOTP = void 0;
const process_1 = __importDefault(require("process"));
const twilio_1 = require("twilio");
const lVerifyTokenOTP = (phoneNumber, token) => {
    var _a, _b, _c;
    const accountSid = (_a = process_1.default.env.TWILIO_ACCOUNT_SID) !== null && _a !== void 0 ? _a : '';
    const authToken = (_b = process_1.default.env.TWILIO_AUTH_TOKEN) !== null && _b !== void 0 ? _b : '';
    const serviceId = (_c = process_1.default.env.TWILIO_SERVICE_ID) !== null && _c !== void 0 ? _c : '';
    const client = new twilio_1.Twilio(accountSid, authToken);
    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(serviceId)
            .verificationChecks.create({ to: phoneNumber, code: token })
            .then((verification_check) => {
            return resolve(verification_check.status);
        })
            .catch((e) => {
            reject(e);
        });
    });
};
exports.lVerifyTokenOTP = lVerifyTokenOTP;
