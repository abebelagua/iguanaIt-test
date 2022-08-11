/**
 * The property path to load OpenAPI config on the global config object.
 */
export const CONFIG_KEY_LOG = 'log';

export type NestLogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

export const LOG_ERROR = 'ERROR';
export const LOG_WARN = 'WARN';
export const LOG_DEBUG = 'DEBUG';
export const LOG_VERBOSE = 'VERBOSE';

export type LogLevel =
	| typeof LOG_ERROR
	| typeof LOG_WARN
	| typeof LOG_DEBUG
	| typeof LOG_VERBOSE;

export const LOG_LEVELS: LogLevel[] = [
	LOG_ERROR,
	LOG_WARN,
	LOG_DEBUG,
	LOG_VERBOSE
];

export const LOG_LEVEL_MAP: Record<LogLevel, NestLogLevel[]> = {
	[LOG_ERROR]: ['log', 'error'],
	[LOG_WARN]: ['log', 'error', 'warn'],
	[LOG_DEBUG]: ['log', 'error', 'warn', 'debug'],
	[LOG_VERBOSE]: ['log', 'error', 'warn', 'debug', 'verbose']
};

const levelFromEnv: any = process.env.LOG_LEVEL;
export const LEVEL: LogLevel =
	levelFromEnv && LOG_LEVELS.includes(levelFromEnv)
		? levelFromEnv
		: LOG_ERROR;
export const NEST_LOG_LEVEL = LOG_LEVEL_MAP[LEVEL];

/**
 * The global logging configuration.
 */
export interface LogConfig {
	LEVEL: LogLevel;
}
