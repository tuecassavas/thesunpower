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
exports.sListNotice = void 0;
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const rListNotice_1 = require("shared/core/repo/Notification/rListNotice");
const sListNotice = (username) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userValidation_1.userValidation)(username);
    return yield (0, rListNotice_1.rListNotice)(username);
});
exports.sListNotice = sListNotice;
