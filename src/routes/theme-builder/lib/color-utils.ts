/**
 * Parse an oklch(...) CSS string into its components.
 * Handles both `oklch(45% 0.03 260)` and `oklch(0% 0 0 / 0.15)`.
 */
export function parseOklch(raw: string): { l: number; c: number; h: number; a?: number } | null {
	const match = raw.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/);
	if (!match) return null;
	return {
		l: parseFloat(match[1]),
		c: parseFloat(match[2]),
		h: parseFloat(match[3]),
		a: match[4] !== undefined ? parseFloat(match[4]) : undefined
	};
}

/**
 * Serialize oklch components back to a CSS string.
 */
export function serializeOklch(l: number, c: number, h: number, a?: number): string {
	const lStr = `${round(l, 1)}%`;
	const cStr = `${round(c, 3)}`;
	const hStr = `${round(h, 0)}`;
	if (a !== undefined) {
		return `oklch(${lStr} ${cStr} ${hStr} / ${round(a, 2)})`;
	}
	return `oklch(${lStr} ${cStr} ${hStr})`;
}

/**
 * Convert oklch values to a hex color string using the browser's CSS engine.
 * Uses a persistent sentinel element to avoid layout thrash on frequent calls.
 * Must only be called in the browser.
 */
let sentinel: HTMLDivElement | null = null;

function getSentinel(): HTMLDivElement {
	if (!sentinel) {
		sentinel = document.createElement('div');
		sentinel.style.display = 'none';
		document.body.appendChild(sentinel);
	}
	return sentinel;
}

export function oklchToHex(l: number, c: number, h: number): string {
	if (typeof document === 'undefined') return '#000000';
	const el = getSentinel();
	el.style.color = `oklch(${l}% ${c} ${h})`;
	const rgb = getComputedStyle(el).color;
	const m = rgb.match(/\d+/g);
	if (!m) return '#000000';
	return (
		'#' +
		m
			.slice(0, 3)
			.map((n) => parseInt(n).toString(16).padStart(2, '0'))
			.join('')
	);
}

/**
 * Convert hex color to oklch components using pure math.
 * hex → sRGB linear → OKLab → OKLCh
 */
export function hexToOklch(hex: string): { l: number; c: number; h: number } {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;

	// sRGB gamma → linear
	const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
	const lr = toLinear(r);
	const lg = toLinear(g);
	const lb = toLinear(b);

	// Linear sRGB → LMS (using OKLab matrix)
	const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
	const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
	const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

	// LMS → OKLab
	const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
	const bLab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

	// OKLab → OKLCh
	const C = Math.sqrt(a * a + bLab * bLab);
	let H = (Math.atan2(bLab, a) * 180) / Math.PI;
	if (H < 0) H += 360;

	return {
		l: round(L * 100, 1),
		c: round(C, 3),
		h: round(H, 0)
	};
}

function round(value: number, decimals: number): number {
	const factor = Math.pow(10, decimals);
	return Math.round(value * factor) / factor;
}
