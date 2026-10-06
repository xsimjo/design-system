<script lang="ts" generics="T extends object">
	import './chart.css';
	import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
	import { area as d3Area, curveLinear, curveMonotoneX, curveStepAfter, line } from 'd3-shape';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ChartSeries, ChartXKey, ChartXValue } from './types.js';
	import ChartFrame from '$lib/internal/chart/ChartFrame.svelte';
	import {
		formatNumber,
		formatXValue,
		readX,
		seriesColor,
		toRows,
		valueScale,
		type ChartTick
	} from '$lib/internal/chart/utils.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/**
		 * One datum per x value. With Date or number x values the axis is
		 * continuous and data is sorted by x; otherwise points are evenly spaced
		 * in the given order.
		 */
		data: readonly T[];
		/** Field holding each datum's x value. */
		x: ChartXKey<T>;
		/** Plotted fields, in color order. */
		series: readonly ChartSeries<T>[];
		/** Accessible name of the chart and caption of its data table. */
		label: string;
		/** How points are joined: straight, smoothed, or held until the next point. */
		curve?: 'linear' | 'monotone' | 'step';
		/** Fill a soft wash between each line and zero. */
		area?: boolean;
		/** Header of the x column in the data table. Defaults to `x`. */
		xName?: string;
		formatX?: (value: ChartXValue) => string;
		formatValue?: (value: number) => string;
	}

	let {
		data,
		x,
		series,
		label,
		curve = 'linear',
		area = false,
		xName,
		formatX,
		formatValue = formatNumber,
		...restProps
	}: Props = $props();

	/** Approximate room each x-axis tick needs on a continuous axis, in pixels. */
	const TICK_SPACING = 90;

	const curves = { linear: curveLinear, monotone: curveMonotoneX, step: curveStepAfter };

	let width = $state(0);
	let height = $state(0);
	let active = $state<number | null>(null);

	const xValues = $derived(data.map((datum) => readX(datum, x)));

	const axis = $derived.by(() => {
		if (xValues.length > 0 && xValues.every((v) => v instanceof Date)) return 'time';
		if (xValues.length > 0 && xValues.every((v) => typeof v === 'number')) return 'linear';
		return 'point';
	});

	// A continuous axis draws its line in x order, whatever order the data came in.
	const sorted = $derived.by(() => {
		const order = data.map((datum, i) => ({ datum, value: xValues[i] }));
		if (axis === 'point') return order;
		return order.toSorted((a, b) => Number(a.value) - Number(b.value));
	});

	const sortedData = $derived(sorted.map((entry) => entry.datum));
	const numericX = $derived(sorted.map((entry) => Number(entry.value)));

	const rows = $derived(toRows(sortedData, { x, series, formatX: formatX ?? formatXValue }));
	const frameSeries = $derived(series.map((s, i) => ({ label: s.label, color: seriesColor(i) })));

	const xAxis = $derived.by((): { positions: number[]; ticks: ChartTick[] } => {
		if (axis === 'point') {
			const scale = scalePoint<number>()
				.domain(rows.map((_, i) => i))
				.range([0, width]);
			const positions = rows.map((_, i) => scale(i) ?? 0);
			return {
				positions,
				ticks: rows.map((row, i) => ({ label: row.x, position: positions[i] }))
			};
		}
		const count = Math.max(2, Math.floor(width / TICK_SPACING));
		const [first, last] = [numericX[0], numericX[numericX.length - 1]];
		if (axis === 'time') {
			const scale = scaleTime()
				.domain([new Date(first), new Date(last)])
				.range([0, width]);
			const tickFormat = scale.tickFormat();
			return {
				positions: numericX.map((v) => scale(new Date(v))),
				ticks: scale.ticks(count).map((tick) => ({
					label: formatX ? formatX(tick) : tickFormat(tick),
					position: scale(tick)
				}))
			};
		}
		const scale = scaleLinear().domain([first, last]).range([0, width]);
		return {
			positions: numericX.map((v) => scale(v)),
			ticks: scale.ticks(count).map((tick) => ({
				label: (formatX ?? formatXValue)(tick),
				position: scale(tick)
			}))
		};
	});

	const domain = $derived.by((): [number, number] => {
		const values = rows.flatMap((row) => row.values.filter((v) => v !== null));
		if (values.length === 0) return [0, 0];
		const [min, max] = [Math.min(...values), Math.max(...values)];
		// An area is measured from zero, so zero must be on the axis.
		return area ? [Math.min(0, min), Math.max(0, max)] : [min, max];
	});

	const y = $derived(
		valueScale({
			domain,
			height,
			integers: rows.every((row) => row.values.every((v) => v === null || Number.isInteger(v)))
		})
	);

	const baseline = $derived.by(() => {
		const [low, high] = y.scale.domain();
		return low <= 0 && high >= 0 ? y.scale(0) : undefined;
	});

	const paths = $derived.by(() => {
		const indices = rows.map((_, i) => i);
		return series.map((_, s) => {
			const valueAt = (i: number) => rows[i]?.values[s] ?? null;
			const isDefined = (i: number) => valueAt(i) !== null;
			const xAt = (i: number) => xAxis.positions[i];
			const yAt = (i: number) => y.scale(valueAt(i) ?? 0);
			const curveFactory = curves[curve];
			return {
				color: seriesColor(s),
				line: line<number>().x(xAt).y(yAt).defined(isDefined).curve(curveFactory)(indices) ?? '',
				area: area
					? (d3Area<number>()
							.x(xAt)
							.y0(baseline ?? height)
							.y1(yAt)
							.defined(isDefined)
							.curve(curveFactory)(indices) ?? '')
					: '',
				// A point with no defined neighbor draws no line, so mark it instead.
				isolated: indices
					.filter((i) => isDefined(i) && !isDefined(i - 1) && !isDefined(i + 1))
					.map((i) => ({ cx: xAt(i), cy: yAt(i) }))
			};
		});
	});

	const activePoints = $derived.by(() => {
		const index = active;
		if (index === null) return [];
		return series.flatMap((_, s) => {
			const value = rows[index]?.values[s];
			return value === null || value === undefined
				? []
				: [{ s, cx: xAxis.positions[index], cy: y.scale(value) }];
		});
	});
</script>

<ChartFrame
	kind="line"
	{label}
	xName={xName ?? x}
	series={frameSeries}
	{rows}
	positions={xAxis.positions}
	xTicks={xAxis.ticks}
	yTicks={y.ticks}
	{baseline}
	{formatValue}
	bind:width
	bind:height
	bind:active
	{...restProps}
>
	{#snippet marks()}
		{#if active !== null}
			<line
				class="chart__crosshair"
				x1={Math.round(xAxis.positions[active]) + 0.5}
				x2={Math.round(xAxis.positions[active]) + 0.5}
				y1="0"
				y2={height}
			/>
		{/if}
		{#each paths as path, s (s)}
			{#if path.area}
				<path class="chart__area" d={path.area} style:fill={path.color} />
			{/if}
		{/each}
		{#each paths as path, s (s)}
			<path class="chart__line" d={path.line} style:stroke={path.color} />
			{#each path.isolated as point (point.cx)}
				<circle class="chart__marker" cx={point.cx} cy={point.cy} style:fill={path.color} />
			{/each}
		{/each}
		{#each activePoints as point (point.s)}
			<circle class="chart__marker" cx={point.cx} cy={point.cy} style:fill={seriesColor(point.s)} />
		{/each}
	{/snippet}
</ChartFrame>
