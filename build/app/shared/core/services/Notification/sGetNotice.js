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
exports.sGetNotice = void 0;
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const rGetNotice_1 = require("shared/core/repo/Notification/rGetNotice");
const rReadNotice_1 = require("shared/core/repo/Notification/rReadNotice");
const sGetNotice = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userValidation_1.userValidation)(username);
    (0, rReadNotice_1.rReadNotice)(id);
    return yield (0, rGetNotice_1.rGetNotice)(username, id);
});
exports.sGetNotice = sGetNotice;
