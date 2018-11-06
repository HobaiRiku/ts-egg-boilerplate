import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install();
import {Application} from 'egg';

export default (app: Application) => {
  app.beforeStart(async () => {
    // init admin
    const result = await app.model.User.find({});
    if (result.length < 1) {
      const firstAdmin = new app.model.User({
        isGlobalAdmin: true,
        username: 'admin',
        password: 'admin',
      });
      firstAdmin.setPassword();
      await firstAdmin.save();
      app.logger.info('project first setup, init admin account ok!');
    }
  });
  // 启动
  app.on('server', async () => {
    // do somethings such as mount a webSocket server
    // socketio广播必须先广播至各app中，再通过监听进行广播
    app.messenger.broadcast('server-start', {message: 'http server start!'});
  });
  // socketio 转发事件
  app.messenger.on('server-start', async data => {
    app.io.emit('server-start', data);
  });
};
