import BaseService from '../core/BaseService';
export default class UserService extends BaseService {
  public constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.User;
  }
  /**
   * 创建一个用户
   * @param entity 用户实体对象
   */
  async create(entity: any) {
    const result: any = {
      data: {},
      error: false,
      success: true,
    };
    try {
      const ctx = this.ctx;
      // verify
      if (!entity.username || entity.username === '') {
        throw new Error('用户名不能为空');
      }
      if (!entity.password || entity.password === '') {
        throw new Error('密码不能为空');
      }
      if (!entity.email || entity.email === '') {
        throw new Error('邮箱不能为空');
      }
      // duplicate check
      const checkUsername = await ctx.model.User.findOne({
        username: entity.username,
      });
      if (checkUsername) {
        result.success = false;
        result.data.message = '用户名已被占用';
        return result;
      }
      const checkEmail = await ctx.model.User.findOne({email: entity.email});
      if (checkEmail) {
        result.success = false;
        result.data.message = '邮箱已被占用';
        return result;
      }
      // do create
      const userNew = new ctx.model.User(entity);
      userNew.setPassword();
      result.data = await userNew.save();
      ctx.app.emit('userAdded', result.data, ctx);
      return result;
    } catch (error) {
      result.data = error;
      result.error = true;
      result.success = false;
      return result;
    }
  }
  /**
   * 更新一个用户
   * @param _id 用户_id
   * @param entity 更新的字段的实体对象
   */
  async update(_id: string, entity: any) {
    const result: any = {
      data: {},
      error: false,
      success: true,
    };
    const ctx = this.ctx;
    try {
      // verify
      if (entity.username && entity.username === '') {
        throw new Error('用户名不能为空');
      }
      if (entity.password && entity.password === '') {
        throw new Error('密码不能为空');
      }
      if (entity.email && entity.email === '') {
        throw new Error('邮箱不能为空');
      }
      if (entity.phone && entity.phone === '') {
        throw new Error('邮箱不能为空');
      }
      // check exist
      const checkExist = await ctx.model.User.findById(_id);
      if (!checkExist) {
        result.success = false;
        result.data.message = '用户不存在';
        return result;
      }
      // do update
      result.data = await ctx.model.User.findByIdAndUpdate(_id, entity);
      ctx.app.emit('userUpdated', result.data, ctx);
      return result;
    } catch (error) {
      result.data = error;
      result.error = true;
      result.success = false;
      return result;
    }
  }
  /**
   * 删除一个用户
   * @param _id 用户的_id
   */
  async destroy(_id: string) {
    const result: any = {
      data: {},
      error: false,
      success: true,
    };
    const ctx = this.ctx;
    try {
      // check exist
      const checkExist = await ctx.model.User.findById(_id);
      if (!checkExist) {
        result.success = false;
        result.data.message = '用户不存在';
        return result;
      }
      // do delete
      result.data = await ctx.model.User.findByIdAndRemove(_id);
      ctx.app.emit('userRemoved', result.data, ctx);
      return result;
    } catch (error) {
      result.data = error;
      result.error = true;
      result.success = false;
      return result;
    }
  }
}
