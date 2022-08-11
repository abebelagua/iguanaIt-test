import * as Joi from 'joi';
import { SchemaMap } from 'joi';

import {
	LogConfig,
	LOG_ERROR,
	LOG_WARN,
	LOG_DEBUG,
	LOG_VERBOSE,
	LOG_LEVELS
} from './log-config.contracts';

const levelsList = LOG_LEVELS.join(', ');
const msg = `Invalid log level, please specify one of: ${levelsList}. Default is ERROR.`;

export const logConfigSchema: SchemaMap<LogConfig> = {
	LEVEL: Joi.string()
		.valid(LOG_ERROR, LOG_WARN, LOG_DEBUG, LOG_VERBOSE)
		.default(LOG_ERROR)
		.messages({ msg })
};
