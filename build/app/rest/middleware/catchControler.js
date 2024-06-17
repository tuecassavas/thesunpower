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
exports.catchHandler = void 0;
const context_1 = require("../../shared/core/context");
const catchHandler = (handler) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield handler(res.locals.ctx, req, res);
        }
        catch (e) {
            (0, context_1.responseError)(e, req, res);
        }
    });
};
exports.catchHandler = catchHandler;
