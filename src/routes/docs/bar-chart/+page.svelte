<script lang="ts">
	import BarChart from '$lib/components/chart/BarChart.svelte';
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
		{ id: 'grouped', label: 'Grouped', indent: true },
		{ id: 'stacked', label: 'Stacked', indent: true },
		{ id: 'negative', label: 'Negative values', indent: true },
		{ id: 'many', label: 'Many bars', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	const week = [
		{ day: 'Mon', visits: 4 },
		{ day: 'Tue', visits: 7 },
		{ day: 'Wed', visits: 3 },
		{ day: 'Thu', visits: 0 },
		{ day: 'Fri', visits: 9 },
		{ day: 'Sat', visits: 12 },
		{ day: 'Sun', visits: 6 }
	];

	const quarters = [
		{ quarter: 'Q1', web: 420, ios: 310, android: 260 },
		{ quarter: 'Q2', web: 480, ios: 360, android: 300 },
		{ quarter: 'Q3', web: 450, ios: 420, android: 340 },
		{ quarter: 'Q4', web: 530, ios: 470, android: 390 }
	];

	const platforms = [
		{ key: 'web', label: 'Web' },
		{ key: 'ios', label: 'iOS' },
		{ key: 'android', label: 'Android' }
	] as const;

	const cashflow = [
		{ month: 'Jan', income: 12, expenses: -8 },
		{ month: 'Feb', income: 9, expenses: -11 },
		{ month: 'Mar', income: 14, expenses: -9 },
		{ month: 'Apr', income: 11, expenses: -13 },
		{ month: 'May', income: 16, expenses: -10 },
		{ month: 'Jun', income: 13, expenses: -12 }
	];

	const month = Array.from({ length: 30 }, (_, i) => ({
		day: `Sep ${i + 1}`,
		scans: Math.round(20 + 15 * Math.sin(i / 3) + (i % 4) * 3)
	}));

	const scans = (n: number) => `${n} ${n === 1 ? 'scan' : 'scans'}`;
</script>

<svelte:head>
	<title>BarChart - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="BarChart"
		description="Vertical bars over categories, one or more series, grouped or stacked. Hover or use the arrow keys to read every series at a category; a hidden table carries all values for screen readers."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="One series, one color, no legend: the surrounding heading names what is plotted."
		>
			<CodeExample
				code={`<BarChart
	label="Visits this week"
	data={week}
	x="day"
	series={[{ key: 'visits', label: 'Visits' }]}
/>`}
				previewClass="stacked"
			>
				<BarChart
					label="Visits this week"
					data={week}
					x="day"
					series={[{ key: 'visits', label: 'Visits' }]}
				/>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="grouped"
			title="Grouped"
			description="Several series sit side by side in each category, with a legend above the plot. Colors follow series order."
		>
			<CodeExample
				code={`<BarChart
	label="Active users by platform"
	data={quarters}
	x="quarter"
	series={[
		{ key: 'web', label: 'Web' },
		{ key: 'ios', label: 'iOS' },
		{ key: 'android', label: 'Android' }
	]}
/>`}
				previewClass="stacked"
			>
				<BarChart label="Active users by platform" data={quarters} x="quarter" series={platforms} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="stacked"
			title="Stacked"
			description="layout=&quot;stacked&quot; adds series into one bar per category, for part-to-whole totals."
		>
			<CodeExample
				code={`<BarChart
	label="Active users by platform"
	data={quarters}
	x="quarter"
	series={platforms}
	layout="stacked"
/>`}
				previewClass="stacked"
			>
				<BarChart
					label="Active users by platform"
					data={quarters}
					x="quarter"
					series={platforms}
					layout="stacked"
				/>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="negative"
			title="Negative values"
			description="Bars grow from zero in both directions; zero gets a stronger baseline."
		>
			<CodeExample
				code={`<BarChart
	label="Cash flow, thousands"
	data={cashflow}
	x="month"
	series={[
		{ key: 'income', label: 'Income' },
		{ key: 'expenses', label: 'Expenses' }
	]}
/>`}
				previewClass="stacked"
			>
				<BarChart
					label="Cash flow, thousands"
					data={cashflow}
					x="month"
					series={[
						{ key: 'income', label: 'Income' },
						{ key: 'expenses', label: 'Expenses' }
					]}
				/>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="many"
			title="Many bars"
			description="Labels that would overlap are thinned to every nth. formatValue sets the tooltip and table text; axis ticks stay plain numbers."
		>
			<CodeExample
				code={`<BarChart
	label="Scans per day"
	data={month}
	x="day"
	xName="Day"
	series={[{ key: 'scans', label: 'Scans' }]}
	formatValue={(n) => \`\${n} \${n === 1 ? 'scan' : 'scans'}\`}
/>`}
				previewClass="stacked"
			>
				<BarChart
					label="Scans per day"
					data={month}
					x="day"
					xName="Day"
					series={[{ key: 'scans', label: 'Scans' }]}
					formatValue={scans}
				/>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['data', 'T[]', '—', 'One datum per category, left to right'],
				['x', 'ChartXKey<T>', '—', "Field holding each datum's category"],
				[
					'series',
					'{ key: ChartValueKey<T>; label: string }[]',
					'—',
					'Plotted fields, in color order. At most 6'
				],
				['label', 'string', '—', 'Accessible name and table caption'],
				[
					'layout',
					"'grouped' | 'stacked'",
					"'grouped'",
					'Series side by side, or summed into one bar'
				],
				['xName', 'string', 'x', 'Header of the category column in the hidden table'],
				[
					'formatX',
					'(value: string | number | Date) => string',
					'locale format',
					'Category label text'
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
			BarChart and LineChart share the <code>--chart-*</code> tokens. Bar geometry is drawn in SVG, so
			the bar tokens must be plain pixel lengths.
		</p>

		<TokenTable
			component="chart"
			title="Bars"
			tokens={[
				['--chart-bar-max-width', 'Widest a bar may be'],
				['--chart-bar-gap', 'Space between grouped bars and between stacked segments'],
				['--chart-bar-radius', "Radius of the bar's data end"],
				['--chart-wash', 'Fill behind the active category']
			]}
		/>

		<TokenTable
			component="chart"
			title="Series"
			tokens={[
				['--chart-series-1', 'First series'],
				['--chart-series-2', 'Second series'],
				['--chart-series-3', 'Third series'],
				['--chart-series-4', 'Fourth series'],
				['--chart-series-5', 'Fifth series'],
				['--chart-series-6', 'Sixth series'],
				['--chart-series-other', 'Every series past the sixth']
			]}
		/>

		<TokenTable
			component="chart"
			title="Frame"
			tokens={[
				['--chart-height', 'Height of the plot, excluding legend and x-axis'],
				['--chart-gap', 'Space between legend, plot and table'],
				['--chart-grid-color', 'Gridline color'],
				['--chart-grid-width', 'Gridline and baseline thickness'],
				['--chart-baseline-color', 'Zero line color'],
				['--chart-axis-font-size', 'Tick label font size'],
				['--chart-axis-color', 'Tick label color'],
				['--chart-legend-font-size', 'Legend font size'],
				['--chart-legend-color', 'Legend text color'],
				['--chart-focus-ring', 'Outline of the plot on keyboard focus']
			]}
		/>

		<TokenTable
			component="chart"
			title="Tooltip"
			tokens={[
				['--chart-tooltip-bg', 'Background'],
				['--chart-tooltip-color', 'Value text color'],
				['--chart-tooltip-muted-color', 'Category and series name color'],
				['--chart-tooltip-border', 'Border'],
				['--chart-tooltip-radius', 'Corner radius'],
				['--chart-tooltip-shadow', 'Shadow'],
				['--chart-tooltip-font-size', 'Font size'],
				['--chart-tooltip-value-weight', 'Value font weight']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
