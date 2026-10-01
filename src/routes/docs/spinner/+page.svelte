<script lang="ts">
	import Spinner from '$lib/components/spinner/Spinner.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'adaptive', label: 'Adaptive', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Spinner - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Spinner"
		description="A loading indicator to show that content is being loaded or processed. Adaptive by default, inheriting size and color from its parent."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="adaptive"
			title="Adaptive (Default)"
			description="Without props, the spinner inherits size from font-size and color from parent."
		>
			<CodeExample
				code={`<span style="font-size: 14px"><Spinner /> Small</span>
<span style="font-size: 18px"><Spinner /> Medium</span>
<span style="font-size: 24px"><Spinner /> Large</span>`}
				previewClass="aligned"
			>
				<span class="adaptive adaptive--sm"><Spinner /> Small</span>
				<span class="adaptive adaptive--md"><Spinner /> Medium</span>
				<span class="adaptive adaptive--lg"><Spinner /> Large</span>
			</CodeExample>

			<CodeExample
				code={`<span style="color: var(--ui-primary)"><Spinner /> Primary</span>
<span style="color: var(--ui-success)"><Spinner /> Success</span>
<span style="color: var(--ui-danger)"><Spinner /> Danger</span>`}
				previewClass="aligned"
			>
				<span class="adaptive" style="color: var(--ui-primary)"><Spinner /> Primary</span>
				<span class="adaptive" style="color: var(--ui-success)"><Spinner /> Success</span>
				<span class="adaptive" style="color: var(--ui-danger)"><Spinner /> Danger</span>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="sizes"
			title="Fixed Sizes"
			description="Use size prop to set a fixed spinner size."
		>
			<CodeExample
				code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
				previewClass="aligned"
			>
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="variants"
			title="Color Variants"
			description="Semantic color variants for different contexts."
		>
			<CodeExample
				code={`<Spinner size="md" variant="primary" />
<Spinner size="md" variant="secondary" />
<Spinner size="md" variant="accent" />
<Spinner size="md" variant="success" />
<Spinner size="md" variant="warning" />
<Spinner size="md" variant="danger" />`}
				previewClass="aligned"
			>
				<Spinner size="md" variant="primary" />
				<Spinner size="md" variant="secondary" />
				<Spinner size="md" variant="accent" />
				<Spinner size="md" variant="success" />
				<Spinner size="md" variant="warning" />
				<Spinner size="md" variant="danger" />
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['size', "'sm' | 'md' | 'lg'", '\u2014', 'Fixed spinner size'],
				[
					'variant',
					"'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'",
					'\u2014',
					'Color variant'
				],
				['label', 'string', "'Loading'", 'Accessible label for screen readers']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">Customize the spinner appearance through CSS variables.</p>

		<PropsTable
			title="Size Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--spinner-sm-size', '16px', 'Small spinner size'],
				['--spinner-md-size', '24px', 'Medium spinner size'],
				['--spinner-lg-size', '32px', 'Large spinner size'],
				['--spinner-sm-border-width', '2px', 'Small border thickness'],
				['--spinner-md-border-width', '3px', 'Medium border thickness'],
				['--spinner-lg-border-width', '4px', 'Large border thickness']
			]}
		/>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--spinner-track-color', 'var(--color-border)', 'Track (background) color'],
				['--spinner-color-primary', 'var(--ui-primary)', 'Primary variant color'],
				['--spinner-color-secondary', 'var(--color-secondary)', 'Secondary variant color'],
				['--spinner-color-accent', 'var(--ui-accent)', 'Accent variant color'],
				['--spinner-color-success', 'var(--ui-success)', 'Success variant color'],
				['--spinner-color-warning', 'var(--color-warning)', 'Warning variant color'],
				['--spinner-color-danger', 'var(--ui-danger)', 'Danger variant color']
			]}
		/>

		<PropsTable
			title="Animation Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--spinner-duration', '800ms', 'Animation duration'],
				['--spinner-timing', 'linear', 'Animation timing function']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.adaptive {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.adaptive--sm {
		font-size: var(--ui-text-sm);
	}

	.adaptive--md {
		font-size: var(--ui-text-lg);
	}

	.adaptive--lg {
		font-size: var(--font-size-2xl);
	}
</style>
