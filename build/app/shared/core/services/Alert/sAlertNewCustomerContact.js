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
exports.sAlertNewContact = exports.getContent = void 0;
const axios_1 = __importDefault(require("axios"));
const getContent = (phoneNumber, name, description) => {
    return {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'New contact :partying_face:. \n\n - Phone Number: `' + phoneNumber + '` \n - Name: `' + name + '`\n - Description: ```' + description + '```\n'
                }
            }
        ]
    };
};
exports.getContent = getContent;
const sAlertNewContact = (phoneNumber, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.SLACK_WEBHOOK_CUSTOMER_CONTACT) {
        return;
    }
    yield axios_1.default.post(process.env.SLACK_WEBHOOK_CUSTOMER_CONTACT, (0, exports.getContent)(phoneNumber, name, description));
});
exports.sAlertNewContact = sAlertNewContact;
