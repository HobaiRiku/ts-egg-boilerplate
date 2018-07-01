import { Context } from 'egg';
module.exports = () => {
  return async function notFoundHandler(ctx: Context, next: any) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = ctx.acceptJSON
        ? { message: 'Not Found' }
        : '<h1>Page Not Found</h1>';
    }
  };
};
