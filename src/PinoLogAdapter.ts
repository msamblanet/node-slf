import type { pino } from 'pino'; // Note: Optional Dependency but only importing types
import extend from 'extend';
import BaseLogAdapter from './BaseLogAdapter.js';
import { ILogAdapter, LogLevel } from './types.js';

export type PinoConfigs = Record<string, pino.ChildLoggerOptions>;
export interface PinoLogAdapterOptions {
  log: pino.Logger;
  configs?: PinoConfigs;
  enableSilly?: boolean;
}

export class PinoLogAdapter extends BaseLogAdapter {
  protected readonly log: pino.Logger;
  protected readonly enableSilly: boolean;
  protected readonly configs: PinoConfigs;

  public constructor({ log, configs = {}, enableSilly = false }: PinoLogAdapterOptions) {
    super();
    this.log = log;
    this.configs = configs;
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

  public getChildLogger(name: string, bindings: Record<string, unknown>): ILogAdapter {
    const prefix = `${this.log.bindings.name}:`.replace(/^:/, '');
    let childOptions: pino.ChildLoggerOptions = {};

    // Find all subsets of the new child name and merge all the options...
    const re = /[:$]/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(name)) !== null) {
      const subsetName = prefix + name.slice(0, Math.max(0, match.index));
      childOptions = extend(true, childOptions, this.configs[subsetName]);
    }

    // Build a new logger
    return new PinoLogAdapter({
      log: this.log.child({ name: prefix + name, ...bindings }, childOptions),
      configs: this.configs,
      enableSilly: this.enableSilly
    });
  }
}

export default PinoLogAdapter;
