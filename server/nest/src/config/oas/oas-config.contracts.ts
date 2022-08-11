export const OAS_ENABLED = 'OAS_ENABLED';
export const OAS_PATH = 'OAS_PATH';

/**
 * The property path to load OpenAPI config on the global config object.
 */
export const CONFIG_KEY_OAS = 'oas';

/**
 * The global configuration for the auth module
 */
export interface OasConfig {
	OAS_ENABLED: boolean;
	OAS_PATH: string;
}
