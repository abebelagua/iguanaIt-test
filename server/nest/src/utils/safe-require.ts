/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Logger } from '@nestjs/common';

/**
 * Attempts to `require` a module by trying each of the specified paths in order
 * until one of them succeeds. Will return an empty object if none of the paths
 * points to a valid module.
 *
 * @param paths Paths to try
 */
export function safeRequire(...paths: string[]): Record<string, any> {
	let data: Record<string, any> = {};
	for (const path of paths) {
		try {
			data = require(path);
			break;
		} catch (e) {
			Logger.verbose(`Failed to require file: ${path}`, 'safeRequire');
		}
	}

	return data;
}
