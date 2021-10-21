import { InspectOptions } from 'node:util';
import { IConsole, ILogAdapter } from './types.js';

export class AsConsoleAdapter implements IConsole {
  protected readonly logger: ILogAdapter;
  protected readonly counts: Record<string, number> = {};
  protected readonly timers: Record<string, number> = {};

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
    this.counts[label] ??= 0;
    this.counts[label]++;
    this.log('%s: %d', label, this.counts[label]);
  }

  countReset(label = 'default'): void {
    this.counts[label] = 0;
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
    this.timers[label] = Date.now();
  }

  timeEnd(label = 'default'): void {
    this.log('%s: %dms', label, Date.now() - this.timers[label]);
  }

  timeLog(label = 'default', ...data: any[]): void {
    this.log('%s: %dms', label, Date.now() - this.timers[label], ...data);
  }

  trace(message?: any, ...optionalParameters: any[]): void {
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
