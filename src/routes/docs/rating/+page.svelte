<script lang="ts">
	import Rating from '$lib/components/rating/Rating.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'readonly', label: 'Readonly', indent: true },
		{ id: 'custom-max', label: 'Custom Max', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let rating = $state(3);
</script>

<svelte:head>
	<title>Rating - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Rating"
		description="A star rating widget for collecting or displaying a numeric score. Supports hover previews, keyboard navigation (arrow keys, Home, End), readonly display mode, and optional form submission via a hidden input."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Bind to <code>value</code> to track the selected rating. Clicking an already-selected star deselects
				it.
			</p>
			<CodeExample code={`<Rating bind:value={rating} />`}>
				<Rating bind:value={rating} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="readonly" title="Readonly">
			<p class="example-desc">
				Use <code>readonly</code> to display a fixed rating without interaction.
			</p>
			<CodeExample
				code={`<Rating value={1} readonly />
<Rating value={2} readonly />
<Rating value={3} readonly />
<Rating value={4} readonly />
<Rating value={5} readonly />`}
				previewClass="column"
			>
				<Rating value={1} readonly />
				<Rating value={2} readonly />
				<Rating value={3} readonly />
				<Rating value={4} readonly />
				<Rating value={5} readonly />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="custom-max" title="Custom Max">
			<p class="example-desc">Adjust <code>max</code> for a different number of stars.</p>
			<CodeExample
				code={`<Rating value={3} max={3} readonly />
<Rating value={7} max={10} readonly />`}
				previewClass="column"
			>
				<Rating value={3} max={3} readonly />
				<Rating value={7} max={10} readonly />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="disabled"
			title="Disabled"
			description="Disabled ratings prevent interaction and apply 50% opacity."
		>
			<CodeExample code={`<Rating value={3} disabled />`}>
				<Rating value={3} disabled />
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Rating Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'number', '0', 'Bindable selected rating (0 = none, 1–max = selected)'],
				['max', 'number', '5', 'Total number of stars'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls star icon size (16px / 24px / 32px)'],
				['readonly', 'boolean', 'false', 'Disables interaction; stars are display-only'],
				['disabled', 'boolean', 'false', 'Prevents interaction and applies 50% opacity'],
				['label', 'string', "'Rating'", 'Accessible label for the radiogroup container'],
				['name', 'string', '—', 'When set, renders a hidden input for form submission']
			]}
		/>

		<PropsTable
			title="Keyboard Navigation"
			columns={['Key', 'Action']}
			rows={[
				['ArrowRight / ArrowUp', 'Increase rating by 1'],
				['ArrowLeft / ArrowDown', 'Decrease rating by 1 (minimum 0)'],
				['Home', 'Set to 1 star, focus first star'],
				['End', 'Set to max stars, focus last star'],
				['Click on active star', 'Deselect (sets value to 0)']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Rating to your brand or to create specialized variants.
		</p>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--rating-star-color', 'var(--ui-warning)', 'Filled star color'],
				['--rating-star-empty-color', 'var(--ui-border)', 'Empty (unselected) star color'],
				['--rating-star-hover-color', 'var(--ui-warning)', 'Star color on hover preview'],
				['--rating-focus-color', 'var(--ui-primary)', 'Focus ring color'],
				['--rating-focus-ring-width', 'var(--ui-ring-width)', 'Focus ring width'],
				['--rating-focus-ring-offset', 'var(--ui-ring-offset)', 'Focus ring offset']
			]}
		/>

		<PropsTable
			title="Size Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--rating-star-size-sm', '16px', 'Star icon size for sm'],
				['--rating-star-size-md', '24px', 'Star icon size for md'],
				['--rating-star-size-lg', '32px', 'Star icon size for lg']
			]}
		/>

		<PropsTable
			title="Style Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--rating-gap', '2px', 'Gap between stars'],
				['--rating-stroke-width', '1.5', 'SVG stroke width for star outline'],
				[
					'--rating-transition',
					'var(--ui-base-duration) var(--ui-base-easing)',
					'Color and scale transition'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
