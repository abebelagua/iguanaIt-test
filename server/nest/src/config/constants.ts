import { join as joinPath } from 'path';

export const ENV_ONE = '1';
export const ENV_TRUE = 'true';
export const ENV_YES = 'yes';
export const ENV_TRUTHY = [ENV_ONE, ENV_TRUE, ENV_YES];

export const ENV_ZERO = '0';
export const ENV_FALSE = 'false';
export const ENV_NO = 'no';
export const ENV_FALSY = [ENV_ZERO, ENV_FALSE, ENV_NO, undefined, null];

export const CONFIG_ROOT =
	process.env.CONFIG_ROOT || joinPath(process.cwd(), 'config');

export const throttlerConfig = {
	ttl: 60,
	limit: 10
};
