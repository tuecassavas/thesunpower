"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogError = void 0;
class LogError {
    constructor(error, name = 'INTERNAL', fields, stack, reason) {
        let errorStr = '';
        if (typeof error === typeof Error) {
            errorStr = error.message;
        }
        else {
            errorStr = error;
        }
        this.name = name;
        this.message = errorStr;
        this.fields = fields;
        this.stack = stack;
        this.reason = reason;
    }
}
exports.LogError = LogError;
