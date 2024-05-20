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
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.set('trust proxy', 'loopback');
app.all('*', cors_1.cors);
app.all('*', rateLimit_1.apiLimiter);
app.use(body_parser_1.default.json({ limit: '3mb' }));
app.use(express_1.default.static(path_1.default.join('./app/rest/public')));
app.set("views", path_1.default.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/products', (req, res) => {
    res.render('products');
});
app.get('/news', (req, res) => {
    res.render('news');
});
app.get('/v1/health', (req, res) => {
    res.send({ smg: 'lives' });
});
exports.default = app;
