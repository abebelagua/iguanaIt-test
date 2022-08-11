export function objectFilterBy(object: any, filters) {
	if (!filters) {
		return true;
	}

	const entries = Object.entries(filters);
	for (const [key, value] of entries) {
		const objectValue = object[key];
		if (objectValue === null || objectValue === undefined) {
			return false;
		}

		if (
			typeof objectValue === 'string' &&
			typeof value === 'string' &&
			objectValue.toLowerCase().includes(value.toLowerCase())
		) {
			continue;
		}

		if (
			typeof objectValue === 'number' &&
			typeof value === 'number' &&
			objectValue.toString().includes(value.toString())
		) {
			continue;
		}

		if (objectValue !== value) {
			return false;
		}
	}

	return true;
}
