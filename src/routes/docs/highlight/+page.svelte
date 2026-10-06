<script lang="ts">
	import Highlight from '$lib/components/highlight/Highlight.svelte';
	import Typography from '$lib/components/typography/Typography.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'solid', label: 'Solid', indent: true },
		{ id: 'soft', label: 'Soft', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>Highlight - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Highlight"
		description="Inline emphasis for the few words a reader must not miss, such as a price or a limit. Renders a mark element."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="solid" title="Solid" description="Inverts the text. The default.">
			<CodeExample
				code="<Typography variant=&quot;h3&quot;>Dynamic codes for <Highlight>$3 a month</Highlight>.</Typography>"
			>
				<Typography variant="h3">Dynamic codes for <Highlight>$3 a month</Highlight>.</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="soft"
			title="Soft"
			description="Tints behind the text and sets it in the primary color, so it stands out from muted copy."
		>
			<CodeExample
				code="<Typography>No scan caps, <Highlight variant=&quot;soft&quot;>no code limits</Highlight>.</Typography>"
			>
				<Typography>No scan caps, <Highlight variant="soft">no code limits</Highlight>.</Typography>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Highlight Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['variant', "'solid' | 'soft'", "'solid'", 'solid inverts the text; soft tints behind it'],
				['children', 'Snippet', 'required', 'The highlighted text']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
