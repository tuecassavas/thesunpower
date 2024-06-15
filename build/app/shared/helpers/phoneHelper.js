'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.prettierPhoneNumber = exports.phoneValidation = void 0;
const regex_1 = require('./regex');
const phoneValidation = (phoneNumber) => {
  const testInstance = new RegExp(regex_1.phoneRegex);
  return testInstance.test(phoneNumber);
};
exports.phoneValidation = phoneValidation;
const prettierPhoneNumber = (phoneNumber) => {
  const cleanedNumber = phoneNumber.replace(/\D+/g, '');
  return cleanedNumber.replace(/^0/, '84');
};
exports.prettierPhoneNumber = prettierPhoneNumber;
