import { BaseLogAdapter } from './BaseLogAdapter.js';
import { ILogAdapter, LogLevel } from './types.js';

export class ConsoleLogAdapter extends BaseLogAdapter {
  protected readonly name: string;
  protected readonly logName: string;
  protected readonly console: Console;

  public constructor(name = '', level: number | LogLevel = 'all', console: Console = global.console) {
    super(level);
    this.name = name;
    this.logName = this.name ? `[${this.name}]` : '';
    this.console = console;
  }

  public silly(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_SILLY) {
      return;
    }

    this.emit('SILLY:', args);
  }

  public trace(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_TRACE) {
      return;
    }

    this.emit('TRACE:', args);
  }

  public debug(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_DEBUG) {
      return;
    }

    this.emit('DEBUG:', args);
  }

  public info(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_INFO) {
      return;
    }

    this.emit(' INFO:', args);
  }

  public warn(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_WARN) {
      return;
    }

    this.emit(' WARN:', args);
  }

  public error(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_ERROR) {
      return;
    }

    this.emit('ERROR:', args);
  }

  public fatal(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_FATAL) {
      return;
    }

    this.emit('FATAL:', args);
  }

  public getChildLogger(name: string, _context: Record<string, unknown>): ILogAdapter {
    return new ConsoleLogAdapter(`${this.name}:${name}`.replace(/^:/, ''), this.level, this.console);
  }

  protected emit(level: string, args: unknown[]): void {
    if (args.length > 1 && typeof args[0] !== 'string') {
      // Move the context to the end
      args.push(args.shift());
    }

    this.console.log(this.logName, level, ...args);
  }
}

export default ConsoleLogAdapter;
