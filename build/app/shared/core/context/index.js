"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccess = exports.responseError = void 0;
const logError_1 = require("../error/logError");
const responseError = (e, req, res) => {
    let status;
    if (e instanceof logError_1.LogError) {
        switch (e.name) {
            case 'LOGIC':
                status = 422;
                res.status(422).json({
                    errors: {
                        fields: e.fields ? [e.fields] : [],
                    },
                    code: e.message,
                });
                break;
            case 'INTEGRATION':
                status = 500;
                res.sendStatus(500);
                break;
            case 'AUTHENTICATION':
                status = 401;
                res.sendStatus(401);
                break;
            case 'AUTHORISATION':
                status = 403;
                res.sendStatus(403);
                break;
        }
    }
    else {
        status = 500;
        res.sendStatus(500);
    }
    if (process.env.NODE_ENV === 'test') {
        return;
    }
    const body = req.body;
    if (body.password && process.env.NODE_ENV !== 'dev') {
        body.password = '[HIDDEN]';
    }
    if (body.access_token && process.env.NODE_ENV !== 'dev') {
        body.access_token = '[HIDDEN]';
    }
    if (status === 500) {
        res.locals.ctx.logger
            .child({
            error: e,
            stack: e.stack,
            status,
            body,
            query: req.query,
        })
            .error(`Controller error catch: ${e.message}`);
    }
    else {
        res.locals.ctx.logger
            .child({
            error: e,
            stack: e.stack,
            status,
            body,
            query: req.query,
        })
            .warn(`Controller error catch: ${e.message}`);
    }
};
exports.responseError = responseError;
const responseSuccess = (req, res, data = {}, isCreated = false) => {
    const requestUrl = req.url.toString();
    if (process.env.NODE_ENV !== 'test') {
        res.locals.ctx.logger
            .child({
            url: requestUrl,
            body: requestUrl.indexOf('/login') < 0 ? req.body : null,
            status: isCreated ? 201 : 200,
            level: 'info',
        })
            .info('SuccessExit');
    }
    isCreated ? res.sendStatus(201) : res.send(data);
};
exports.responseSuccess = responseSuccess;
