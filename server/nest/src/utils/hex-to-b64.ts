/**
 * Converts a hex string to a URL-safe base64 string
 *
 * @param hex Hex string
 */
export function hexToBase64(hex: string) {
	const b64 = Buffer.from(hex, 'hex').toString('base64url');
	return b64;
}
