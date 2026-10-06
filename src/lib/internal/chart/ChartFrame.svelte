<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ChartRow, ChartTick } from './utils.js';

	interface FrameSeries {
		readonly label: string;
		/** CSS color, normally a `var(--chart-series-*)` reference. */
		readonly color: string;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		kind: 'bar' | 'line';
		label: string;
		xName: string;
		series: readonly FrameSeries[];
		rows: readonly ChartRow[];
		/** x of each row in plot pixels, used for hit-testing and the tooltip. */
		positions: readonly number[];
		/** Candidate x-axis labels; any that would overlap are thinned out. */
		xTicks: readonly ChartTick[];
		yTicks: readonly ChartTick[];
		/** Width of the band around each x, which the tooltip keeps clear of. */
		anchorWidth?: number;
		/** y of the zero line in plot pixels, when zero is in range. */
		baseline?: number;
		formatValue: (value: number) => string;
		width?: number;
		height?: number;
		active?: number | null;
		element?: HTMLDivElement;
		/** SVG content drawn over the grid. */
		marks: Snippet;
	}

	let {
		kind,
		label,
		xName,
		series,
		rows,
		positions,
		xTicks,
		yTicks,
		anchorWidth = 0,
		baseline,
		formatValue,
		width = $bindable(0),
		height = $bindable(0),
		active = $bindable(null),
		element = $bindable(),
		marks,
		class: className = '',
		...restProps
	}: Props = $props();

	/** Minimum space between two x-axis labels, in pixels. */
	const LABEL_GAP = 12;
	/** Space between the active x and the tooltip, in pixels. */
	const TOOLTIP_OFFSET = 12;

	let xAxis = $state<HTMLDivElement>();
	let canvas: HTMLCanvasElement | undefined;

	const isReady = $derived(width > 0 && height > 0);
	const current = $derived(active ?? rows.length - 1);

	// Labels are text in HTML, so measure them with the axis font before placing them.
	// The axis element only exists in the browser, so this never runs on the server.
	const labelWidths = $derived.by(() => {
		if (!xAxis || !isReady) return [];
		canvas ??= document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (!context) return [];
		const style = getComputedStyle(xAxis);
		context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
		return xTicks.map((tick) => context.measureText(tick.label).width);
	});

	// Keep every nth label, with the smallest n at which none overlap, so the
	// survivors stay evenly spaced. Edge labels are pulled inside the plot.
	const placedTicks = $derived.by(() => {
		if (labelWidths.length !== xTicks.length) return [];
		const placed = xTicks.map((tick, i) => {
			const labelWidth = labelWidths[i];
			const left = Math.min(Math.max(0, tick.position - labelWidth / 2), width - labelWidth);
			return { label: tick.label, left: Math.max(0, left), right: Math.max(0, left) + labelWidth };
		});
		for (let step = 1; step <= placed.length; step++) {
			const kept = placed.filter((_, i) => i % step === 0);
			if (kept.every((tick, i) => i === 0 || tick.left >= kept[i - 1].right + LABEL_GAP)) {
				return kept;
			}
		}
		return [];
	});

	const tooltip = $derived.by(() => {
		if (active === null || !rows[active]) return null;
		const x = positions[active];
		const gap = anchorWidth / 2 + TOOLTIP_OFFSET;
		const isFlipped = x > width / 2;
		return {
			row: rows[active],
			left: isFlipped ? undefined : `${x + gap}px`,
			right: isFlipped ? `${width - x + gap}px` : undefined
		};
	});

	const valueText = $derived.by(() => {
		const row = rows[current];
		if (!row) return 'No data';
		if (series.length === 1) return `${row.x}: ${display(row.values[0])}`;
		return `${row.x}: ${series.map((s, i) => `${s.label} ${display(row.values[i])}`).join(', ')}`;
	});

	function display(value: number | null | undefined): string {
		return value === null || value === undefined ? '—' : formatValue(value);
	}

	function nearest(x: number): number {
		let best = 0;
		for (let i = 1; i < positions.length; i++) {
			if (Math.abs(positions[i] - x) < Math.abs(positions[best] - x)) best = i;
		}
		return best;
	}

	function handlePointer(event: PointerEvent & { currentTarget: HTMLDivElement }) {
		if (!positions.length) return;
		const bounds = event.currentTarget.getBoundingClientRect();
		active = nearest(event.clientX - bounds.left);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!rows.length) return;
		if (event.key === 'Escape') {
			active = null;
			return;
		}
		const next = {
			ArrowLeft: current - 1,
			ArrowRight: current + 1,
			Home: 0,
			End: rows.length - 1
		}[event.key];
		if (next === undefined) return;
		event.preventDefault();
		active = Math.min(rows.length - 1, Math.max(0, next));
	}
</script>

<div bind:this={element} class="chart chart--{kind} {className}" {...restProps}>
	{#if series.length > 1}
		<ul class="chart__legend" aria-hidden="true">
			{#each series as s, i (i)}
				<li class="chart__legend-item">
					<span class="chart__swatch" style:--chart-key-color={s.color}></span>
					{s.label}
				</li>
			{/each}
		</ul>
	{/if}

	<div class="chart__body">
		<div class="chart__y-axis" aria-hidden="true">
			{#each yTicks as tick (tick.label)}
				<span class="chart__y-sizer">{tick.label}</span>
			{/each}
			{#if isReady}
				{#each yTicks as tick (tick.label)}
					<span class="chart__y-tick" style:top="{tick.position}px">{tick.label}</span>
				{/each}
			{/if}
		</div>

		<div
			class="chart__plot"
			bind:clientWidth={width}
			bind:clientHeight={height}
			role="slider"
			aria-roledescription="{kind} chart"
			aria-label={label}
			aria-orientation="horizontal"
			aria-valuemin={0}
			aria-valuemax={Math.max(0, rows.length - 1)}
			aria-valuenow={Math.max(0, current)}
			aria-valuetext={valueText}
			tabindex="0"
			onkeydown={handleKeydown}
			onpointermove={handlePointer}
			onpointerdown={handlePointer}
			onpointerleave={() => (active = null)}
			onfocus={() => (active ??= rows.length ? rows.length - 1 : null)}
			onblur={() => (active = null)}
		>
			{#if isReady}
				<svg class="chart__svg" {width} {height} aria-hidden="true">
					{#each yTicks as tick (tick.label)}
						<line
							class="chart__grid"
							x1="0"
							x2={width}
							y1={Math.round(tick.position) + 0.5}
							y2={Math.round(tick.position) + 0.5}
						/>
					{/each}
					{#if baseline !== undefined}
						<line
							class="chart__baseline"
							x1="0"
							x2={width}
							y1={Math.round(baseline) + 0.5}
							y2={Math.round(baseline) + 0.5}
						/>
					{/if}
					{@render marks()}
				</svg>
			{/if}

			{#if tooltip}
				<div
					class="chart__tooltip"
					style:left={tooltip.left}
					style:right={tooltip.right}
					aria-hidden="true"
				>
					<p class="chart__tooltip-title">{tooltip.row.x}</p>
					{#if series.length === 1}
						<p class="chart__tooltip-value">{display(tooltip.row.values[0])}</p>
					{:else}
						<ul class="chart__tooltip-rows">
							{#each series as s, i (i)}
								<li class="chart__tooltip-row">
									<span class="chart__key" style:--chart-key-color={s.color}></span>
									<span class="chart__tooltip-value">{display(tooltip.row.values[i])}</span>
									<span class="chart__tooltip-series">{s.label}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
		</div>

		<div class="chart__x-axis" bind:this={xAxis} aria-hidden="true">
			{#each placedTicks as tick (tick.left)}
				<span class="chart__x-tick" style:left="{tick.left}px">{tick.label}</span>
			{/each}
		</div>
	</div>

	<!-- A table grows to fit its rows whatever its height, so a block does the hiding. -->
	<div class="chart__table">
		<table>
			<caption>{label}</caption>
			<thead>
				<tr>
					<th scope="col">{xName}</th>
					{#each series as s, i (i)}
						<th scope="col">{s.label}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as row, r (r)}
					<tr>
						<th scope="row">{row.x}</th>
						{#each row.values as value, i (i)}
							<td>{display(value)}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
