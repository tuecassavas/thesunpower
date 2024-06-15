'use strict';
// import { doHttp } from '../../../helpers/httpClient';
// import { utf8ToBase64 } from '../../../helpers';
// import { BRAND_NAME, OTP_TEMPLATE } from '../../../const';
// import { LogError } from '../../error/logError';
// import { ErrorVars } from '../../error/errorVars';
// import path from 'node:path';
// import * as fs from 'fs';
// import { AxiosError } from 'axios';
//
// const getKey = (): string => {
//   const filePath = path.join(__dirname, 'key.txt');
//   const key = fs.readFileSync(filePath, 'utf8');
//   if (!key) {
//     return '';
//   }
//   return key.trim();
// };
//
// const setKey = (key: string): void => {
//   const filePath = path.join(__dirname, 'key.txt');
//   fs.writeFileSync(filePath, key);
// };
//
// export const lSendOTP = async (phoneNumber: string, otp: string) => {
//   try {
//     let accessToken = getKey();
//     const sessionId = `request-otp-${phoneNumber}`;
//
//     if (!accessToken) {
//       const requestAccess = (await doHttp({
//         serviceName: 'post_sign_in',
//         body: {
//           client_id: process.env.FPT_CLIENT_ID,
//           client_secret: process.env.FPT_SECRET_ID,
//           scope: 'send_brandname_otp send_brandname',
//           session_id: sessionId,
//           grant_type: 'client_credentials'
//         }
//       })) as any;
//
//       accessToken = requestAccess.access_token;
//       setKey(accessToken);
//     }
//
//     try {
//       await doHttp({
//         serviceName: 'post_sms_otp',
//         body: {
//           access_token: accessToken,
//           session_id: sessionId,
//           BrandName: BRAND_NAME,
//           Phone: phoneNumber,
//           Message: utf8ToBase64(OTP_TEMPLATE(otp)),
//           RequestId: sessionId
//         }
//       });
//     } catch (err) {
//       if ((err as AxiosError).response?.status === 401) {
//         const requestAccess = (await doHttp({
//           serviceName: 'post_sign_in',
//           body: {
//             client_id: process.env.FPT_CLIENT_ID,
//             client_secret: process.env.FPT_SECRET_ID,
//             scope: 'send_brandname_otp send_brandname',
//             session_id: sessionId,
//             grant_type: 'client_credentials'
//           }
//         })) as any;
//
//         accessToken = requestAccess.access_token;
//         setKey(accessToken);
//
//         await doHttp({
//           serviceName: 'post_sms_otp',
//           body: {
//             access_token: accessToken,
//             session_id: sessionId,
//             BrandName: BRAND_NAME,
//             Phone: phoneNumber,
//             Message: utf8ToBase64(OTP_TEMPLATE(otp)),
//             RequestId: sessionId
//           }
//         });
//       }
//     }
//   } catch (e) {
//     throw new LogError(ErrorVars.E019_FPT_SEND_OTP_ERROR, 'INTEGRATION', undefined, undefined, (e as Error)?.message);
//   }
// };
