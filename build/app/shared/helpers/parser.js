'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.arrayParser = exports.toObjectId = void 0;
const mongodb_1 = require('mongodb');
const logError_1 = require('../core/error/logError');
const errorVars_1 = require('../core/error/errorVars');
const toObjectId = (id) => {
  try {
    return new mongodb_1.ObjectId(id);
  } catch (e) {
    throw new logError_1.LogError(errorVars_1.ErrorVars.E011_ID_NOT_CORRECTLY, 'LOGIC');
  }
};
exports.toObjectId = toObjectId;
const arrayParser = (stringArray) => {
  try {
    return JSON.parse(stringArray);
  } catch (e) {
    throw new logError_1.LogError(errorVars_1.ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC');
  }
};
exports.arrayParser = arrayParser;
