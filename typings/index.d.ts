import * as mongoose from 'mongoose';
import * as socket_io from 'socket.io';
import {IUserModel} from '../../../app/model/User';
declare module 'egg' {

  import {ZXY_API} from "../app/core/ZXY_API";
  import {IOperationModel} from "../app/model/Operation";

  interface Application {
    mongoose: any;
    model: {
      User: mongoose.Model<IUserModel>;
    }
    io: socket_io.Server
    messenger: any;
  }
  interface Context {
    model: {
      User: mongoose.Model<IUserModel>;
    }
    io: socket_io.Server
    isJwtOk:Boolean
  }
}
declare module 'jsonwebtoken' {
  import {DecodeOptions} from 'jsonwebtoken';
  function decode(token: string, options?: DecodeOptions): JwtPayload;
}