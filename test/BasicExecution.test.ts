//
// These are not true unit tests as they do not verify behavior
// BUT they do touch all of the code, so they help protect
// against parameter/syntax errors.
//
//
import debug from 'debug';
import { pino } from 'pino';
import { Roarr } from 'roarr';
import * as tslog from 'tslog';
import * as Test from '../src/index.js';

const noop = (): void => {}; // eslint-disable-line @typescript-eslint/no-empty-function
const noopDestinationStream: pino.DestinationStream = {
  write: noop
};
const noopConsole: Test.IConsole = {
  assert: noop,
  clear: noop,
  count: noop,
  countReset: noop,
  debug: noop,
  dir: noop,
  dirxml: noop,
  error: noop,
  group: noop,
  groupCollapsed: noop,
  groupEnd: noop,
  info: noop,
  log: noop,
  table: noop,
  time: noop,
  timeEnd: noop,
  timeLog: noop,
  timeStamp: noop,
  trace: noop,
  warn: noop,
  profile: noop,
  profileEnd: noop
};

function exerciseLogger(t: Test.ILogAdapter) {
  t.silly('Foo');
  t.silly('Foo %s', 'bar');
  t.silly({ bar: 1 }, 'Foo');
  t.silly({ bar: 1 }, 'Foo %s', 'bar');

  t.trace('Foo');
  t.trace('Foo %s', 'bar');
  t.trace({ bar: 1 }, 'Foo');
  t.trace({ bar: 1 }, 'Foo %s', 'bar');

  t.debug('Foo');
  t.debug('Foo %s', 'bar');
  t.debug({ bar: 1 }, 'Foo');
  t.debug({ bar: 1 }, 'Foo %s', 'bar');

  t.info('Foo');
  t.info('Foo %s', 'bar');
  t.info({ bar: 1 }, 'Foo');
  t.info({ bar: 1 }, 'Foo %s', 'bar');

  t.warn('Foo');
  t.warn('Foo %s', 'bar');
  t.warn({ bar: 1 }, 'Foo');
  t.warn({ bar: 1 }, 'Foo %s', 'bar');

  t.error('Foo');
  t.error('Foo %s', 'bar');
  t.error({ bar: 1 }, 'Foo');
  t.error({ bar: 1 }, 'Foo %s', 'bar');

  t.fatal('Foo');
  t.fatal('Foo %s', 'bar');
  t.fatal({ bar: 1 }, 'Foo');
  t.fatal({ bar: 1 }, 'Foo %s', 'bar');

  expect(t.getChildLogger('', {})).toBeDefined();
  expect(t.getChildLogger('A', { foo: 42 })).toBeDefined();
  expect(t.getChildLogger('A:B', { foo: 42 })).toBeDefined();

  expect(t.logLevelToValue('silly')).toEqual(Test.BaseLogAdapter.LOG_LEVEL_SILLY);
  expect(t.logLevelToValue(Test.BaseLogAdapter.LOG_LEVEL_TRACE)).toEqual(Test.BaseLogAdapter.LOG_LEVEL_TRACE);

  expect(t.valueToLogLevel('debug')).toEqual('debug');
  expect(t.valueToLogLevel(Test.BaseLogAdapter.LOG_LEVEL_INFO)).toEqual('info');

  expect(t.isLevelEnabled('silly')).toEqual(t.isLevelEnabled(Test.BaseLogAdapter.LOG_LEVEL_SILLY));
}

describe('ConsoleLogAdapter', () => {
  test('Verify functions execute', () => {
    // Exercise defaults
    expect(new Test.ConsoleLogAdapter()).toBeDefined();

    // Exercise logging methods
    exerciseLogger(new Test.ConsoleLogAdapter('', 'all', noopConsole));
    exerciseLogger(new Test.ConsoleLogAdapter('UnitTest', 'all', noopConsole));
    exerciseLogger(new Test.ConsoleLogAdapter('UnitTest', 'silent', noopConsole));
  });
});

describe('DebugAdapter', () => {
  test('Verify functions execute', () => {
    // Exercise defaults
    expect(new Test.DebugLogAdapter('', debug)).toBeDefined();

    // Exercise logging methods
    exerciseLogger(new Test.DebugLogAdapter('', debug, 'all'));
    exerciseLogger(new Test.DebugLogAdapter('UnitTest', debug, 'all'));
    exerciseLogger(new Test.DebugLogAdapter('UnitTest', debug, 'silent'));
  });
});

describe('PinoAdapter', () => {
  test('Verify functions execute', () => {
    // Exercise defaults
    expect(new Test.PinoLogAdapter({ log: pino(noopDestinationStream) })).toBeDefined();

    // Exercise logging methods
    exerciseLogger(new Test.PinoLogAdapter({ log: pino({}, noopDestinationStream), enableSilly: true }));
    exerciseLogger(new Test.PinoLogAdapter({ log: pino({ name: 'UnitTest' }, noopDestinationStream), enableSilly: true }));
    exerciseLogger(new Test.PinoLogAdapter({ log: pino({ name: 'UnitTest' }, noopDestinationStream), enableSilly: false }));
  });
});

describe('RoarrAdapter', () => {
  test('Verify functions execute', () => {
    // Exercise defaults
    expect(new Test.RoarrLogAdapter(Roarr)).toBeDefined();

    // Exercise logging methods
    exerciseLogger(new Test.RoarrLogAdapter(Roarr, 'all'));
    exerciseLogger(new Test.RoarrLogAdapter(Roarr.child({ namespace: 'UnitTest' }), 'all'));
    exerciseLogger(new Test.RoarrLogAdapter(Roarr.child({ namespace: 'UnitTest' }), 'none'));
  });
});

describe('TsLogAdapter', () => {
  test('Verify functions execute', () => {
    // Exercise defaults
    expect(new Test.TsLogAdapter({ log: new tslog.Logger() })).toBeDefined();

    // Exercise logging methods
    exerciseLogger(new Test.TsLogAdapter({ log: new tslog.Logger({ suppressStdOutput: true }) }));
    exerciseLogger(new Test.TsLogAdapter({ log: new tslog.Logger({ name: 'UnitTest', suppressStdOutput: true }) }));
    exerciseLogger(new Test.TsLogAdapter({ log: new tslog.Logger({ name: 'UnitTest', minLevel: 'fatal', suppressStdOutput: true }) }));
  });
});

describe('AsConsoleAdapter', () => {
  test('Verify functions execute', () => {
    const log = new Test.ConsoleLogAdapter('', 'all', noopConsole);
    const console = log.toConsole();

    console.assert(false);
    console.assert(true);
    console.assert(true, 'UnitTest');
    console.clear();
    console.count();
    console.count('UnitTest');
    console.countReset();
    console.countReset('UnitTest');
    console.debug('Foo');
    console.dir('Foo');
    console.dirxml('Foo');
    console.error('Foo');
    console.group();
    console.groupCollapsed();
    console.groupEnd();
    console.info('Foo');
    console.log('Foo');
    console.table({});
    console.time();
    console.time('UnitTest');
    console.timeLog();
    console.timeLog('UnitTest');
    console.timeLog('UnitTest-Unknown');
    console.timeEnd();
    console.timeEnd('UnitTest');
    console.timeEnd('UnitTest-Unknown');
    console.trace('Foo');
    console.warn('Foo');
    console.profile();
    console.profileEnd();
    console.timeStamp();
  });
});
