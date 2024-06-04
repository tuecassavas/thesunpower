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
exports.sEditUserProfile = void 0;
const phoneHelper_1 = require("../../../helpers/phoneHelper");
const rGetUser_1 = require("shared/core/repo/User/rGetUser");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const rUpdateUserProfile_1 = require("shared/core/repo/User/rUpdateUserProfile");
const helpers_1 = require("../../../helpers");
const sEditUserProfile = (username, last_name, first_name, gender, address, email, dob, tags, school) => __awaiter(void 0, void 0, void 0, function* () {
    let _username = username;
    if ((0, phoneHelper_1.phoneValidation)(username)) {
        _username = (0, phoneHelper_1.prettierPhoneNumber)(username);
    }
    const user = yield (0, rGetUser_1.rGetUserByUsername)(_username);
    if (!user) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
    }
    if (!user.active) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E005_USER_PENDING, 'LOGIC');
    }
    if (user.deletedAt) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
    }
    if (user.isBlocked) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
    }
    if (!user.verified) {
        const payload = {
            last_name,
            first_name,
            gender,
            address,
            email,
            dob,
            tags,
            school
        };
        const validate = (0, helpers_1.validationField)(payload, ['last_name', 'first_name', 'gender', 'address', 'email', 'dob', 'tags', 'school']);
        if (validate.length > 0) {
            throw new logError_1.LogError(errorVars_1.ErrorVars.E035_REQUIRE_VERIFY_INFORMATION, 'LOGIC');
        }
    }
    yield (0, rUpdateUserProfile_1.rUpdateUserProfile)(_username, last_name, first_name, gender, address, email, dob, tags, school);
});
exports.sEditUserProfile = sEditUserProfile;
