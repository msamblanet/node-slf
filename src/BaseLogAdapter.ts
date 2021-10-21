import AsConsoleAdapter from './AsConsoleAdapter.js';
import { IConsole, ILogAdapter, LogLevel } from './types.js';

export abstract class BaseLogAdapter implements ILogAdapter {
  static get LOG_LEVEL_SILLY() {
    return 100;
  }

  static get LOG_LEVEL_TRACE() {
    return 200;
  }

  static get LOG_LEVEL_DEBUG() {
    return 300;
  }

  static get LOG_LEVEL_INFO() {
    return 400;
  }

  static get LOG_LEVEL_WARN() {
    return 500;
  }

  static get LOG_LEVEL_ERROR() {
    return 600;
  }

  static get LOG_LEVEL_FATAL() {
    return 700;
  }

  static readonly LOG_LEVEL_VALUES: Record<LogLevel, number> = {
    all: 0,
    silly: 100,
    trace: 200,
    debug: 300,
    info: 400,
    warn: 500,
    error: 600,
    fatal: 700,
    none: 9999
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
    9999: 'none'
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
