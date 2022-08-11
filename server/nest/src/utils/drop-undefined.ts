export const dropUndefined = <T>(record: T) => {
	const entries = Object.entries(record).filter(([, v]) => v !== undefined);
	const result = Object.fromEntries(entries) as T;
	return result;
};
