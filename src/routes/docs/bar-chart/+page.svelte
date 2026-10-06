<script lang="ts">
	import BarChart from '$lib/components/bar-chart/BarChart.svelte';
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
		{ id: 'many', label: 'Many bars', indent: true },
		{ id: 'format', label: 'Formatted values', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
		label,
		value: [4, 7, 3, 0, 9, 12, 6][i]
	}));

	const month = Array.from({ length: 30 }, (_, i) => ({
		label: `Sep ${i + 1}`,
		value: Math.round(20 + 15 * Math.sin(i / 3) + (i % 4) * 3)
	}));
</script>

<svelte:head>
	<title>BarChart - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="BarChart"
		description="A single-series column chart for counts over a short run of categories. A readout above the plot follows the pointer and the arrow keys, and a hidden table carries every value for screen readers."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="Up to 12 bars, every bar is labeled.">
			<CodeExample
				code={`<BarChart label="Visits this week" data={week} />`}
				previewClass="stacked"
			>
				<BarChart label="Visits this week" data={week} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="many"
			title="Many bars"
			description="Past 12 bars, only the first and last are labeled. Hover or use the arrow keys to read the rest."
		>
			<CodeExample code={`<BarChart label="Visits per day" data={month} />`} previewClass="stacked">
				<BarChart label="Visits per day" data={month} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="format"
			title="Formatted values"
			description="formatValue sets the readout and table text. Axis ticks stay plain numbers."
		>
			<CodeExample
				code={`<BarChart
	label="Scans per day"
	categoryName="Day"
	valueName="Scans"
	data={week}
	formatValue={(n) => \`\${n} \${n === 1 ? 'scan' : 'scans'}\`}
/>`}
				previewClass="stacked"
			>
				<BarChart
					label="Scans per day"
					categoryName="Day"
					valueName="Scans"
					data={week}
					formatValue={(n) => `${n} ${n === 1 ? 'scan' : 'scans'}`}
				/>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['data', '{ label: string; value: number }[]', '—', 'Bars in order, left to right'],
				['label', 'string', '—', 'Accessible name and table caption'],
				['categoryName', 'string', "'Label'", 'Header of the label column in the hidden table'],
				['valueName', 'string', "'Value'", 'Header of the value column in the hidden table'],
				['formatValue', '(value: number) => string', 'locale number', 'Readout and table text']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">Customize the chart through CSS variables.</p>

		<TokenTable
			component="bar-chart"
			tokens={[
				['--bar-chart-height', 'Height of the plot'],
				['--bar-chart-bar-color', 'Bar fill'],
				['--bar-chart-bar-active-color', 'Bar fill under the pointer or keyboard'],
				['--bar-chart-bar-max-width', 'Widest a bar may be'],
				['--bar-chart-bar-radius', "Radius of the bar's top corners"],
				['--bar-chart-bar-gap', 'Space between neighboring bars'],
				['--bar-chart-slot-active-bg', "Wash behind the active bar's slot"]
			]}
		/>

		<TokenTable
			component="bar-chart"
			tokens={[
				['--bar-chart-grid-color', 'Gridline color'],
				['--bar-chart-grid-width', 'Gridline thickness'],
				['--bar-chart-axis-font-size', 'Tick and label font size'],
				['--bar-chart-axis-color', 'Tick and label color'],
				['--bar-chart-focus-ring', 'Outline of the plot on keyboard focus']
			]}
		/>

		<TokenTable
			component="bar-chart"
			tokens={[
				['--bar-chart-readout-value-font-size', 'Readout value font size'],
				['--bar-chart-readout-value-font-weight', 'Readout value font weight'],
				['--bar-chart-readout-value-color', 'Readout value color'],
				['--bar-chart-readout-label-font-size', 'Readout label font size'],
				['--bar-chart-readout-label-color', 'Readout label color']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
