'use strict';

import {DefaultConfig} from './config.default';

export default function (): DefaultConfig {
  return {
    local: {
      msg: 'prod',
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/test',
        options: {
          auth: { authSource: 'test' },
          user: 'test-user',
          pass: 'test-user',
        },
      },
    },
    logger: {consoleLevel: 'INFO'},
    middleware: ['errorHandler','notFoundHandler','checkJwt', 'userDeserialize'],
  };
};
