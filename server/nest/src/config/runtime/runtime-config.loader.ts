import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { parse as parseEnv, DotenvParseOutput } from 'dotenv';

import { dropUndefined, getAppVersion } from '../../utils';

import { CONFIG_ROOT } from '../constants';

import {
	AppEnvironment,
	CONFIG_KEY_RUNTIME,
	RuntimeConfig
} from './runtime-config.contracts';

const logger = new Logger('RuntimeConfigLoader');

function fromFile() {
	const configFilePath = joinPath(CONFIG_ROOT, 'runtime.env');
	try {
		const configFileContents = readFileSync(configFilePath, 'utf8');
		const { APP_NAME, API_URL, APP_ENV, DB_URI, SERVER_PORT } = parseEnv<
			RuntimeConfig & DotenvParseOutput
		>(configFileContents);
		const config: RuntimeConfig = {
			APP_NAME,
			APP_VERSION: undefined,
			API_URL,
			APP_ENV,
			DB_URI,
			SERVER_PORT
		};
		return config;
	} catch (err) {
		logger.warn(
			`Failed to load runtime config from file '${configFilePath}': ${err.message}`
		);
		return undefined;
	}
}

function fromEnv() {
	const config: RuntimeConfig = {
		APP_NAME: process.env.APP_NAME,
		APP_VERSION: getAppVersion(),
		API_URL: process.env.API_URL,
		APP_ENV: process.env.NODE_ENV as AppEnvironment,
		DB_URI: process.env.DB_URI,
		SERVER_PORT: process.env.SERVER_PORT
	};
	return dropUndefined(config);
}

export const loadRuntimeConfig = registerAs(CONFIG_KEY_RUNTIME, () => {
	const configFromFile = fromFile() || {};
	const configFromEnv = fromEnv();

	const config: RuntimeConfig = Object.assign(
		{},
		configFromFile,
		configFromEnv
	);
	return config;
});
