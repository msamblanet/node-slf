import AsConsoleAdapter from './AsConsoleAdapter.js';
import { IConsole, ILogAdapter, LogLevel } from './types.js';

export abstract class BaseLogAdapter implements ILogAdapter {
  public static readonly LOG_LEVEL_SILLY = 100;
  public static readonly LOG_LEVEL_TRACE = 200;
  public static readonly LOG_LEVEL_DEBUG = 300;
  public static readonly LOG_LEVEL_INFO = 400;
  public static readonly LOG_LEVEL_WARN = 500;
  public static readonly LOG_LEVEL_ERROR = 600;
  public static readonly LOG_LEVEL_FATAL = 700;

  static readonly LOG_LEVEL_VALUES: Record<LogLevel, number> = {
    all: 0,
    silly: 100,
    trace: 200,
    debug: 300,
    info: 400,
    warn: 500,
    error: 600,
    fatal: 700,
    silent: 9999,
    none: 9999 // Allow none in one direction
  };

  static readonly LOG_LEVEL_NAMES: Record<number, LogLevel> = {
    0: 'all',
    100: 'silly',
    200: 'trace',
    300: 'debug',
    400: 'info',
    500: 'warn',
    600: 'error',
    700: 'fatal',
    9999: 'silent'
  };

  protected readonly level: number;

  public constructor(level: number | LogLevel = BaseLogAdapter.LOG_LEVEL_VALUES.all) {
    this.level = this.logLevelToValue(level);
  }

  public isLevelEnabled(level: LogLevel | number): boolean {
    const levelNumber = this.logLevelToValue(level);
    return levelNumber >= this.level;
  }

  public logLevelToValue(level: number | LogLevel): number {
    return (typeof level === 'number') ? level : BaseLogAdapter.LOG_LEVEL_VALUES[level];
  }

  public valueToLogLevel(level: number | LogLevel): LogLevel {
    return (typeof level === 'string') ? level : BaseLogAdapter.LOG_LEVEL_NAMES[level];
  }

  public toConsole(): IConsole {
    return new AsConsoleAdapter(this);
  }

  abstract silly(...args: unknown[]): void;
  abstract trace(...args: unknown[]): void;
  abstract debug(...args: unknown[]): void;
  abstract info(...args: unknown[]): void;
  abstract warn(...args: unknown[]): void;
  abstract error(...args: unknown[]): void;
  abstract fatal(...args: unknown[]): void;
  abstract getChildLogger(name: string, context?: Record<string, unknown>): ILogAdapter;
}

export default BaseLogAdapter;
