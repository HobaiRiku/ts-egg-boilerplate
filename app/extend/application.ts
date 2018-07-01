
const TEST_SCHEDULE_RUN_COUNT = Symbol('Application#test_schedule_run_count');
export default {
  get test_schedule_run_count():number {
    if (!this[TEST_SCHEDULE_RUN_COUNT]) {
      this[TEST_SCHEDULE_RUN_COUNT] = 0;
    }
    return this[TEST_SCHEDULE_RUN_COUNT];
  },
  set test_schedule_run_count(value: number) {
    this[TEST_SCHEDULE_RUN_COUNT] = value;
  },

};


