import { format } from 'node:util';
import type tslog from 'tslog'; // Note: Optional Dependency but only importing types
import BaseLogAdapter from './BaseLogAdapter.js';
import { ILogAdapter } from './types.js';

export class TsLogAdapter extends BaseLogAdapter {
  protected readonly log: tslog.Logger;

  public constructor(log: tslog.Logger) {
    super(log.settings.minLevel);
    this.log = log;
  }

  public silly(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_SILLY) {
      return;
    }

    const context = (typeof args[0] === 'string') ? undefined : args.shift();
    const message = format(...args);
    if (context) {
      this.log.silly(message, context);
    } else {
      this.log.silly(message);
    }
  }

  public trace(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_TRACE) {
      return;
    }

    const context = (typeof args[0] === 'string') ? undefined : args.shift();
    const message = format(...args);
    if (context) {
      this.log.trace(message, context);
    } else {
      this.log.trace(message);
    }
  }

  public debug(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_DEBUG) {
      return;
    }

    const context = (typeof args[0] === 'string') ? undefined : args.shift();
    const message = format(...args);
    if (context) {
      this.log.debug(message, context);
    } else {
      this.log.debug(message);
    }
  }

  public info(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_INFO) {
      return;
    }

    const context = (typeof args[0] === 'string') ? undefined : args.shift();
    const message = format(...args);
    if (context) {
      this.log.info(message, context);
    } else {
      this.log.info(message);
    }
  }

  public warn(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_WARN) {
      return;
    }

    const context = (typeof args[0] === 'string') ? undefined : args.shift();
    const message = format(...args);
    if (context) {
      this.log.warn(message, context);
    } else {
      this.log.warn(message);
    }
  }

  public error(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_ERROR) {
      return;
    }

    const context = (typeof args[0] === 'string') ? undefined : args.shift();
    const message = format(...args);
    if (context) {
      this.log.error(message, context);
    } else {
      this.log.error(message);
    }
  }

  public fatal(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_FATAL) {
      return;
    }

    const context = (typeof args[0] === 'string') ? undefined : args.shift();
    const message = format(...args);
    if (context) {
      this.log.fatal(message, context);
    } else {
      this.log.fatal(message);
    }
  }

  public getChildLogger(name: string, _context: Record<string, unknown>): ILogAdapter {
    return new TsLogAdapter(this.log.getChildLogger({ name: `${this.log.settings.name ?? ''}:${name}`.replace(/^:/, '') }));
  }
}

export default TsLogAdapter;
