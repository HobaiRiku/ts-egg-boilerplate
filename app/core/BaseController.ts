import {Controller} from 'egg';

export default class BaseController extends Controller {
  /**
   * query查询拼接
   */
  get condition() {
    const ignore = ['_id', 'userId'];
    const exclude = ['page', 'size'];
    const obj = this.ctx.request.query;
    const query: any = {};
    for (const o in obj) {
      if (obj[o] && obj[o] !== '' && !exclude.includes(o)) {
        const rex = new RegExp(obj[o]);
        query[o] = !ignore.includes(o) ? rex : obj[o];
      }
    }
    return query;
  }

  /**
   * 分页参数获取
   */
  get pager() {
    try {
      const page = parseInt(this.ctx.request.query.page, 10);
      const size = parseInt(this.ctx.request.query.size, 10);
      return {page, size};
    } catch (error) {
      return {page: 0, size: 0};
    }
  }

  /**
   * 获取body实体
   */
  get entity() {
    const obj = this.ctx.request.body;
    const body: any = {};
    for (const o in obj) {
      if (obj.hasOwnProperty(o)) {
        if (obj[o] !== '' && o !== '_id') {
          body[o] = obj[o];
        }
      }
    }
    return body;
  }

  /**
   * 快速成功完成
   * @param data
   * @param status
   */
  success(data: any, status: number) {
    this.ctx.body = data;
    this.ctx.status = status;
  }

  notFound(msg: any) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
