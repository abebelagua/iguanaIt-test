/**
 * Returns a Promise that resolves after
 * the specified delay in milliseconds
 *
 * @param delayMs The number of millisceonds to wait for
 */
export const delay = (delayMs: number) =>
	new Promise(resolve => {
		setTimeout(resolve, delayMs);
	});
