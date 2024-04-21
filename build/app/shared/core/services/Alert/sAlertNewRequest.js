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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sAlertNewRequest = exports.getContent = void 0;
const axios_1 = __importDefault(require("axios"));
const getContent = (requestId, title, description, from) => {
    return {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'New request :partying_face:. \n\n - RequestID: ' + requestId + '\n - Title: ' + title + ' \n - Description:```' + description + '``` \n- From: `' + from + '` '
                }
            }
        ]
    };
};
exports.getContent = getContent;
const sAlertNewRequest = (requestId, title, description, from) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.SLACK_WEBHOOK_NEW_REQUEST) {
        return;
    }
    yield axios_1.default.post(process.env.SLACK_WEBHOOK_NEW_REQUEST, (0, exports.getContent)(requestId, title, description, from));
});
exports.sAlertNewRequest = sAlertNewRequest;
