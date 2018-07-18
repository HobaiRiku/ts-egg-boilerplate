import {Application} from 'egg';
import * as md5 from 'md5';
import {Document, Model, model, Schema} from 'mongoose';

// 定义用户接口
export interface IUser {
  createdAt: Date;
  email?: string;
  username: string;
  password: string;
  phone?: string;
  isGlobalAdmin: boolean;
  jwtList?: number[];
}

// 定义mongoose.Model接口
export interface IUserModel extends IUser, Document {
  /**
   * 验证用户密码
   * @param password 输入的密码
   */
  verifyPassword(password: string): boolean;

  /**
   * 加密用户密码
   */
  setPassword(): void;
}

// 定义Schema实例
export const userSchema: Schema = new Schema({
  createdAt: {type: Date, default: Date.now},
  phone: {type: String, default: ''},
  isGlobalAdmin: {type: Boolean, default: false},
  email: {type: String,default: ''},
  username: {type: String, required: true},
  password: {type: String, required: true},
  jwtList: [{type: Number}],
});

// egg-mongoose注入
export default (app: Application): Model<IUserModel> => {
  const passwordSalt = app.config.keys;
  userSchema.methods.verifyPassword = function (password: string): boolean {
    return md5(passwordSalt + password) === this.password;
  };
  userSchema.methods.setPassword = function () {
    this.password = md5(passwordSalt + this.password);
  };
  return model<IUserModel>('User', userSchema);
};
