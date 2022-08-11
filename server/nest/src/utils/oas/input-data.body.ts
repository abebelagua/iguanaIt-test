import R from './i18n';

export const InputDataBody = (type: any, description?: string) => ({
	description: description || R.API_INPUT_DATA_DESCRIPTION,
	type
});
