import * as Joi from 'joi';
import { SchemaMap } from 'joi';

export const APP_NAME = 'APP_NAME';
export const API_URL = 'API_URL';
export const DB_URI = 'DB_URI';
export const NODE_ENV = 'NODE_ENV';
export const SERVER_PORT = 'SERVER_PORT';
export const DEBUG = 'DEBUG';

export const CONFIG_KEY_RUNTIME = 'runtime';

export const DEFAULT_PORT = 4000;
export const ENV_DEV = 'Development';
export const ENV_PROD = 'Production';
export const ENV_STAGING = 'Staging';
export const ENV_LOCAL = 'Local';
export const APP_ENVIRONMENTS: AppEnvironment[] = [
	ENV_DEV,
	ENV_PROD,
	ENV_STAGING,
	ENV_LOCAL
];
export type AppEnvironment =
	| typeof ENV_DEV
	| typeof ENV_PROD
	| typeof ENV_STAGING
	| typeof ENV_LOCAL;

/**
 * The global configuration for runtime settings
 */
export interface RuntimeConfig {
	APP_ENV: AppEnvironment;
	APP_NAME: string;
	APP_VERSION: string;
	API_URL: string;
	DB_URI: string;
	SERVER_PORT: number | string;
}

export const runtimeConfigSchema: SchemaMap<RuntimeConfig> = {
	API_URL: Joi.string()
		.pattern(/^https?:\/\/\w+(\.\w+){2}$/)
		.default(`http://localhost:${DEFAULT_PORT}`),
	APP_NAME: Joi.string().default('ChatHQ Portal API'),
	APP_VERSION: Joi.string().pattern(/^v?\d+(\.\d+){2}(-\w+)?$/),
	APP_ENV: Joi.string()
		.valid(...APP_ENVIRONMENTS)
		.default(ENV_LOCAL),
	DB_URI: Joi.string().required(),
	SERVER_PORT: Joi.number().default(DEFAULT_PORT)
};
