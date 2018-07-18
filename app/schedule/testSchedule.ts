import {Application} from 'egg';

export default (app: Application) => {
  return {
    schedule: {
      interval: app.config.testScheduleInterval,
      type: 'worker',
    },
    async task() {
      // do sometings
      app.test_schedule_run_count += 1;
      app.logger.info('testSchedule run ' + app.test_schedule_run_count + ' time');
    },
  };
};
