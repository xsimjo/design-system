<script lang="ts">
	import Breadcrumbs from '$lib/components/breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/breadcrumbs/BreadcrumbItem.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'default', label: 'Default', indent: true },
		{ id: 'slash', label: 'Slash Separator', indent: true },
		{ id: 'single', label: 'Single Level', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Breadcrumbs - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Breadcrumbs"
		description="Hierarchical navigation trail showing the user's current location within a site."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="default" title="Default">
			<p class="example-desc">
				Uses a chevron separator. The last item has no <code>href</code> and is marked as the current
				page.
			</p>
			<CodeExample
				code={`<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Wireless Headphones</BreadcrumbItem>
</Breadcrumbs>`}
				previewClass="column"
			>
				<Breadcrumbs>
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					<BreadcrumbItem href="/products">Products</BreadcrumbItem>
					<BreadcrumbItem>Wireless Headphones</BreadcrumbItem>
				</Breadcrumbs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="slash" title="Slash Separator">
			<p class="example-desc">
				Set <code>separator="slash"</code> for a text <code>/</code> divider, common in file paths and
				URL-style navigation.
			</p>
			<CodeExample
				code={`<Breadcrumbs separator="slash">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
</Breadcrumbs>`}
				previewClass="column"
			>
				<Breadcrumbs separator="slash">
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
					<BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
					<BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
				</Breadcrumbs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="single"
			title="Single Level"
			description="A single item with no separator — useful when the page is at the root or the trail has only one visible crumb."
		>
			<CodeExample
				code={`<Breadcrumbs>
  <BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumbs>`}
				previewClass="column"
			>
				<Breadcrumbs>
					<BreadcrumbItem>Dashboard</BreadcrumbItem>
				</Breadcrumbs>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Breadcrumbs Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['separator', "'chevron' | 'slash'", "'chevron'", 'Separator rendered between items'],
				['children', 'Snippet', 'required', 'One or more BreadcrumbItem elements']
			]}
		/>
		<p class="api-note">
			All standard <code>HTMLElement</code> attributes are forwarded to the root
			<code>&lt;nav&gt;</code>
			element.
		</p>

		<PropsTable
			title="BreadcrumbItem Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'href',
					'string',
					'undefined',
					'When provided, renders the item as a link. Omit for the current page.'
				],
				['children', 'Snippet', 'required', 'Label content for the item']
			]}
		/>
		<p class="api-note">
			All standard <code>HTMLLIElement</code> attributes are forwarded to the root
			<code>&lt;li&gt;</code> element.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="example-desc">
			Link items use <code>Button</code> CSS classes (<code
				>button--link button--secondary button--sm</code
			>) and inherit all button link token overrides.
		</p>
		<PropsTable
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--breadcrumbs-font-size', 'var(--ui-text-sm)', 'Font size of all items'],
				[
					'--breadcrumbs-gap',
					'calc(var(--ui-base-spacing) * 3)',
					'Gap between items and separators'
				],
				['--breadcrumbs-current-color', 'var(--ui-surface-foreground)', 'Current page text color'],
				[
					'--breadcrumbs-separator-color',
					'color-mix(in oklch, var(--ui-surface-foreground), transparent 60%)',
					'Separator icon/text color'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
