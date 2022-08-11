export const getMongooseFilter = (filters: any) => {
	const sourceFilters = Object.entries(filters ?? {}).map(([k, o]) => [
		k,
		new RegExp(o.toString(), 'i')
	]);
	return Object.fromEntries(sourceFilters);
};
