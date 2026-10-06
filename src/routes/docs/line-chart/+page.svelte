<script lang="ts">
	import { resolve } from '$app/paths';
	import LineChart from '$lib/components/chart/LineChart.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';
	import TokenTable from '$internal/TokenTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'multiple', label: 'Multiple series', indent: true },
		{ id: 'area', label: 'Area', indent: true },
		{ id: 'curves', label: 'Curves', indent: true },
		{ id: 'gaps', label: 'Missing values', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	const days = Array.from({ length: 60 }, (_, i) => ({
		date: new Date(2026, 7, 7 + i),
		visits: Math.round(1200 + 400 * Math.sin(i / 6) + 120 * Math.cos(i / 1.7) + i * 8)
	}));

	const latency = Array.from({ length: 24 }, (_, hour) => ({
		hour,
		p50: Math.round(80 + 20 * Math.sin(hour / 4)),
		p95: Math.round(180 + 60 * Math.sin(hour / 4) + (hour % 5) * 6),
		p99: Math.round(320 + 110 * Math.sin(hour / 4) + (hour % 3) * 14)
	}));

	const percentiles = [
		{ key: 'p50', label: 'p50' },
		{ key: 'p95', label: 'p95' },
		{ key: 'p99', label: 'p99' }
	] as const;

	const plans = [
		{ month: 'Jan', seats: 12 },
		{ month: 'Feb', seats: 12 },
		{ month: 'Mar', seats: 18 },
		{ month: 'Apr', seats: 18 },
		{ month: 'May', seats: 25 },
		{ month: 'Jun', seats: 31 }
	];

	const readings = [
		{ week: 'W1', temperature: 4 },
		{ week: 'W2', temperature: 6 },
		{ week: 'W3', temperature: null },
		{ week: 'W4', temperature: 9 },
		{ week: 'W5', temperature: 11 },
		{ week: 'W6', temperature: null },
		{ week: 'W7', temperature: 14 },
		{ week: 'W8', temperature: null },
		{ week: 'W9', temperature: 13 },
		{ week: 'W10', temperature: 15 }
	];

	const ms = (n: number) => `${n} ms`;
	const hourLabel = (value: string | number | Date) => `${String(value).padStart(2, '0')}:00`;
</script>

<svelte:head>
	<title>LineChart - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="LineChart"
		description="Lines over a continuous or categorical x-axis, one or more series. A crosshair follows the pointer and the arrow keys, and the tooltip lists every series at that point."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="Date x values give a time axis: ticks fall on calendar boundaries, and data is drawn in date order."
		>
			<CodeExample
				code={`<LineChart
	label="Daily visits"
	data={days}
	x="date"
	series={[{ key: 'visits', label: 'Visits' }]}
/>`}
				previewClass="stacked"
			>
				<LineChart
					label="Daily visits"
					data={days}
					x="date"
					series={[{ key: 'visits', label: 'Visits' }]}
				/>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="multiple"
			title="Multiple series"
			description="Number x values give a linear axis. formatX sets tick, tooltip and table text for x; formatValue does the same for values."
		>
			<CodeExample
				code={`<LineChart
	label="Response time by hour"
	data={latency}
	x="hour"
	xName="Hour"
	series={[
		{ key: 'p50', label: 'p50' },
		{ key: 'p95', label: 'p95' },
		{ key: 'p99', label: 'p99' }
	]}
	formatX={(hour) => \`\${String(hour).padStart(2, '0')}:00\`}
	formatValue={(n) => \`\${n} ms\`}
/>`}
				previewClass="stacked"
			>
				<LineChart
					label="Response time by hour"
					data={latency}
					x="hour"
					xName="Hour"
					series={percentiles}
					formatX={hourLabel}
					formatValue={ms}
				/>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="area"
			title="Area"
			description="area fills a soft wash between each line and zero, so the y-axis always includes zero."
		>
			<CodeExample
				code={`<LineChart
	label="Daily visits"
	data={days}
	x="date"
	series={[{ key: 'visits', label: 'Visits' }]}
	area
	curve="monotone"
/>`}
				previewClass="stacked"
			>
				<LineChart
					label="Daily visits"
					data={days}
					x="date"
					series={[{ key: 'visits', label: 'Visits' }]}
					area
					curve="monotone"
				/>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="curves"
			title="Curves"
			description="curve=&quot;step&quot; holds each value until the next point, for values that change in jumps. String x values are spaced evenly in the given order."
		>
			<CodeExample
				code={`<LineChart
	label="Paid seats"
	data={plans}
	x="month"
	series={[{ key: 'seats', label: 'Seats' }]}
	curve="step"
/>`}
				previewClass="stacked"
			>
				<LineChart
					label="Paid seats"
					data={plans}
					x="month"
					series={[{ key: 'seats', label: 'Seats' }]}
					curve="step"
				/>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="gaps"
			title="Missing values"
			description="null breaks the line rather than drawing through a value that does not exist. A point with no neighbor on either side is drawn as a dot."
		>
			<CodeExample
				code={`<LineChart
	label="Weekly average temperature, °C"
	data={readings}
	x="week"
	series={[{ key: 'temperature', label: 'Temperature' }]}
/>`}
				previewClass="stacked"
			>
				<LineChart
					label="Weekly average temperature, °C"
					data={readings}
					x="week"
					series={[{ key: 'temperature', label: 'Temperature' }]}
				/>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['data', 'T[]', '—', 'One datum per x value'],
				['x', 'ChartXKey<T>', '—', "Field holding each datum's x value"],
				[
					'series',
					'{ key: ChartValueKey<T>; label: string }[]',
					'—',
					'Plotted fields, in color order. At most 6'
				],
				['label', 'string', '—', 'Accessible name and table caption'],
				['curve', "'linear' | 'monotone' | 'step'", "'linear'", 'How points are joined'],
				['area', 'boolean', 'false', 'Fill between each line and zero'],
				['xName', 'string', 'x', 'Header of the x column in the hidden table'],
				[
					'formatX',
					'(value: string | number | Date) => string',
					'locale format',
					'x tick, tooltip and table text'
				],
				[
					'formatValue',
					'(value: number) => string',
					'locale number',
					'Tooltip and table value text'
				]
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			LineChart and BarChart share the <code>--chart-*</code> tokens. See
			<a href="{resolve('/docs/bar-chart')}#css-tokens">BarChart</a> for the series, frame and tooltip
			tokens.
		</p>

		<TokenTable
			component="chart"
			title="Lines"
			tokens={[
				['--chart-line-width', 'Line thickness'],
				['--chart-area-opacity', 'Opacity of the area wash'],
				['--chart-marker-radius', 'Radius of the hover and isolated-point dots'],
				['--chart-marker-ring-width', 'Width of the surface-colored ring around a dot'],
				['--chart-surface', 'Ring color; set it to the background the chart sits on'],
				['--chart-crosshair-color', 'Vertical line at the active point']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
