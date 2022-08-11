import { registerAs } from '@nestjs/config';

import { CONFIG_KEY_LOG, LogConfig, LEVEL } from './log-config.contracts';

export const loadLogConfig = registerAs(CONFIG_KEY_LOG, () => {
	const config: LogConfig = {
		LEVEL
	};

	return config;
});
