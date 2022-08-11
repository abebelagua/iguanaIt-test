import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { getAppVersion } from './utils/get-app-version';

@ApiTags('Healthz')
@Controller('/healthz')
export class HealthzController {
	@Get()
	@ApiOperation({
		operationId: 'healthCheck',
		summary: 'Health Check and Version Check'
	})
	handler() {
		const version = getAppVersion();
		return {
			status: 'ok',
			version: version || ''
		};
	}
}
