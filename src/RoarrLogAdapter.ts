import type roarr from 'roarr'; // Note: Optional Dependency but only importing types
import BaseLogAdapter from './BaseLogAdapter.js';
import { ILogAdapter, LogLevel } from './types.js';

export class RoarrLogAdapter extends BaseLogAdapter {
  protected readonly log: roarr.Logger;

  public constructor(log: roarr.Logger, level: number | LogLevel = 'all') {
    super(level);

    this.log = log;
  }

  public silly(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_SILLY) {
      return;
    }

    (this.log.trace as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public trace(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_TRACE) {
      return;
    }

    (this.log.trace as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public debug(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_DEBUG) {
      return;
    }

    (this.log.debug as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public info(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_INFO) {
      return;
    }

    (this.log.info as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public warn(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_WARN) {
      return;
    }

    (this.log.warn as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public error(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_ERROR) {
      return;
    }

    (this.log.error as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public fatal(...args: unknown[]): void {
    if (this.level > BaseLogAdapter.LOG_LEVEL_FATAL) {
      return;
    }

    (this.log.fatal as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public getChildLogger(name: string, context: Record<string, unknown>): ILogAdapter {
    return new RoarrLogAdapter(this.log.child({ namespace: `${this.log.getContext().namespace as string}:${name}`.replace(/^:/, ''), ...context }));
  }
}

export default RoarrLogAdapter;
