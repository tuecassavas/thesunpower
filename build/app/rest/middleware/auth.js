'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const context_1 = require('../../shared/core/context');
const logError_1 = require('../../shared/core/error/logError');
const errorVars_1 = require('../../shared/core/error/errorVars');
const auth = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
      if (!req.headers.authorization) {
        (0, context_1.responseError)(
          new logError_1.LogError(errorVars_1.ErrorVars.E007_NOT_PERMISSION, 'AUTHENTICATION'),
          req,
          res
        );
        return;
      }
      jsonwebtoken_1.default.verify(
        req.headers.authorization.split(' ')[1],
        (_a = process.env.SECRET_TOKEN) !== null && _a !== void 0 ? _a : ''
      );
      return next();
    } catch (error) {
      (0, context_1.responseError)(
        new logError_1.LogError(errorVars_1.ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'),
        req,
        res
      );
    }
  });
exports.auth = auth;
