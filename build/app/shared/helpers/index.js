"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefinedFields = exports.generateRequestId = exports.isStringArray = exports.validationField = exports.isInteger = exports.getTokenPayload = exports.getSlackMessage = exports.utf8ToBase64 = exports.generateOTP = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logError_1 = require("../core/error/logError");
const errorVars_1 = require("../core/error/errorVars");
const regex_1 = require("./regex");
const generateOTP = () => {
    const OTP_LENGTH = 4;
    let otp = '';
    for (let i = 0; i < OTP_LENGTH; i++) {
        const digit = Math.floor(Math.random() * 10);
        otp += digit.toString();
    }
    return otp;
};
exports.generateOTP = generateOTP;
const utf8ToBase64 = (str) => {
    const encoded = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    });
    return btoa(encoded);
};
exports.utf8ToBase64 = utf8ToBase64;
const jsonToMarkdown = (jsonObj, depth = 0) => {
    let markdown = '';
    if (typeof jsonObj === 'object') {
        if (Array.isArray(jsonObj)) {
            markdown += `${'  '.repeat(depth)}- `;
            jsonObj.forEach((item) => {
                markdown += jsonToMarkdown(item, depth + 1) + '\n';
            });
        }
        else {
            markdown += '{\n';
            for (const key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    markdown += `${'  '.repeat(depth + 1)}${key}: ${jsonToMarkdown(jsonObj[key], depth + 1)}\n`;
                }
            }
            markdown += `${'  '.repeat(depth)}}`;
        }
    }
    else {
        markdown += jsonObj;
    }
    return markdown;
};
const getSlackMessage = (error) => {
    return {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Hey Tue 👋. There is very important notice, thesunpower.com has extremely serious error.'
                }
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `\`\`\` ${jsonToMarkdown(error)}\`\`\``
                }
            }
        ]
    };
};
exports.getSlackMessage = getSlackMessage;
const getTokenPayload = (token, key) => {
    try {
        return jsonwebtoken_1.default.verify(token, key);
    }
    catch (e) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E007_NOT_PERMISSION, 'AUTHENTICATION');
    }
};
exports.getTokenPayload = getTokenPayload;
const isInteger = (str) => {
    return regex_1.intRegex.test(str);
};
exports.isInteger = isInteger;
const validationField = (payload, requireFields) => {
    const fields = [];
    requireFields.map((requireField) => {
        if (payload[requireField] === null || payload[requireField] === undefined) {
            fields.push(requireField);
        }
    });
    return fields;
};
exports.validationField = validationField;
const isStringArray = (arr) => {
    if (!Array.isArray(arr)) {
        return false;
    }
    return arr.every((element) => typeof element === 'string');
};
exports.isStringArray = isStringArray;
const generateRequestId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateRequestId = generateRequestId;
const removeUndefinedFields = (obj) => {
    for (let key in obj) {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
};
exports.removeUndefinedFields = removeUndefinedFields;
