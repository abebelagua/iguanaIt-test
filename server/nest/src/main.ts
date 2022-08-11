import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import {
	CONFIG_KEY_OAS,
	CONFIG_KEY_RUNTIME,
	NEST_LOG_LEVEL,
	OasConfig,
	RuntimeConfig
} from './config';
import { makeBanner } from './utils';
import { configureSwaggerUI } from './utils/oas';

async function bootstrap(): Promise<any> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true,
		logger: NEST_LOG_LEVEL
	});

	app.useGlobalPipes(new ValidationPipe());
	const configService: ConfigService = app.get(ConfigService);

	const isVerboseLoggingEnabled = NEST_LOG_LEVEL.includes('verbose');
	if (isVerboseLoggingEnabled) {
		Logger.warn(
			'Verbose logging enabled, will log potentially sensitive information. DO NOT USE IN PRODUCTION!',
			'Bootstrap'
		);
	}

	const runtimeConfig = configService.get<RuntimeConfig>(CONFIG_KEY_RUNTIME);
	const oasConfig = configService.get<OasConfig>(CONFIG_KEY_OAS);

	const oasMessage = configureSwaggerUI(app, {
		...runtimeConfig,
		...oasConfig
	});

	await app.listen(runtimeConfig.SERVER_PORT);

	const banner = makeBanner([
		`${runtimeConfig.APP_NAME} v${runtimeConfig.APP_VERSION}`,
		``,
		`API: ${runtimeConfig.API_URL}`,
		`OAS: ${oasMessage}`
	]);
	banner.forEach(line => Logger.log(line, 'Bootstrap'));

	return app;
}

bootstrap();
