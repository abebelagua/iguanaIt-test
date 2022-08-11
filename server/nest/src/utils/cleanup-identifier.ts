import { paramCase } from 'param-case';

export const cleanupIdentifier = (identifier: string) =>
	paramCase(identifier).replace(/[^0-9a-z-]/g, '');
