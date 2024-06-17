"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOf = void 0;
const typeOf = (object) => {
    return Object.prototype.toString.call(object).slice(8, -1);
};
exports.typeOf = typeOf;
