'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
const sharedServices = [
  // FPT services
  {
    base_url: (_a = process.env.FPT_API_URL) !== null && _a !== void 0 ? _a : '',
    name: 'sms_service',
    services: {
      post_sign_in: 'POST /oauth2/token',
      post_sms_otp: 'POST /api/push-brandname-otp',
    },
  },
];
exports.default = sharedServices;
