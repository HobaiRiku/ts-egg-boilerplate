'use strict';

import {EggAppConfig, PowerPartial} from 'egg';
import * as path from 'path';

export default function (appInfo: EggAppConfig) {
    const config = {} as PowerPartial<EggAppConfig>;

    config.middleware = [
        'access',
        'errorHandler',
        'notFoundHandler',
        'checkJwt',
        'userDeserialize',
    ];

    config.logger = {
        consoleLevel: 'DEBUG',
    };

    config.uuid = {
        name: 'ebuuid',
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    };
    config.static = {
        prefix: '',
        dir: path.join(appInfo.baseDir, 'frontend'),
        dynamic: true,
        preload: false,
        buffer: true,
        maxFiles: 1000,
        maxAge: 60,
    };
    config.security = {
        csrf: {enable: false},
        methodnoallow: {enable: false},
    };
    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1/test',
            options: {
                auth: {authSource: 'test'},
                user: 'test-user',
                pass: 'test-user',
            },
        },
    };
    config.io = {
        init: {},
        namespace: {
            '/': {
                connectionMiddleware: [] as any,
                packetMiddleware: [] as any,
            },
        },
    };
    config.cors = {
        origin: () => '*',
    };
    const bizConfig = {
        uuid: {
            name: 'ebuuid',
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        },
        keys: appInfo.name + '123123',
        testScheduleInterval: '60s',
        middleware: ['uuid'],
        jwt: {
            expires: 3600,
            salt: '1234',
        },
        local: {
            msg: 'local',
        },
    };
    return {
        ...config,
        ...bizConfig,
    };
}
