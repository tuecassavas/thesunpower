"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDOB = void 0;
const date_fns_1 = require("date-fns");
const isValidDOB = (dateString) => {
    if (!dateString) {
        return false;
    }
    const dateFormat = 'dd/MM/yyyy';
    if (!(0, date_fns_1.isDate)((0, date_fns_1.parse)(dateString, dateFormat, new Date()))) {
        return false;
    }
    return (0, date_fns_1.isValid)((0, date_fns_1.parse)(dateString, dateFormat, new Date()));
};
exports.isValidDOB = isValidDOB;
