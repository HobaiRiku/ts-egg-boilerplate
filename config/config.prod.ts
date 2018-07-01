'use strict';

import {DefaultConfig} from './config.default';

export default function (): DefaultConfig {
  return {
    local: {
      msg: 'prod',
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/db',
        options: {
          auth: { authSource: 'db' },
          user: 'bd-user',
          pass: 'bd-user',
        },
      },
    },
    logger: {consoleLevel: 'INFO'},
    middleware: ['errorHandler','notFoundHandler','checkJwt', 'userDeserialize'],
  };
};
