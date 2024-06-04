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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Instance = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const credential_providers_1 = require("@aws-sdk/credential-providers");
class S3Instance {
    constructor() {
        const credentials = (0, credential_providers_1.fromIni)({ profile: 'default' });
        this.instance = new client_s3_1.S3Client({
            credentials
        });
    }
    putImage(username, filename, image) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const params = {
                Bucket: (_a = process.env.AVATAR_S3_BUTKET) !== null && _a !== void 0 ? _a : '',
                Key: `${username}/${filename}`,
                Body: image
            };
            const command = new client_s3_1.PutObjectCommand(params);
            this.instance
                .send(command)
                .then((response) => {
                if (response['$metadata'].httpStatusCode === 200) {
                    const avatarUrl = `https://${process.env.AVATAR_S3_BUTKET}.s3.${process.env['AWS_REGION']}.amazonaws.com/${username}/${filename}`;
                    resolve(avatarUrl);
                }
                else {
                    reject(response);
                }
            })
                .catch((e) => {
                reject(e);
            });
        }));
    }
}
exports.S3Instance = S3Instance;
