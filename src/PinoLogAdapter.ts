import type { pino } from 'pino'; // Note: Optional Dependency but only importing types
import BaseLogAdapter from './BaseLogAdapter.js';
import { ILogAdapter, LogLevel } from './types.js';

export class PinoLogAdapter extends BaseLogAdapter {
  protected readonly log: pino.Logger;
  protected readonly enableSilly: boolean;

  public constructor(log: pino.Logger, enableSilly = false) {
    super();
    this.log = log;
    this.enableSilly = enableSilly;
  }

  public silly(...args: unknown[]): void {
    if (!this.enableSilly) {
      return;
    }

    (this.log.trace as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public trace(...args: unknown[]): void {
    (this.log.trace as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public debug(...args: unknown[]): void {
    (this.log.debug as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public info(...args: unknown[]): void {
    (this.log.info as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public warn(...args: unknown[]): void {
    (this.log.warn as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public error(...args: unknown[]): void {
    (this.log.error as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public fatal(...args: unknown[]): void {
    (this.log.fatal as Function).apply(this.log, args); // eslint-disable-line @typescript-eslint/ban-types
  }

  public isLevelEnabled(level: LogLevel | number): boolean {
    return this.log.isLevelEnabled(this.valueToLogLevel(level));
  }

  public getChildLogger(name: string, context: Record<string, unknown>): ILogAdapter {
    return new PinoLogAdapter(this.log.child({ name: `${this.log.bindings.name}:${name}`.replace(/^:/, ''), ...context }), this.enableSilly);
  }
}

export default PinoLogAdapter;
