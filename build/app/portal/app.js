"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../shared/bootstrap");
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = require("../rest/config/cors");
const rateLimit_1 = require("../rest/config/rateLimit");
const loginHandler_1 = require("rest/controler/Auth/loginHandler");
const context_1 = require("../rest/middleware/context");
const catchControler_1 = require("../rest/middleware/catchControler");
const registerHandler_1 = require("rest/controler/Auth/registerHandler");
const changePasswordHandler_1 = require("rest/controler/Auth/changePasswordHandler");
const verifyOTPHandler_1 = require("rest/controler/Auth/verifyOTPHandler");
const forgotPasswordHandler_1 = require("rest/controler/Auth/forgotPasswordHandler");
const auth_1 = require("../rest/middleware/auth");
const getProfileHandler_1 = require("rest/controler/User/getProfileHandler");
const putEditProfileHandler_1 = require("rest/controler/User/putEditProfileHandler");
const requestOTPHandler_1 = require("rest/controler/Auth/requestOTPHandler");
const putProfileAvatarHandler_1 = require("rest/controler/User/putProfileAvatarHandler");
const fileUpload_1 = require("../rest/middleware/fileUpload");
const path = require('path');
const app = (0, express_1.default)();
app.use(express_1.default.static(path.join('./app/rest/public')));
app.set('views', './app/rest/views');
app.set('view engine', 'ejs');
app.set('trust proxy', 'loopback');
app.all('*', cors_1.cors);
app.all('*', rateLimit_1.apiLimiter);
app.use(body_parser_1.default.json({ limit: '3mb' }));
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/v1/health', (req, res) => {
    res.send({ smg: 'lives' });
});
app.post('/v1/login', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(loginHandler_1.loginHandler)));
app.post('/v1/sign-up', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(registerHandler_1.registerHandler)));
app.post('/v1/verify', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(verifyOTPHandler_1.verifyOTPHandler)));
app.post('/v1/request-otp', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(requestOTPHandler_1.requestOTPHandler)));
app.post('/v1/change-password', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(changePasswordHandler_1.changePasswordHandler)));
app.post('/v1/forgot', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(forgotPasswordHandler_1.requestForgotPasswordHandler)));
app.post('/v1/verify-forgot', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(forgotPasswordHandler_1.verifyForgotPasswordToken)));
app.post('/v1/set-password', context_1.context, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(forgotPasswordHandler_1.setPasswordHandler)));
app.get('/v1/profile', context_1.context, auth_1.auth, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(getProfileHandler_1.getProfileHandler)));
app.put('/v1/profile-avatar', context_1.context, auth_1.auth, fileUpload_1.singleImage, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(putProfileAvatarHandler_1.putProfileAvatarHandler)));
app.put('/v1/profile', context_1.context, auth_1.auth, (0, express_async_handler_1.default)((0, catchControler_1.catchHandler)(putEditProfileHandler_1.putEditProfileHandler)));
exports.default = app;
