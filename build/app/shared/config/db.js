"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = require('mongodb').MongoClient.connect(process.env.CONNECTION, {
    maxPoolSize: 20,
    useUnifiedTopology: true
});
