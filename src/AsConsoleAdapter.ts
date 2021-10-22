import { InspectOptions } from 'node:util';
import { IConsole, ILogAdapter } from './types.js';

export class AsConsoleAdapter implements IConsole {
  protected readonly logger: ILogAdapter;
  protected readonly counts: Map<string, number> = new Map();
  protected readonly timers: Map<string, number> = new Map();

  constructor(logger: ILogAdapter) {
    this.logger = logger;
  }

  assert(value: any, message?: string, ...optionalParameters: any[]): void {
    if (value) {
      if (message) {
        this.logger.error('Assertion failed: ' + message, ...optionalParameters);
      } else {
        this.logger.error('Assertion failed');
      }
    }
  }

  clear(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  count(label = 'default'): void {
    let value = this.counts.get(label) ?? 0;
    value++;
    this.counts.set(label, value);
    this.log('%s: %d', label, value);
  }

  countReset(label = 'default'): void {
    this.counts.delete(label);
  }

  debug(message?: any, ...optionalParameters: any[]): void {
    this.logger.debug(message, ...optionalParameters);
  }

  dir(object: any, _options?: InspectOptions): void {
    this.logger.info(object);
  }

  dirxml(...data: any[]): void {
    this.logger.info({ data });
  }

  error(message?: any, ...optionalParameters: any[]): void {
    this.logger.error(message, ...optionalParameters);
  }

  group(..._label: any[]): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  groupCollapsed(..._label: any[]): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  groupEnd(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  info(message?: any, ...optionalParameters: any[]): void {
    this.logger.info(message, ...optionalParameters);
  }

  log(message?: any, ...optionalParameters: any[]): void {
    this.logger.info(message, ...optionalParameters);
  }

  table(_tabularData: any, _properties?: readonly string[]): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  time(label = 'default'): void {
    this.timers.set(label, Date.now());
  }

  timeEnd(label = 'default'): void {
    this.log('%s: %dms', label, Date.now() - (this.timers.get(label) ?? 0));
    this.timers.delete(label);
  }

  timeLog(label = 'default', ...data: any[]): void {
    this.log('%s: %dms', label, Date.now() - (this.timers.get(label) ?? 0), ...data);
  }

  trace(message: any, ...optionalParameters: any[]): void {
    this.logger.trace(message, ...optionalParameters);
  }

  warn(message?: any, ...optionalParameters: any[]): void {
    this.logger.warn(message, ...optionalParameters);
  }

  profile(_label?: string): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  profileEnd(_label?: string): void {} // eslint-disable-line @typescript-eslint/no-empty-function
  timeStamp(_label?: string): void {} // eslint-disable-line @typescript-eslint/no-empty-function
}

export default AsConsoleAdapter;
