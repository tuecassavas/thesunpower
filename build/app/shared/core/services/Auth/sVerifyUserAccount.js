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
exports.sVerifyUserAccount = void 0;
const phoneHelper_1 = require("../../../helpers/phoneHelper");
const rActiveUser_1 = require("../../repo/Auth/rActiveUser");
const sVerifyOTP_1 = require("shared/core/services/Sender/sVerifyOTP");
const sVerifyUserAccount = (phoneNumber, token) => __awaiter(void 0, void 0, void 0, function* () {
    const _phoneNumber = (0, phoneHelper_1.prettierPhoneNumber)(phoneNumber);
    yield (0, sVerifyOTP_1.sVerifyOTP)(_phoneNumber, token, 'VERIFY');
    yield (0, rActiveUser_1.rActiveStatus)(_phoneNumber);
});
exports.sVerifyUserAccount = sVerifyUserAccount;
