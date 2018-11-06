import {Service} from 'egg';
import * as mongoose from 'mongoose'; // tslint:disable-line
export default class BaseService extends Service {
  /**
   * service对应的mongoose模型
   */
  public model: mongoose.Model<any>;
  /**
   * 用于统一service返回的约定函数
   * @param data 返回体的数据
   * @param error 是否为错误
   * @param success 结果是否成功
   */
  static finish(data: any, success?: boolean, error?: boolean) {
    const result = {
      message: '',
      data,
      error: false,
      success: true,
    };
    // 直接传入error视为出错，服务失败，且为错误
    if (Object.prototype.toString.call(data) === '[object Error]') {
      result.error = true;
      result.success = false;
      return result;
    }
    // 传入信息视为业务流程断言，将消息存入message
    if (typeof data === 'string') {result.data = {message: data}; }
    // 自定义是否error
    if (typeof error !== 'undefined') {
      result.error = error;
      return result;
    }
    // 自定义是否success
    if (typeof success !== 'undefined') {result.success = success; }
    return result;
  }

  /**
   * 列表查询公共函数
   * @param {number} page 页数
   * @param {number} size 每页大小
   * @param option 查询选项
   * @param populate 字段填充
   * @returns {Promise<{data: any[]; meta: {count: number}}>}
   */
  public async index(page: number, size: number, option?: any, populate?: any) {
    let condition = {};
    let sort = '-createdAt';
    if (option && option.sort) {
      sort = option.sort;
    }
    if (option) {
      condition = option.condition;
    }
    let query = this.model.find(condition);
    query =
      option && option.select
        ? query.select(option.select)
        : query.select({__v: 0});
    if (page && size) {
      query = query.skip((page - 1) * size).limit(size);
    }
    query = query.sort(sort);
    // populate
    if (populate) {
      let populate_list: any[];
      populate_list = !populate.length ? [populate] : populate;
      populate_list.forEach(i => {
        query = query.populate(i);
      });
    }
    const list = await query.exec();
    const count = await this.model.find(condition).count();
    return {
      data: list,
      meta: {
        count,
      },
    };
  }

  /**
   * 单对象查询公共函数
   * @param condition
   * @param option
   * @param populate
   * @returns {Promise<any>}
   */
  public async show(condition: any, option?: any, populate?: any) {
    if (typeof condition !== 'object') {
      throw new Error('condition in server.show() should be an object');
    }
    let query = this.model.findOne(condition);
    query =
      option && option.select
        ? query.select(option.select)
        : query.select({__v: 0});
    // populate
    if (populate) {
      let populate_list: any[];
      populate_list = !populate.length ? [populate] : populate;
      populate_list.forEach(i => {
        query = query.populate(i);
      });
    }
    return query.exec();
  }
}
