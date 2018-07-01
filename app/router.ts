import {Application} from 'egg';
import * as fs from 'fs';
import * as path from 'path'

export default (app: Application) => {
  const {router, controller} = app;
  // internal
  router.post('/api/internal/login', controller.internal.login);
  router.post('/api/internal/logout', controller.internal.logout);
  router.get('/api/internal/profile', controller.internal.profile);
  // user
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:userId', controller.user.show);
  router.post('/api/users', controller.user.create);
  router.put('/api/users/:userId', controller.user.update);
  router.delete('/api/users/:userId', controller.user.destroy);
  //SPA入口
  router.get('*', (ctx: any) => {
    const html = fs.readFileSync(
      path.resolve(__dirname, '../frontend/dist/index.html'),
      'utf-8',
    );
    ctx.status = 200;
    ctx.body = html;
  });

};

