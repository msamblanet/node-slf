import type { Except } from 'type-fest';

export type IConsole = Except<Console, 'Console'>;

export type LogLevel = 'all' | 'silly' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'none';
export type SprintfArgument = boolean | number | string | null;
export interface ILogAdapter {
  silly(message: string, ...interpolationValues: SprintfArgument[]): void;
  silly(context: Record<string, unknown>, message?: string, ...interpolationValues: SprintfArgument[]): void;

  trace(message: string, ...interpolationValues: SprintfArgument[]): void;
  trace(context: Record<string, unknown>, message?: string, ...interpolationValues: SprintfArgument[]): void;

  debug(message: string, ...interpolationValues: SprintfArgument[]): void;
  debug(context: Record<string, unknown>, message?: string, ...interpolationValues: SprintfArgument[]): void;

  info(message: string, ...interpolationValues: SprintfArgument[]): void;
  info(context: Record<string, unknown>, message?: string, ...interpolationValues: SprintfArgument[]): void;

  warn(message: string, ...interpolationValues: SprintfArgument[]): void;
  warn(context: Record<string, unknown>, message?: string, ...interpolationValues: SprintfArgument[]): void;

  error(message: string, ...interpolationValues: SprintfArgument[]): void;
  error(context: Record<string, unknown>, message?: string, ...interpolationValues: SprintfArgument[]): void;

  fatal(message: string, ...interpolationValues: SprintfArgument[]): void;
  fatal(context: Record<string, unknown>, message?: string, ...interpolationValues: SprintfArgument[]): void;

  isLevelEnabled(level: LogLevel | number): boolean;
  getChildLogger(name: string, context?: Record<string, unknown>): ILogAdapter;

  logLevelToValue(level: number | LogLevel): number;
  valueToLogLevel(level: number | LogLevel): LogLevel;

  toConsole(): IConsole;
}
