/**
 * Converts a URL-safe base64 string to a hex string
 *
 * @param b64 URL-safe base64 string
 */
export function base64ToHex(b64: string) {
	const hex = Buffer.from(b64, 'base64url').toString('hex');
	return hex;
}
