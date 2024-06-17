"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const const_1 = require("../../shared/const");
exports.apiLimiter = (0, express_rate_limit_1.default)({
    max: const_1.BASELINE_API_RATE_LIMIT,
    windowMs: 15 * 60 * 1000,
});
