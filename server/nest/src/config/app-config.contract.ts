import { LogConfig, CONFIG_KEY_LOG } from './log';
import { OasConfig, CONFIG_KEY_OAS } from './oas';
import { RuntimeConfig, CONFIG_KEY_RUNTIME } from './runtime';

export interface AppConfig {
	[CONFIG_KEY_LOG]: LogConfig;
	[CONFIG_KEY_OAS]: OasConfig;
	[CONFIG_KEY_RUNTIME]: RuntimeConfig;
}
