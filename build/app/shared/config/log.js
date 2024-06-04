"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_slack_webhook_transport_1 = __importDefault(require("winston-slack-webhook-transport"));
const helpers_1 = require("../helpers");
const getCurrentLogFile = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `logs/thegreenpower_service_log_${year}_${month}.json`;
};
const config = {
    test: {
        format: winston_1.default.format.simple(),
        transports: [new winston_1.default.transports.Console({ silent: true })]
    },
    dev: {
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        transports: [new winston_1.default.transports.Console()]
    },
    production: {
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
        transports: [
            new winston_1.default.transports.File({
                filename: getCurrentLogFile(),
                level: 'error'
            }),
            new winston_1.default.transports.File({
                filename: getCurrentLogFile(),
                level: 'warn'
            }),
            new winston_slack_webhook_transport_1.default({
                webhookUrl: (_a = process.env.SLACK_WEBHOOK) !== null && _a !== void 0 ? _a : '',
                level: 'error',
                formatter: (error) => (0, helpers_1.getSlackMessage)(error)
            })
        ]
    },
    other: {
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        transports: [new winston_1.default.transports.Console()]
    }
};
const logger = winston_1.default.createLogger(config[process.env.NODE_ENV] ? config[process.env.NODE_ENV] : config.other);
exports.default = logger;
