import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppConfig } from './app-config.contract';
import { CONFIG_KEY_LOG, loadLogConfig, logConfigSchema } from './log';
import { CONFIG_KEY_OAS, loadOasConfig, oasConfigSchema } from './oas';
import {
	CONFIG_KEY_RUNTIME,
	loadRuntimeConfig,
	runtimeConfigSchema
} from './runtime';

export const configModule = ConfigModule.forRoot({
	isGlobal: true,
	cache: true,
	ignoreEnvFile: false,
	envFilePath: ['.env', '.env.local'],
	load: [
		loadRuntimeConfig,
		loadLogConfig,
		loadOasConfig
		// add other config loaders here
	],
	validationSchema: Joi.object<AppConfig>({
		[CONFIG_KEY_LOG]: logConfigSchema,
		[CONFIG_KEY_OAS]: oasConfigSchema,
		[CONFIG_KEY_RUNTIME]: runtimeConfigSchema
		// add other config schemas here
	})
});
