import * as Joi from 'joi';
import { SchemaMap } from 'joi';

import { OasConfig } from './oas-config.contracts';

export const oasConfigSchema: SchemaMap<OasConfig> = {
	OAS_ENABLED: Joi.boolean().default(true),
	OAS_PATH: Joi.string().default('/docs')
};
