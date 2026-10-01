<script lang="ts">
	import Badge from '$lib/components/badge/Badge.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

	const basicCode = '<Badge label="Design" />';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'removable', label: 'Removable', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>Badge - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Badge"
		description="Dismissible chip/tag element. Renders a label with an optional remove button. Used standalone and consumed internally by MultiSelect and BadgeInput."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="A simple label badge with no remove button."
		>
			<CodeExample code={basicCode}>
				<Badge label="Design" />
				<Badge label="System" />
				<Badge label="Components" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="variants"
			title="Variants"
			description="Eight color variants matching the design system palette."
		>
			<CodeExample
				code={`<Badge label="Primary" variant="primary" />
<Badge label="Secondary" variant="secondary" />
<Badge label="Accent" variant="accent" />
<Badge label="Success" variant="success" />
<Badge label="Danger" variant="danger" />
<Badge label="Warning" variant="warning" />
<Badge label="Info" variant="info" />
<Badge label="Neutral" variant="neutral" />`}
			>
				<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
					<Badge label="Primary" variant="primary" />
					<Badge label="Secondary" variant="secondary" />
					<Badge label="Accent" variant="accent" />
					<Badge label="Success" variant="success" />
					<Badge label="Danger" variant="danger" />
					<Badge label="Warning" variant="warning" />
					<Badge label="Info" variant="info" />
					<Badge label="Neutral" variant="neutral" />
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="sizes" title="Sizes">
			<p class="example-desc">Three sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</p>
			<CodeExample
				code={`<Badge label="Small" size="sm" />
<Badge label="Medium" size="md" />
<Badge label="Large" size="lg" />`}
			>
				<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
					<Badge label="Small" size="sm" />
					<Badge label="Medium" size="md" />
					<Badge label="Large" size="lg" />
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="removable" title="Removable">
			<p class="example-desc">
				Pass an <code>onremove</code> callback to show a remove button.
			</p>
			<CodeExample
				code={`<Badge label="React" onremove={() => console.log('removed')} />
<Badge label="TypeScript" onremove={() => console.log('removed')} />`}
			>
				<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
					<Badge label="React" onremove={() => {}} />
					<Badge label="TypeScript" onremove={() => {}} />
					<Badge label="Svelte" onremove={() => {}} />
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="disabled" title="Disabled">
			<p class="example-desc">
				Set <code>disabled</code> to prevent removal and apply muted styling.
			</p>
			<CodeExample
				code={`<Badge label="Disabled" disabled onremove={() => console.log('removed')} />`}
			>
				<div style="display: flex; align-items: center; gap: 8px;">
					<Badge label="Active" onremove={() => {}} />
					<Badge label="Disabled" disabled onremove={() => {}} />
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Badge Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['label', 'string', 'required', 'Text content of the badge'],
				[
					'variant',
					"'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'",
					"'primary'",
					'Color variant of the badge'
				],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls height, padding, and font size'],
				['disabled', 'boolean', 'false', 'Mutes badge and disables remove button'],
				[
					'onremove',
					'() => void',
					'undefined',
					'When defined, shows a remove button that calls this on click'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
