'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.decimalFee = exports.intRegex = exports.emailRegex = exports.phoneRegex = void 0;
exports.phoneRegex = /(84[3|5|7|8|9]|0[3|5|7|8|9])+([0-9]{8})\b/;
exports.emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
exports.intRegex = /^\d+$/;
exports.decimalFee = /^[0-9.]+$/;
