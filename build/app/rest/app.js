"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../shared/bootstrap");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = require("./config/cors");
const rateLimit_1 = require("./config/rateLimit");
const app = (0, express_1.default)();
app.set('trust proxy', 'loopback');
app.all('*', cors_1.cors);
app.all('*', rateLimit_1.apiLimiter);
app.use(body_parser_1.default.json({ limit: '3mb' }));
app.get('/v1/health', (req, res) => {
    res.send({ smg: 'lives' });
});
exports.default = app;
