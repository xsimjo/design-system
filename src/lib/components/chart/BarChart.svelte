<script lang="ts" generics="T extends object">
	import './chart.css';
	import { scaleBand } from 'd3-scale';
	import { stack, stackOffsetDiverging } from 'd3-shape';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ChartSeries, ChartXKey, ChartXValue } from './types.js';
	import ChartFrame from '$lib/internal/chart/ChartFrame.svelte';
	import {
		barPath,
		formatNumber,
		formatXValue,
		readPx,
		seriesColor,
		toRows,
		valueScale,
		type ChartRow
	} from '$lib/internal/chart/utils.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** One datum per bar group, left to right. */
		data: readonly T[];
		/** Field holding each datum's category. */
		x: ChartXKey<T>;
		/** Plotted fields, in color order. */
		series: readonly ChartSeries<T>[];
		/** Accessible name of the chart and caption of its data table. */
		label: string;
		/** Series side by side, or stacked into one bar. */
		layout?: 'grouped' | 'stacked';
		/** Header of the category column in the data table. Defaults to `x`. */
		xName?: string;
		formatX?: (value: ChartXValue) => string;
		formatValue?: (value: number) => string;
	}

	let {
		data,
		x,
		series,
		label,
		layout = 'grouped',
		xName,
		formatX = formatXValue,
		formatValue = formatNumber,
		...restProps
	}: Props = $props();

	let width = $state(0);
	let height = $state(0);
	let active = $state<number | null>(null);
	let element = $state<HTMLDivElement>();

	// Bar geometry is drawn in SVG, so the CSS tokens are read rather than applied.
	const geometry = $derived(
		element && width > 0
			? {
					maxWidth: readPx(element, '--chart-bar-max-width', 24),
					gap: readPx(element, '--chart-bar-gap', 2),
					radius: readPx(element, '--chart-bar-radius', 4)
				}
			: { maxWidth: 24, gap: 2, radius: 4 }
	);

	const rows = $derived(toRows(data, { x, series, formatX }));
	const frameSeries = $derived(series.map((s, i) => ({ label: s.label, color: seriesColor(i) })));

	const band = $derived(
		scaleBand<number>()
			.domain(rows.map((_, i) => i))
			.range([0, width])
			.paddingInner(0.2)
			.paddingOuter(0.1)
	);

	const stacked = $derived(
		layout === 'stacked'
			? stack<ChartRow, number>()
					.keys(series.map((_, i) => i))
					.value((row, i) => row.values[i] ?? 0)
					.offset(stackOffsetDiverging)(rows)
			: []
	);

	const domain = $derived.by((): [number, number] => {
		const ends =
			layout === 'stacked'
				? stacked.flatMap((layer) => layer.flatMap(([low, high]) => [low, high]))
				: rows.flatMap((row) => row.values.filter((v) => v !== null));
		return [Math.min(0, ...ends), Math.max(0, ...ends)];
	});

	const y = $derived(
		valueScale({
			domain,
			height,
			integers: rows.every((row) => row.values.every((v) => v === null || Number.isInteger(v)))
		})
	);

	const positions = $derived(rows.map((_, i) => (band(i) ?? 0) + band.bandwidth() / 2));
	const xTicks = $derived(rows.map((row, i) => ({ label: row.x, position: positions[i] })));
	const baseline = $derived(y.scale(0));

	const bars = $derived.by(() => {
		const { maxWidth, gap, radius } = geometry;
		const bandwidth = band.bandwidth();
		const result: { key: string; path: string; color: string }[] = [];

		if (layout === 'stacked') {
			const barWidth = Math.min(maxWidth, bandwidth);
			rows.forEach((row, r) => {
				const left = (band(r) ?? 0) + (bandwidth - barWidth) / 2;
				// Only the outermost segment on each side of zero gets a rounded end.
				const top = row.values.findLastIndex((v) => v !== null && v > 0);
				const bottom = row.values.findLastIndex((v) => v !== null && v < 0);
				stacked.forEach((layer, s) => {
					const [low, high] = layer[r];
					if (low === high) return;
					const isUp = high > 0;
					const from = isUp ? low : high;
					const to = isUp ? high : low;
					// Segments not touching zero start one gap away from their neighbor.
					const inset = from === 0 ? 0 : isUp ? -gap : gap;
					const base = y.scale(from) + inset;
					const end = y.scale(to);
					if (isUp ? base <= end : base >= end) return;
					result.push({
						key: `${s}-${r}`,
						color: seriesColor(s),
						path: barPath({
							x: left,
							width: barWidth,
							base,
							end,
							radius: s === (isUp ? top : bottom) ? radius : 0
						})
					});
				});
			});
			return result;
		}

		const count = series.length;
		const barWidth = Math.max(0, Math.min(maxWidth, (bandwidth - gap * (count - 1)) / count));
		const groupWidth = barWidth * count + gap * (count - 1);
		rows.forEach((row, r) => {
			const left = (band(r) ?? 0) + (bandwidth - groupWidth) / 2;
			row.values.forEach((value, s) => {
				if (value === null || value === 0) return;
				result.push({
					key: `${s}-${r}`,
					color: seriesColor(s),
					path: barPath({
						x: left + s * (barWidth + gap),
						width: barWidth,
						base: baseline,
						end: y.scale(value),
						radius
					})
				});
			});
		});
		return result;
	});
</script>

<ChartFrame
	kind="bar"
	{label}
	xName={xName ?? x}
	series={frameSeries}
	{rows}
	{positions}
	{xTicks}
	yTicks={y.ticks}
	anchorWidth={band.bandwidth()}
	{baseline}
	{formatValue}
	bind:width
	bind:height
	bind:active
	bind:element
	{...restProps}
>
	{#snippet marks()}
		{#if active !== null}
			<rect
				class="chart__wash"
				x={band(active) ?? 0}
				y="0"
				width={band.bandwidth()}
				{height}
				rx="2"
			/>
		{/if}
		{#each bars as bar (bar.key)}
			<path class="chart__bar" d={bar.path} style:fill={bar.color} />
		{/each}
	{/snippet}
</ChartFrame>
