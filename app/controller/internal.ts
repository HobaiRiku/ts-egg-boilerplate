import { Controller } from 'egg';
import ResError from '../core/ResError';
export default class InternalController extends Controller {
  /**
   * 登录控制
   */
  async login() {
    const ctx = this.ctx;
    if (!ctx.request.body.account) {
      ctx.throw(new ResError('账号不能为空', 202));
    }
    if (!ctx.request.body.password) {
      ctx.throw(new ResError('密码不能为空', 202));
    }
    const account = ctx.request.body.account;
    const password = ctx.request.body.password;
    const data = await ctx.service.internal.login(account, password);
    ctx.status = 200;
    ctx.body = data;
  }
  /**
   * 登出控制
   */
  async logout() {
    const ctx = this.ctx;
    if (!ctx.user) {
      throw new ResError(ctx.jwt.message, 401);
    }
    ctx.status = 200;
    ctx.body = await this.ctx.service.internal.logout(ctx.user);
  }
  /**
   * 获取账户信息
   */
  async profile() {
    const ctx = this.ctx;
    if (!ctx.user) {
      throw new ResError(ctx.jwt.message, 401);
    }
    const user = await this.ctx.service.user.show(ctx.user._id);
    ctx.status = 200;
    ctx.body = user;
  }
}
