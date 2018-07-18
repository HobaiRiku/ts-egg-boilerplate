import BaseController from '../core/BaseController';
import ResError from '../core/ResError';
class UserController extends BaseController {
  async index() {
    const ctx = this.ctx;
    // auth
    if (!ctx.user) { throw new ResError(ctx.jwt.message, 401); }
    if (!ctx.user.isGlobalAdmin) { throw new ResError('权限不足', 401); }
    // fetch data
    const option = {
      condition: this.condition,
      select: { password: 0, __v: 0, jwtList: 0 },
    };
    const data = await ctx.service.user.index(
      this.pager.page,
      this.pager.page,
      option,
    );
    this.success(data, 200);
  }
  async show() {
    const ctx = this.ctx;
    // auth
    if (!ctx.user) { throw new ResError(ctx.jwt.message, 401); }
    if (!ctx.user.isGlobalAdmin) { throw new ResError('权限不足', 401); }
    // verify
    const _id: string = ctx.params.userId.toString();
    if (_id.length !== 24) { throw new ResError('错误的_id参数', 400); }
    // fetch data
    const option = { select: { password: 0, __v: 0, jwtList: 0 } };
    const data = await ctx.service.user.show(_id, option);
    if (data) { this.success(data, 200); } else { throw new ResError('用户不存在', 404); }
  }
  async create() {
    const ctx = this.ctx;
    // auth
    if (!ctx.user) { throw new ResError(ctx.jwt.message, 401); }
    if (!ctx.user.isGlobalAdmin) { throw new ResError('权限不足', 401); }
    // create
    const result = await ctx.service.user.create(this.entity);
    if (result.success) {
      ctx.body = {
        message: '用户"' + result.data.username + '"创建成功',
        _id: result.data._id,
      };
      ctx.status = 201;
    }
    if (result.error) {
      throw new ResError('用户创建失败:' + result.data.message, 400);
    }
    if (!result.success) {
      ctx.body = { message: '用户创建失败:' + result.data.message };
      ctx.status = 200;
    }
  }
  async update() {
    const ctx = this.ctx;
    const _id: string = ctx.params.userId.toString();
    if (_id.length !== 24) { throw new ResError('错误的_id参数', 400); }
    const entity = this.entity;
    // auth
    if (!ctx.user) { throw new ResError(ctx.jwt.message, 401); }
    if (!ctx.user.isGlobalAdmin && ctx.user._id !== _id) {
      throw new ResError('权限不足', 400);
    }
    if (!ctx.user.isGlobalAdmin && entity.isGlobalAdmin) {
      delete entity.isGlobalAdmin;
    }
    // do update
    const result = await ctx.service.user.update(_id, entity);
    if (result.success) {
      ctx.body = { message: '用户更新成功', _id: result.data._id };
      ctx.status = 201;
    }
    if (result.error) {
      throw new ResError('用户更新失败:' + result.data.message, 400);
    }
    if (!result.success) {
      ctx.body = { message: '用户更新失败:' + result.data.message };
      ctx.status = 200;
    }
  }
  async destroy() {
    const ctx = this.ctx;
    const _id: string = ctx.params.userId.toString();
    if (_id.length !== 24) { throw new ResError('错误的_id参数', 400); }
    // auth
    if (!ctx.user) { throw new ResError(ctx.jwt.message, 401); }
    if (!ctx.user.isGlobalAdmin) { throw new ResError('权限不足', 401); }
    if (ctx.user._id === _id) { throw new ResError('不能删除当前登录的账户', 400); }
    // do delete
    const result = await ctx.service.user.destroy(_id);
    if (result.success) {
      ctx.body = { message: '用户删除成功' };
      ctx.status = 201;
    }
    if (result.error) {
      throw new ResError('用户删除失败:' + result.data.message, 400);
    }
    if (!result.success) {
      ctx.body = { message: '用户删除失败:' + result.data.message };
      ctx.status = 200;
    }
  }
}
export default UserController;
