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
exports.sCreateUserContact = void 0;
const rInsertUserContact_1 = require("shared/core/repo/User/rInsertUserContact");
const sAlertNewCustomerContact_1 = require("shared/core/services/Alert/sAlertNewCustomerContact");
const sCreateUserContact = (phoneNumber, fullName, description) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, rInsertUserContact_1.rInsertCustomerContact)(phoneNumber, fullName, description);
    (0, sAlertNewCustomerContact_1.sAlertNewContact)(phoneNumber, fullName, description);
});
exports.sCreateUserContact = sCreateUserContact;
