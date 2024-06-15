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
exports.singleImage = void 0;
const multer_1 = __importDefault(require("multer"));
const logError_1 = require("../../shared/core/error/logError");
const errorVars_1 = require("../../shared/core/error/errorVars");
const context_1 = require("../../shared/core/context");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            callback(null, true);
        }
        else {
            return callback(new Error(errorVars_1.ErrorVars.E026_INVALID_MIME_TYPE));
        }
    }
});
const uploadSingleImage = upload.single('avatarImg');
const singleImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return uploadSingleImage(req, res, (err) => {
        if (err) {
            (0, context_1.responseError)(new logError_1.LogError(err.message, 'LOGIC'), req, res);
        }
        return next();
    });
});
exports.singleImage = singleImage;
