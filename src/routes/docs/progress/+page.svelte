<script lang="ts">
	import Progress from '$lib/components/progress/Progress.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'show-value', label: 'Show Value', indent: true },
		{ id: 'indeterminate', label: 'Indeterminate', indent: true },
		{ id: 'custom-max', label: 'Custom Max', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Progress - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Progress"
		description="A progress bar for displaying task completion or loading status. Supports determinate and indeterminate modes, multiple sizes, and semantic color variants."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="A simple progress bar at 60% completion.">
			<CodeExample code={`<Progress value={60} />`} previewClass="stacked">
				<Progress value={60} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="sizes"
			title="Sizes"
			description="Four height variants for different visual weights."
		>
			<CodeExample
				code={`<Progress value={60} size="xs" />
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`}
				previewClass="stacked"
			>
				<Progress value={60} size="xs" />
				<Progress value={60} size="sm" />
				<Progress value={60} size="md" />
				<Progress value={60} size="lg" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="variants"
			title="Color Variants"
			description="Semantic color variants to communicate context."
		>
			<CodeExample
				code={`<Progress value={80} variant="primary" />
<Progress value={70} variant="accent" />
<Progress value={65} variant="success" />
<Progress value={30} variant="danger" />
<Progress value={55} variant="warning" />
<Progress value={45} variant="info" />
<Progress value={50} variant="neutral" />`}
				previewClass="stacked"
			>
				<Progress value={80} variant="primary" />
				<Progress value={70} variant="accent" />
				<Progress value={65} variant="success" />
				<Progress value={30} variant="danger" />
				<Progress value={55} variant="warning" />
				<Progress value={45} variant="info" />
				<Progress value={50} variant="neutral" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="show-value"
			title="Show Value"
			description="Display the percentage above the bar for explicit feedback."
		>
			<CodeExample
				code={`<Progress value={72} showValue label="Upload progress" />
<Progress value={45} variant="success" showValue label="Tasks complete" />`}
				previewClass="stacked"
			>
				<Progress value={72} showValue label="Upload progress" />
				<Progress value={45} variant="success" showValue label="Tasks complete" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="indeterminate"
			title="Indeterminate"
			description="Use when the total duration or completion is unknown, such as during a fetch."
		>
			<CodeExample
				code={`<Progress indeterminate label="Loading content" />
<Progress indeterminate variant="success" size="sm" label="Syncing" />`}
				previewClass="stacked"
			>
				<Progress indeterminate label="Loading content" />
				<Progress indeterminate variant="success" size="sm" label="Syncing" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="custom-max" title="Custom Max">
			<p class="example-desc">Use a custom <code>max</code> value for non-percentage scales.</p>
			<CodeExample
				code={`<Progress value={3} max={10} showValue label="Step 3 of 10" />
<Progress value={7} max={10} variant="success" showValue label="Step 7 of 10" />`}
				previewClass="stacked"
			>
				<Progress value={3} max={10} showValue label="Step 3 of 10" />
				<Progress value={7} max={10} variant="success" showValue label="Step 7 of 10" />
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'number', '0', 'Current progress value'],
				['max', 'number', '100', 'Maximum value'],
				['size', "'xs' | 'sm' | 'md' | 'lg'", "'md'", 'Height of the progress bar'],
				[
					'variant',
					"'primary' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'",
					"'primary'",
					'Fill color variant'
				],
				['label', 'string', "'Progress'", 'Accessible label for screen readers'],
				['showValue', 'boolean', 'false', 'Display percentage text above the bar'],
				['indeterminate', 'boolean', 'false', 'Animated indeterminate state for unknown progress']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">Customize the progress bar through CSS variables.</p>

		<PropsTable
			title="Size Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--progress-height-xs', '2px', 'Track height for extra-small size'],
				['--progress-height-sm', '4px', 'Track height for small size'],
				['--progress-height-md', '8px', 'Track height for medium size'],
				['--progress-height-lg', '12px', 'Track height for large size'],
				['--progress-border-radius', '9999px', 'Border radius of track and fill']
			]}
		/>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				[
					'--progress-track-color',
					'neutral @ 75% transparent',
					'Background (unfilled) track color'
				],
				['--progress-fill-primary', 'var(--ui-primary)', 'Fill color for primary variant'],
				['--progress-fill-accent', 'var(--ui-accent)', 'Fill color for accent variant'],
				['--progress-fill-success', 'var(--ui-success)', 'Fill color for success variant'],
				['--progress-fill-danger', 'var(--ui-danger)', 'Fill color for danger variant'],
				['--progress-fill-warning', 'var(--ui-warning)', 'Fill color for warning variant'],
				['--progress-fill-info', 'var(--ui-info)', 'Fill color for info variant'],
				['--progress-fill-neutral', 'var(--ui-neutral)', 'Fill color for neutral variant']
			]}
		/>

		<PropsTable
			title="Animation Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--progress-transition-duration', '150ms', 'Width transition duration'],
				['--progress-transition-easing', 'ease', 'Width transition easing function'],
				['--progress-indeterminate-duration', '1.5s', 'Indeterminate animation duration']
			]}
		/>

		<PropsTable
			title="Label Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--progress-value-font-size', 'var(--ui-text-sm)', 'Font size of the percentage label'],
				[
					'--progress-value-color',
					'surface-foreground @ 30% transparent',
					'Text color of the percentage label'
				],
				[
					'--progress-value-font-weight',
					'var(--ui-weight-medium)',
					'Font weight of the percentage label'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
