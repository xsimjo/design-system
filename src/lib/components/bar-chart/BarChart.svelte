<script lang="ts" module>
	export type BarChartDatum = { label: string; value: number };
</script>

<script lang="ts">
	import './bar-chart.css';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		data: BarChartDatum[];
		label: string;
		categoryName?: string;
		valueName?: string;
		formatValue?: (value: number) => string;
	}

	const number = new Intl.NumberFormat();

	let {
		data,
		label,
		categoryName = 'Label',
		valueName = 'Value',
		formatValue = (value) => number.format(value),
		class: className = '',
		...restProps
	}: Props = $props();

	let active = $state<number | null>(null);

	const max = $derived(Math.max(0, ...data.map((d) => d.value)));
	const integers = $derived(data.every((d) => Number.isInteger(d.value)));

	const ticks = $derived.by(() => {
		if (max === 0) return [0, 1];
		const raw = max / 3;
		const magnitude = 10 ** Math.floor(Math.log10(raw));
		const norm = raw / magnitude;
		let step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * magnitude;
		if (integers) step = Math.max(1, Math.round(step));
		const top = Math.ceil(max / step) * step;
		const result: number[] = [];
		for (let t = 0; t <= top + step / 2; t += step) result.push(t);
		return result;
	});

	const top = $derived(ticks[ticks.length - 1]);
	const shown = $derived(active ?? data.length - 1);
	const allLabels = $derived(data.length <= 12);

	function onkeydown(event: KeyboardEvent) {
		if (!data.length) return;
		const current = active ?? data.length - 1;
		const next = {
			ArrowLeft: current - 1,
			ArrowRight: current + 1,
			Home: 0,
			End: data.length - 1
		}[event.key];
		if (next === undefined) return;
		event.preventDefault();
		active = Math.min(data.length - 1, Math.max(0, next));
	}
</script>

<div class="bar-chart {className}" {...restProps}>
	<p class="bar-chart__readout" aria-hidden="true">
		{#if data[shown]}
			<span class="bar-chart__readout-value">{formatValue(data[shown].value)}</span>
			<span class="bar-chart__readout-label">{data[shown].label}</span>
		{/if}
	</p>

	<div class="bar-chart__body">
		<div class="bar-chart__ticks" aria-hidden="true">
			<span class="bar-chart__tick-sizer">{number.format(top)}</span>
			{#each ticks as tick (tick)}
				<span class="bar-chart__tick" style:bottom="{(tick / top) * 100}%"
					>{number.format(tick)}</span
				>
			{/each}
		</div>

		<div
			class="bar-chart__plot"
			role="slider"
			aria-roledescription="bar chart"
			aria-label={label}
			aria-orientation="horizontal"
			aria-valuemin={0}
			aria-valuemax={Math.max(0, data.length - 1)}
			aria-valuenow={shown}
			aria-valuetext={data[shown]
				? `${data[shown].label}: ${formatValue(data[shown].value)}`
				: undefined}
			tabindex="0"
			{onkeydown}
			onpointerleave={() => (active = null)}
			onblur={() => (active = null)}
		>
			{#each ticks as tick (tick)}
				<span class="bar-chart__grid" style:bottom="{(tick / top) * 100}%" aria-hidden="true"
				></span>
			{/each}
			{#each data as datum, i (i)}
				<span
					class="bar-chart__slot"
					class:bar-chart__slot--active={active === i}
					aria-hidden="true"
					onpointerenter={() => (active = i)}
					onpointerdown={() => (active = i)}
				>
					{#if datum.value > 0}
						<span class="bar-chart__bar" style:height="{(datum.value / top) * 100}%"></span>
					{/if}
				</span>
			{/each}
		</div>

		<div class="bar-chart__labels" class:bar-chart__labels--ends={!allLabels} aria-hidden="true">
			{#if allLabels}
				{#each data as datum, i (i)}
					<span class="bar-chart__label">{datum.label}</span>
				{/each}
			{:else if data.length}
				<span class="bar-chart__label">{data[0].label}</span>
				<span class="bar-chart__label">{data[data.length - 1].label}</span>
			{/if}
		</div>
	</div>

	<!-- A table grows to fit its rows whatever its height, so a block does the hiding. -->
	<div class="bar-chart__table">
		<table>
			<caption>{label}</caption>
			<thead>
				<tr>
					<th scope="col">{categoryName}</th>
					<th scope="col">{valueName}</th>
				</tr>
			</thead>
			<tbody>
				{#each data as datum, i (i)}
					<tr>
						<th scope="row">{datum.label}</th>
						<td>{formatValue(datum.value)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
