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
Object.defineProperty(exports, '__esModule', { value: true });
exports.tagsSeeding = void 0;
const db_1 = require('../../../shared/types/db');
const tagsSeeding = (db) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tagsCollection = yield db.collection(db_1.COLLECTION.TAGS);
    yield tagsCollection.insertOne({
      tags: [
        'WEB',
        'MOBILE',
        'TESTING',
        'SECURITY',
        'CLOUD',
        'NETWORK',
        'MENTOR',
        'EMBEDDED',
        'ANDROID',
        'IOS',
        'SEMINAR',
        'DESIGN',
        'DATA',
        'OTHER',
      ],
    });
  });
exports.tagsSeeding = tagsSeeding;
