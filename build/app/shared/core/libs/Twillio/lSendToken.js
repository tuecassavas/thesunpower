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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lSendToken = void 0;
const twilio_1 = require("twilio");
const process = __importStar(require("process"));
const lSendToken = (phoneNumber) => {
    var _a, _b, _c;
    const accountSid = (_a = process.env.TWILIO_ACCOUNT_SID) !== null && _a !== void 0 ? _a : '';
    const authToken = (_b = process.env.TWILIO_AUTH_TOKEN) !== null && _b !== void 0 ? _b : '';
    const serviceId = (_c = process.env.TWILIO_SERVICE_ID) !== null && _c !== void 0 ? _c : '';
    const client = new twilio_1.Twilio(accountSid, authToken);
    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(serviceId)
            .verifications.create({ to: phoneNumber, channel: 'sms' })
            .then((verification) => resolve(verification))
            .catch((e) => {
            reject(e);
        });
    });
};
exports.lSendToken = lSendToken;
