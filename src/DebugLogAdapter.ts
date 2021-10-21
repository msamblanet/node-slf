import type debug from 'debug'; // Note: Optional Dependency but only importing types
import { BaseLogAdapter } from './BaseLogAdapter.js';
import { ILogAdapter, LogLevel } from './types.js';

export class DebugLogAdapter extends BaseLogAdapter {
  protected readonly name: string;
  protected readonly logName: string;
  protected readonly log: debug.Debugger;
  protected readonly debugInstance: debug.Debug;

  public constructor(name: string, debugInstance: debug.Debug, level: number | LogLevel = 'all') {
    super(level);
    this.debugInstance = debugInstance;
    this.name = name;
    this.log = this.debugInstance(name);
    this.logName = this.name ? `[${this.name}]` : '';
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
    return new DebugLogAdapter(`${this.name}:${name}`.replace(/^:/, ''), this.debugInstance, this.level);
  }

  protected emit(level: string, args: unknown[]): void {
    if (args.length > 1 && typeof args[0] !== 'string') {
      // Move the context to the end
      args.push(args.shift());
    }

    this.log(level, ...args);
  }
}

export default DebugLogAdapter;
