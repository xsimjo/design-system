<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
	import CardHeader from '$lib/components/card/CardHeader.svelte';
	import CardBody from '$lib/components/card/CardBody.svelte';
	import CardFooter from '$lib/components/card/CardFooter.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'padding', label: 'Padding', indent: true },
		{ id: 'compound', label: 'Compound', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Card - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Card"
		description="A surface container for grouping related content. Supports compound sub-components for structured layouts with header, body, and footer sections."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="variants" title="Variants">
			<p class="example-desc">
				Three visual styles: <code>default</code> (border), <code>outlined</code> (2× border
				weight), and <code>elevated</code> (drop shadow).
			</p>
			<CodeExample
				code={`<Card variant="default">
  <CardBody>Default card with a subtle border.</CardBody>
</Card>
<Card variant="outlined">
  <CardBody>Outlined card with a heavier border.</CardBody>
</Card>
<Card variant="elevated">
  <CardBody>Elevated card with a drop shadow.</CardBody>
</Card>`}
				previewClass="column"
			>
				<Card variant="default">
					<CardBody>Default card with a subtle border.</CardBody>
				</Card>
				<Card variant="outlined">
					<CardBody>Outlined card with a heavier border.</CardBody>
				</Card>
				<Card variant="elevated">
					<CardBody>Elevated card with a drop shadow.</CardBody>
				</Card>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="padding" title="Padding">
			<p class="example-desc">
				The <code>padding</code> prop controls the inner spacing of all sub-components. Accepted
				values: <code>none</code>, <code>sm</code>, <code>md</code> (default), <code>lg</code>.
			</p>
			<CodeExample
				code={`<Card padding="sm">
  <CardBody>Small padding.</CardBody>
</Card>
<Card padding="md">
  <CardBody>Medium padding (default).</CardBody>
</Card>
<Card padding="lg">
  <CardBody>Large padding.</CardBody>
</Card>`}
				previewClass="column"
			>
				<Card padding="sm">
					<CardBody>Small padding.</CardBody>
				</Card>
				<Card padding="md">
					<CardBody>Medium padding (default).</CardBody>
				</Card>
				<Card padding="lg">
					<CardBody>Large padding.</CardBody>
				</Card>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="compound" title="Compound">
			<p class="example-desc">
				Compose <code>CardHeader</code>, <code>CardBody</code>, and <code>CardFooter</code> for structured
				layouts. Dividers are added automatically between sections.
			</p>
			<CodeExample
				code={`<Card variant="elevated" style="max-width: 360px">
  <CardHeader>
    <div class="card-title-row">
      <strong>Project Alpha</strong>
      <Badge label="Active" variant="success" />
    </div>
  </CardHeader>
  <CardBody>
    <p>Deploy pipeline is green. Last run completed 4 minutes ago with no errors.</p>
  </CardBody>
  <CardFooter>
    <Button variant="filled" color="primary" size="sm">View logs</Button>
    <Button variant="ghost" color="neutral" size="sm">Dismiss</Button>
  </CardFooter>
</Card>`}
				previewClass="aligned"
			>
				<Card variant="elevated" style="max-width: 360px">
					<CardHeader>
						<div class="card-title-row">
							<strong>Project Alpha</strong>
							<Badge label="Active" variant="success" />
						</div>
					</CardHeader>
					<CardBody>
						<p style="margin: 0; font-size: 14px; line-height: 1.5">
							Deploy pipeline is green. Last run completed 4 minutes ago with no errors.
						</p>
					</CardBody>
					<CardFooter>
						<Button variant="filled" color="primary" size="sm">View logs</Button>
						<Button variant="ghost" color="neutral" size="sm">Dismiss</Button>
					</CardFooter>
				</Card>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Card Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'variant',
					"'default' | 'outlined' | 'elevated'",
					"'default'",
					'Visual style of the card surface'
				],
				[
					'padding',
					"'none' | 'sm' | 'md' | 'lg'",
					"'md'",
					'Inner spacing applied to all sub-components. Only takes effect when using CardHeader, CardBody, or CardFooter.'
				],
				['children', 'Snippet', 'required', 'Card content, typically sub-components']
			]}
		/>

		<PropsTable
			title="CardHeader / CardBody / CardFooter Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[['children', 'Snippet', 'required', 'Section content']]}
		/>

		<p class="api-note">
			All standard <code>HTMLDivElement</code> attributes are forwarded to the root element of each component.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--card-bg', 'var(--ui-surface-raised)', 'Card background color'],
				[
					'--card-foreground',
					'var(--ui-surface-raised-foreground)',
					'Card text color; override to change all inherited text inside the card'
				],
				['--card-border-color', 'var(--ui-border)', 'Border and divider color'],
				['--card-border-width', 'var(--ui-border-width)', 'Border width (2x for outlined variant)'],
				['--card-radius', 'var(--ui-base-radius)', 'Corner radius'],
				['--card-divider-color', 'var(--ui-border)', 'Color of dividers between sections'],
				['--card-shadow', 'var(--ui-depth)', 'Box shadow for the elevated variant'],
				['--card-padding-sm', 'calc(var(--ui-base-spacing) * 2)', 'Padding for padding="sm"'],
				['--card-padding-md', 'calc(var(--ui-base-spacing) * 4)', 'Padding for padding="md"'],
				['--card-padding-lg', 'calc(var(--ui-base-spacing) * 6)', 'Padding for padding="lg"'],
				['--card-footer-gap', 'calc(var(--ui-base-spacing) * 2)', 'Gap between items in CardFooter']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.card-title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
	}
</style>
