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
exports.usersSeeding = void 0;
const db_1 = require('../../../shared/types/db');
const usersSeeding = (db) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield db.collection(db_1.COLLECTION.USERS);
    yield collection.insertMany([
      // Full access user
      {
        username: '84344465654',
        password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC',
        active: true,
        created_at: new Date(),
        deleted_at: null,
        is_blocked: false,
        verified: true,
        address: '81 nguyen son ha p5 q3',
        dob: '30/06/1999',
        email: 'nvtuehcmus@gmail.com',
        first_name: 'Tue',
        gender: 'MALE',
        last_name: 'Nguyen',
        school: 'khtt',
        tags: ['WEB', 'MOBILE', 'SECURITY'],
        avatar_url: 'https://codetheoyeucau-metadata.s3.ap-southeast-1.amazonaws.com/84344465654/avatar.jpg',
      },
      // No information user
      {
        username: '84329579782',
        password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC',
        active: true,
        created_at: new Date(),
        deleted_at: null,
        is_blocked: false,
        verified: false,
      },
      // Not active user
      {
        username: '84329579783',
        password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC',
        active: false,
        created_at: new Date(),
        deleted_at: null,
        is_blocked: false,
        verified: false,
      },
      // User are blocked
      {
        username: '84329579784',
        password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC',
        active: true,
        created_at: new Date(),
        deleted_at: null,
        is_blocked: true,
        verified: false,
      },
    ]);
  });
exports.usersSeeding = usersSeeding;
