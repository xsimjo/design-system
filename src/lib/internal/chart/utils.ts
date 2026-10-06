import { scaleLinear } from 'd3-scale';
import type {
	ChartSeries,
	ChartValueKey,
	ChartXKey,
	ChartXValue
} from '$lib/components/chart/types.js';

/** Number of `--chart-series-*` tokens; later series share `--chart-series-other`. */
const SERIES_SLOTS = 6;

const numberFormat = new Intl.NumberFormat();
const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

export const formatNumber = (value: number) => numberFormat.format(value);

export function formatXValue(value: ChartXValue): string {
	if (value instanceof Date) return dateFormat.format(value);
	if (typeof value === 'number') return numberFormat.format(value);
	return value;
}

export function seriesColor(index: number): string {
	return index < SERIES_SLOTS ? `var(--chart-series-${index + 1})` : 'var(--chart-series-other)';
}

export function readX<T>(datum: T, key: ChartXKey<T>): ChartXValue {
	const value: unknown = datum[key];
	if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) return value;
	return String(value);
}

/** A non-finite or non-numeric value is missing, and plots as a gap. */
export function readValue<T>(datum: T, key: ChartValueKey<T>): number | null {
	const value: unknown = datum[key];
	return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/** One row per datum: the x label and every series' value, for tooltips and the table. */
export interface ChartRow {
	readonly x: string;
	readonly values: readonly (number | null)[];
}

export function toRows<T>(
	data: readonly T[],
	options: {
		x: ChartXKey<T>;
		series: readonly ChartSeries<T>[];
		formatX: (value: ChartXValue) => string;
	}
): ChartRow[] {
	return data.map((datum) => ({
		x: options.formatX(readX(datum, options.x)),
		values: options.series.map((s) => readValue(datum, s.key))
	}));
}

export interface ChartTick {
	readonly label: string;
	/** Pixels from the left of the plot (x) or the top of the plot (y). */
	readonly position: number;
}

/**
 * A linear y scale over `domain`, extended to round tick values. When every value
 * is an integer, fractional ticks are dropped so a count never reads "2.5".
 */
export function valueScale(options: {
	domain: [number, number];
	height: number;
	integers: boolean;
}) {
	const [min, max] = options.domain;
	const count = Math.max(2, Math.floor(options.height / 50));
	const scale = scaleLinear()
		.domain(min === max ? [min, min + 1] : [min, max])
		.range([options.height, 0])
		.nice(count);
	const ticks: ChartTick[] = scale
		.ticks(count)
		.filter((tick) => !options.integers || Number.isInteger(tick))
		.map((tick) => ({ label: formatNumber(tick), position: scale(tick) }));
	return { scale, ticks };
}

/** Reads a pixel length token, falling back when it is unset or not a plain length. */
export function readPx(element: Element, token: string, fallback: number): number {
	const value = parseFloat(getComputedStyle(element).getPropertyValue(token));
	return Number.isFinite(value) ? value : fallback;
}

/**
 * A bar from `base` to `end` (pixels on the y-axis), with its data end rounded
 * and the baseline end square. Works for bars growing up or down.
 */
export function barPath(bar: {
	x: number;
	width: number;
	base: number;
	end: number;
	radius: number;
}): string {
	const { x, width, base, end } = bar;
	const r = Math.max(0, Math.min(bar.radius, width / 2, Math.abs(base - end)));
	const up = base > end;
	const corner = up ? end + r : end - r;
	const sweep = up ? 1 : 0;
	return (
		`M${x},${base}V${corner}` +
		`A${r},${r} 0 0 ${sweep} ${x + r},${end}` +
		`H${x + width - r}` +
		`A${r},${r} 0 0 ${sweep} ${x + width},${corner}` +
		`V${base}Z`
	);
}
