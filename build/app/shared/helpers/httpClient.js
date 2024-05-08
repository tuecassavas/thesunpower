"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doHttp = void 0;
const isUndefined_1 = __importDefault(require("lodash/isUndefined"));
const get_1 = __importDefault(require("lodash/get"));
const axios_1 = __importDefault(require("axios"));
const services_1 = __importDefault(require("../config/services"));
const node_querystring_1 = __importDefault(require("node:querystring"));
let services = [];
const injectServices = (s) => {
    services = [...services, ...s];
};
injectServices(services_1.default);
const getServiceInfo = (args) => {
    for (const service of services) {
        if (service.services.hasOwnProperty(args.serviceName)) {
            const [method, uri] = service.services[args.serviceName].split(' ');
            let url = `${service.base_url}${uri}`;
            if (!(0, isUndefined_1.default)(args.query)) {
                url = `${url}?${node_querystring_1.default.stringify(args.query)}`;
            }
            if (!(0, isUndefined_1.default)(args.params)) {
                Object.keys(args.params).map((key) => {
                    url = url.replace(`:${key}`, (0, get_1.default)(args.params, key));
                });
            }
            return {
                method: method.toUpperCase(),
                url
            };
        }
    }
    throw new Error('Service not found ' + args.serviceName);
};
const doHttp = (args) => {
    const serviceInfo = getServiceInfo(args);
    return new Promise((resolve, reject) => {
        axios_1.default
            .request({
            method: serviceInfo.method,
            url: serviceInfo.url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: args.body
        })
            .then((response) => {
            resolve(response.data);
        })
            .catch((err) => {
            if (err.name === 'AbortError') {
                return;
            }
            reject(err);
        });
    });
};
exports.doHttp = doHttp;
