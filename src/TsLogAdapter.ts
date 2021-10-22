import { format } from 'node:util';
import type tslog from 'tslog'; // Note: Optional Dependency but only importing types
import extend from 'extend';
import BaseLogAdapter from './BaseLogAdapter.js';
import { ILogAdapter } from './types.js';

export type TsLogConfigs = Record<string, tslog.ISettingsParam>;
export interface TsLogAdapterOptions {
  log: tslog.Logger;
  configs?: TsLogConfigs;
}

export class TsLogAdapter extends BaseLogAdapter {
  protected readonly log: tslog.Logger;
  protected readonly configs: TsLogConfigs;

  public constructor({ log, configs = {} }: TsLogAdapterOptions) {
    super(log.settings.minLevel);
    this.log = log;
    this.configs = configs;
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
    // You cannot suppress fatal in TsLog, so this IF is never executed
    /* istanbul ignore next */
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
    const prefix = `${this.log.settings.name ?? ''}:`.replace(/^:/, '');
    let childOptions: tslog.ISettingsParam = { name: prefix + name };

    // Find all subsets of the new child name and merge all the options...
    const re = /[:$]/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(name)) !== null) {
      const subsetName = prefix + name.slice(0, Math.max(0, match.index));
      childOptions = extend(true, childOptions, this.configs[subsetName]);
    }

    // Build a new logger
    return new TsLogAdapter({
      log: this.log.getChildLogger(childOptions),
      configs: this.configs
    });
  }
}

export default TsLogAdapter;
