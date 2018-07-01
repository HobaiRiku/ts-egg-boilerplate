import { Context, Service } from 'egg';
import * as jwt from 'jsonwebtoken';
import JwtPayload from '../core/JwtPayload';
import ResError from '../core/ResError';
import { IUserModel } from '../model/User';
export default class InternalService extends Service {
  constructor(ctx: Context) {
    super(ctx);
  }
  /**
   * 登录服务
   * @param account  账户（可以是账户名、手机、邮箱）
   * @param password 密码
   */
  async login(account: string, password: string) {
    const ctx = this.ctx;
    try {
      let condition: any = { username: account };
      if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(account)) {
        condition = { phone: account };
      }
      if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(account)) {
        condition = { email: account };
      }
      const userFind = await ctx.model.User.findOne(condition);
      if (!userFind || !userFind.jwtList) {
        throw new ResError("user does not exit or error in token's list ", 202);
      }
      if (!userFind.verifyPassword(password)) {
        ctx.throw(new ResError('invalid account or password', 202));
      }
      const user: JwtPayload = {
        _id: userFind._id,
        username: userFind.username,
        type: 'user',
      };
      const expires = ctx.app.config.jwt.expires ? ctx.app.config.jwt.expires : 3600;
      const salt = ctx.app.config.jwt.salt ? ctx.app.config.jwt.salt : '';
      const token = jwt.sign(user, salt, {
        expiresIn: expires,
      });
      const decode: JwtPayload = jwt.decode(token);
      if (!decode.iat) {throw new Error('error in decoding token: iat not found'); }
      userFind.jwtList = userFind.jwtList.concat([decode.iat]);
      await userFind.save();
      return { message: 'login successful', token };
    } catch (error) {
      ctx.throw(error);
    }
  }
  /**
   * User
   * @param user 需要登出的user mongoose model文档
   */
  async logout(user: IUserModel) {
    const ctx = this.ctx;
    try {
      const userNow = user;
      if (!userNow || !userNow.jwtList) { throw new Error('user or jwtList not found'); }
      const index = userNow.jwtList.indexOf(ctx.jwt.decode.iat);
      userNow.jwtList.splice(index, 1);
      await userNow.save();
      return { message: 'logout successful' };
    } catch (error) {
      ctx.throw(error);
    }
  }
}
