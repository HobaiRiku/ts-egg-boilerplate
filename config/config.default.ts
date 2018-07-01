import {EggAppConfig, PowerPartial} from 'egg';
import * as path from "path";

// business config
export interface BizConfig {
  local: {
    msg: string;
  };
  uuid: {
    name: string;
    maxAge: number;
  };
  jwt: {
    expires: number;
    salt: string;
  }

}

// default config
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

export default function (appInfo: EggAppConfig) {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  config.keys = appInfo.name + '123123';
  config.testScheduleInterval = '60s';
  config.middleware = ['uuid'];
  config.jwt = {
    expires: 3600,
    salt: '1234'
  };
  config.local = {
    msg: 'local',
  };

  config.middleware = ['access', 'errorHandler','notFoundHandler','checkJwt', 'userDeserialize'];

  config.logger = {consoleLevel: 'DEBUG'};

  config.uuid = {
    name: 'ebuuid',
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  };
  config.static = {
    prefix: '',
    dir: path.join(appInfo.baseDir, 'frontend/dist'),
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
      '/': {connectionMiddleware: [] as any, packetMiddleware: [] as any},
    },
  };
  config.cors = {
    origin: () => '*',
  };

  return config;
}
