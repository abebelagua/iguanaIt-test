export const singleLine = (...fragments: string[]) => fragments.join(' ');

export const multiLine = (...fragments: string[]) => fragments.join('\n');

export function pad(
	str: string,
	length: number,
	padStr = ' ',
	type: 'left' | 'right' | 'both' = 'left'
) {
	length = ~~length;
	if (!padStr) {
		padStr = ' ';
	} else if (padStr.length > 1) {
		padStr = padStr.charAt(0);
	}

	let padlen = 0;
	switch (type) {
		case 'right':
			padlen = length - str.length;
			return str + padStr.repeat(padlen);
		case 'both':
			padlen = length - str.length;
			return (
				padStr.repeat(Math.ceil(padlen / 2)) +
				str +
				padStr.repeat(Math.floor(padlen / 2))
			);
		default: // 'left'
			padlen = length - str.length;
			return padStr.repeat(padlen) + str;
	}
}

export function lpad(str: string, length: number, padStr?: string) {
	return pad(str, length, padStr);
}

export function rpad(str: string, length: number, padStr?: string) {
	return pad(str, length, padStr, 'right');
}

export function lrpad(str: string, length: number, padStr?: string) {
	return pad(str, length, padStr, 'both');
}

export function makeBanner(message: string | string[], title?: string) {
	if (!Array.isArray(message)) {
		message = message.split('\n');
	}

	let lines = [];
	const len = Math.max.apply(
		null,
		message.map(line => line.length)
	);
	const topLine = `+--${pad('', len, '-')}--+`;
	const separator = `|  ${pad('', len, '')}  |`;

	lines.push(topLine);
	if (title) {
		lines.push(`|  ${lrpad(title, len)}  |`);
		lines.push(topLine);
	}
	lines.push(separator);

	lines = [...lines, ...message.map(line => `|  ${rpad(line, len)}  |`)];

	lines.push(separator);
	lines.push(topLine);
	return lines;
}
