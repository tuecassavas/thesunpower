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
exports.sSendToken = void 0;
const helpers_1 = require("../../../helpers");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const rGetVerifyRequest_1 = require("../../repo/Auth/rGetVerifyRequest");
const dateHelper_1 = require("../../../helpers/dateHelper");
const rSetVerifyRequest_1 = require("../../repo/Auth/rSetVerifyRequest");
const rGetUser_1 = require("shared/core/repo/User/rGetUser");
const phoneHelper_1 = require("../../../helpers/phoneHelper");
const lSendOTP_1 = require("../../libs/FPT/lSendOTP");
const sSendToken = (phoneNumber, type) => __awaiter(void 0, void 0, void 0, function* () {
    let username = phoneNumber;
    if ((0, phoneHelper_1.phoneValidation)(phoneNumber)) {
        username = (0, phoneHelper_1.prettierPhoneNumber)(phoneNumber);
    }
    const user = yield (0, rGetUser_1.rGetUserByUsername)(username);
    if (type === 'FORGOT' && !user) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
    }
    if (type === 'FORGOT' && user && !user.active) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E005_USER_PENDING, 'LOGIC');
    }
    if (type === 'VERIFY' && user && user.active) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E022_USER_IS_ACTIVE, 'LOGIC');
    }
    const verifyRequest = yield (0, rGetVerifyRequest_1.rGetVerifyRequest)(username);
    if (verifyRequest && !(0, dateHelper_1.isDistanceGatherThan)(verifyRequest.updatedAt, 86400000)) {
        if (verifyRequest.numberOfSendOTP > 3) {
            throw new logError_1.LogError(errorVars_1.ErrorVars.E018_LIMIT_VERIFY_OTP, 'LOGIC');
        }
        if (!(0, dateHelper_1.isDistanceGatherThan)(verifyRequest.updatedAt, 60000)) {
            throw new logError_1.LogError(errorVars_1.ErrorVars.E021_DISTANCE_MUST_BE_GATHER_MINUTE, 'LOGIC');
        }
    }
    const otp = (0, helpers_1.generateOTP)();
    yield (0, lSendOTP_1.lSendOTP)(username, otp);
    const numberOfSendOTP = verifyRequest ? verifyRequest.numberOfSendOTP + 1 : 1;
    yield (0, rSetVerifyRequest_1.rSetSendVerifyRequest)(username, otp, numberOfSendOTP, type);
});
exports.sSendToken = sSendToken;
