import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { OasConfig, RuntimeConfig } from '../../config';

export const SWAGGER_TAGS = {
	account: {
		name: 'Account',
		description: ''
	}
};

export const configureSwaggerUI = (
	nestApp: INestApplication,
	options: RuntimeConfig & OasConfig
) => {
	if (!options.OAS_ENABLED) {
		return `SwaggerUI not enabled`;
	}

	// configure OpenAPI spec document
	const docBuilder = new DocumentBuilder()
		.setTitle(options.APP_NAME)
		.setVersion(options.APP_VERSION)
		.addBearerAuth();

	// add the appropriate server entry
	docBuilder.addServer(options.API_URL, options.APP_ENV);

	// build OpenAPI spec document
	const config = docBuilder.build();
	const document = SwaggerModule.createDocument(nestApp, config);

	// configure SwaggerUI
	SwaggerModule.setup(options.OAS_PATH, nestApp, document, {
		swaggerOptions: {
			persistAuthorization: true
		},
		customSiteTitle: options.APP_NAME
	});
	return `SwaggerUI listening on ${options.API_URL}${options.OAS_PATH}`;
};
