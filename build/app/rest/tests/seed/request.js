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
exports.requestSeed = void 0;
const db_1 = require('../../../shared/types/db');
const requestSeed = (db) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tagsCollection = yield db.collection(db_1.COLLECTION.REQUESTS);
    yield tagsCollection.insertOne({
      title: 'find developer make flutter application',
      description: 'working remote',
      fee_type: 'PROJECT',
      address: '123/456',
      request_id: '1234',
      fee: '2.000.000',
      contact: null,
      created_by: '84339440639',
      created_at: new Date(),
      status: 'PENDING',
      request_queue: [],
      assign_to: null,
      registered_fee: 0,
      tags: ['MOBILE', 'NETWORK'],
      paid: null,
      is_cancel: false,
      deleted_at: null,
    });
  });
exports.requestSeed = requestSeed;
