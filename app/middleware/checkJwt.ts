import { Context } from 'egg';
import * as jwt from 'jsonwebtoken';
module.exports = () => {
  return async (ctx: Context, next: any) => {
    let token;
    try {
      token =
        ctx.request.headers.token ||
        ctx.request.body.token ||
        ctx.request.query.token;
      if (!token) {
        ctx.jwt = {
          type: 'error',
          name: 'jwt no found',
          message: ' no jwt found in request',
          token,
        };
        return await next();
      }
      const salt = ctx.app.config.jwt.salt ? ctx.app.config.jwt.salt : '';
      const decode = jwt.verify(token, salt);
      ctx.jwt = { type: 'verified', decode, token };
      await next();
    } catch (error) {
      if (
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError'
      ) {
        ctx.jwt = {
          type: 'error',
          name: error.name,
          message: error.message,
          token,
        };
        await next();
      } else { ctx.throw(error); }
    }
  };
};
