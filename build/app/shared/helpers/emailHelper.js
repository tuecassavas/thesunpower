"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = void 0;
const regex_1 = require("./regex");
const emailValidation = (email) => {
    const testInstance = new RegExp(regex_1.emailRegex);
    return testInstance.test(email);
};
exports.emailValidation = emailValidation;
