import { join as joinPath } from 'path';
import { readFileSync } from 'fs';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { parse as parseEnv } from 'dotenv';

import { dropUndefined } from '../../utils';

import { CONFIG_ROOT, ENV_TRUTHY } from '../constants';

import { CONFIG_KEY_OAS, OasConfig } from './oas-config.contracts';

const logger = new Logger('OASConfigLoader');

function fromFile() {
	const configFilePath = joinPath(CONFIG_ROOT, 'oas.env');
	try {
		const configFileContents = readFileSync(configFilePath, 'utf8');
		const { OAS_ENABLED, OAS_PATH } = parseEnv(configFileContents);
		const config: OasConfig = {
			OAS_ENABLED: ENV_TRUTHY.includes(OAS_ENABLED),
			OAS_PATH
		};
		return config;
	} catch (err) {
		logger.warn(
			`Failed to load OpenAPI config from file '${configFilePath}': ${err.message}`
		);
		return undefined;
	}
}

function fromEnv() {
	const oasConfig: OasConfig = {
		OAS_ENABLED:
			typeof process.env.OAS_ENABLED === 'undefined'
				? undefined
				: ENV_TRUTHY.includes(process.env.OAS_ENABLED),
		OAS_PATH: process.env.OAS_PATH
	};
	return dropUndefined(oasConfig);
}

export const loadOasConfig = registerAs(CONFIG_KEY_OAS, () => {
	const configFromFile = fromFile() || {};
	const configFromEnv = fromEnv();

	const config: OasConfig = Object.assign({}, configFromFile, configFromEnv);
	return config;
});
