<script lang="ts">
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
		{ id: 'headings', label: 'Headings', indent: true },
		{ id: 'body', label: 'Body', indent: true },
		{ id: 'labels', label: 'Labels', indent: true },
		{ id: 'code', label: 'Code', indent: true },
		{ id: 'colors', label: 'Colors', indent: true },
		{ id: 'weight', label: 'Weight Override', indent: true },
		{ id: 'alignment', label: 'Alignment', indent: true },
		{ id: 'truncation', label: 'Truncation', indent: true },
		{ id: 'polymorphic', label: 'Polymorphic Element', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Typography - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Typography"
		description="Renders text with consistent sizing, weight, and color across your application. Maps semantic variants to HTML elements automatically with full override support."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="headings" title="Headings">
			<p class="example-desc">
				Six heading levels, each with its own size, weight, and letter-spacing. Renders the matching <code
					>h1</code
				>–<code>h6</code> element by default.
			</p>
			<CodeExample
				code={`<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>`}
				previewClass="column"
			>
				<Typography variant="h1">Heading 1</Typography>
				<Typography variant="h2">Heading 2</Typography>
				<Typography variant="h3">Heading 3</Typography>
				<Typography variant="h4">Heading 4</Typography>
				<Typography variant="h5">Heading 5</Typography>
				<Typography variant="h6">Heading 6</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="body" title="Body">
			<p class="example-desc">
				Four body sizes for paragraph text. Renders a <code>p</code> element by default.
			</p>
			<CodeExample
				code={`<Typography variant="body-lg">Body large — for lead paragraphs and emphasis.</Typography>
<Typography variant="body">Body — default reading size for content.</Typography>
<Typography variant="body-sm">Body small — for secondary text and captions.</Typography>
<Typography variant="body-xs">Body extra small — for fine print and metadata.</Typography>`}
				previewClass="column"
			>
				<Typography variant="body-lg">Body large — for lead paragraphs and emphasis.</Typography>
				<Typography variant="body">Body — default reading size for content.</Typography>
				<Typography variant="body-sm">Body small — for secondary text and captions.</Typography>
				<Typography variant="body-xs">Body extra small — for fine print and metadata.</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="labels" title="Labels">
			<p class="example-desc">
				Medium-weight inline text for labels, badges, and UI chrome. Renders a
				<code>span</code> by default.
			</p>
			<CodeExample
				code={`<Typography variant="label-lg">Label large</Typography>
<Typography variant="label">Label</Typography>
<Typography variant="label-sm">Label small</Typography>`}
				previewClass="column"
			>
				<Typography variant="label-lg">Label large</Typography>
				<Typography variant="label">Label</Typography>
				<Typography variant="label-sm">Label small</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="code" title="Code">
			<p class="example-desc">
				Inline code with monospace font and subtle background. Renders a <code>code</code>
				element.
			</p>
			<CodeExample
				code={`<Typography variant="body">
  Use the <Typography variant="code">Typography</Typography> component for consistent text styles.
</Typography>`}
				previewClass="column"
			>
				<Typography variant="body">
					Use the <Typography variant="code">Typography</Typography> component for consistent text styles.
				</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="colors" title="Colors">
			<p class="example-desc">
				Semantic color options using the <code>color</code> prop.
			</p>
			<CodeExample
				code={`<Typography variant="body" color="default">Default color</Typography>
<Typography variant="body" color="muted">Muted color</Typography>
<Typography variant="body" color="primary">Primary color</Typography>
<Typography variant="body" color="secondary">Secondary color</Typography>
<Typography variant="body" color="success">Success color</Typography>
<Typography variant="body" color="danger">Danger color</Typography>
<Typography variant="body" color="warning">Warning color</Typography>
<Typography variant="body" color="info">Info color</Typography>`}
				previewClass="column"
			>
				<Typography variant="body" color="default">Default color</Typography>
				<Typography variant="body" color="muted">Muted color</Typography>
				<Typography variant="body" color="primary">Primary color</Typography>
				<Typography variant="body" color="secondary">Secondary color</Typography>
				<Typography variant="body" color="success">Success color</Typography>
				<Typography variant="body" color="danger">Danger color</Typography>
				<Typography variant="body" color="warning">Warning color</Typography>
				<Typography variant="body" color="info">Info color</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="weight" title="Weight Override">
			<p class="example-desc">
				Override the default weight of any variant with the <code>weight</code> prop.
			</p>
			<CodeExample
				code={`<Typography variant="body" weight="normal">Normal weight</Typography>
<Typography variant="body" weight="medium">Medium weight</Typography>
<Typography variant="body" weight="semibold">Semibold weight</Typography>
<Typography variant="body" weight="bold">Bold weight</Typography>`}
				previewClass="column"
			>
				<Typography variant="body" weight="normal">Normal weight</Typography>
				<Typography variant="body" weight="medium">Medium weight</Typography>
				<Typography variant="body" weight="semibold">Semibold weight</Typography>
				<Typography variant="body" weight="bold">Bold weight</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="alignment" title="Alignment">
			<p class="example-desc">
				Control text alignment with the <code>align</code> prop.
			</p>
			<CodeExample
				code={`<Typography variant="body" align="left">Left aligned</Typography>
<Typography variant="body" align="center">Center aligned</Typography>
<Typography variant="body" align="right">Right aligned</Typography>`}
				previewClass="column"
			>
				<Typography variant="body" align="left">Left aligned</Typography>
				<Typography variant="body" align="center">Center aligned</Typography>
				<Typography variant="body" align="right">Right aligned</Typography>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="truncation" title="Truncation">
			<p class="example-desc">
				Truncate overflowing text with an ellipsis using the <code>truncate</code> prop.
			</p>
			<CodeExample
				code={`<Typography variant="body" truncate>
  This is a very long paragraph that will be truncated with an ellipsis when
  it overflows the container width. Useful for single-line previews.
</Typography>`}
			>
				<div style="max-width: 400px;">
					<Typography variant="body" truncate>
						This is a very long paragraph that will be truncated with an ellipsis when it overflows
						the container width. Useful for single-line previews.
					</Typography>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="polymorphic" title="Polymorphic Element">
			<p class="example-desc">
				Use the <code>as</code> prop to render a different HTML element while keeping the variant's visual
				style. Useful for semantic HTML without sacrificing design.
			</p>
			<CodeExample
				code={`<!-- Visually an h2, semantically an h3 -->
<Typography variant="h2" as="h3">Section title</Typography>

<!-- Visually a label, semantically a div -->
<Typography variant="label" as="div">Status</Typography>`}
				previewClass="column"
			>
				<Typography variant="h2" as="h3">Section title</Typography>
				<Typography variant="label" as="div">Status</Typography>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Typography Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'variant',
					"'h1' | 'h2' | ... | 'body' | 'body-sm' | 'label' | 'code'",
					"'body'",
					'Typographic style preset'
				],
				['as', 'string', 'Inferred from variant', 'Override the rendered HTML element'],
				[
					'color',
					"'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
					"'default'",
					'Text color'
				],
				[
					'weight',
					"'normal' | 'medium' | 'semibold' | 'bold'",
					'Inferred from variant',
					'Override the font weight'
				],
				['align', "'left' | 'center' | 'right'", 'undefined', 'Text alignment'],
				['truncate', 'boolean', 'false', 'Truncate with ellipsis on overflow'],
				['italic', 'boolean', 'false', 'Apply italic style'],
				['children', 'Snippet', 'required', 'Text content']
			]}
		/>

		<PropsTable
			title="Default Element Mapping"
			columns={['Variant', 'Element']}
			rows={[
				['h1–h6', '<h1>–<h6>'],
				['body-lg, body, body-sm, body-xs', '<p>'],
				['label-lg, label, label-sm', '<span>'],
				['code', '<code>']
			]}
		/>

		<p class="api-note">
			All standard <code>HTMLElement</code> attributes are forwarded to the root element.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			title="Heading Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--typography-h1-size', 'var(--ui-text-4xl)', 'H1 font size'],
				['--typography-h1-weight', 'var(--ui-weight-bold)', 'H1 font weight'],
				['--typography-h1-leading', 'var(--ui-leading-tight)', 'H1 line height'],
				['--typography-h1-tracking', '-0.025em', 'H1 letter spacing'],
				['--typography-h2-size', 'var(--ui-text-3xl)', 'H2 font size'],
				['--typography-h3-size', 'var(--ui-text-2xl)', 'H3 font size'],
				['--typography-h4-size', 'var(--ui-text-xl)', 'H4 font size']
			]}
		/>

		<PropsTable
			title="Body & Label Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--typography-body-lg-size', 'var(--ui-text-lg)', 'Body large font size'],
				['--typography-body-base-size', 'var(--ui-text-base)', 'Body base font size'],
				['--typography-body-sm-size', 'var(--ui-text-sm)', 'Body small font size'],
				['--typography-body-xs-size', 'var(--ui-text-xs)', 'Body extra-small font size'],
				['--typography-label-weight', 'var(--ui-weight-medium)', 'Label font weight']
			]}
		/>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--typography-color', 'var(--ui-surface-foreground)', 'Default text color'],
				[
					'--typography-color-muted',
					'color-mix(--ui-surface-foreground, transparent 40%)',
					'Muted text color'
				],
				['--typography-color-primary', 'var(--ui-primary)', 'Primary text color']
			]}
		/>

		<PropsTable
			title="Code Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--typography-code-font', 'var(--ui-font-mono)', 'Code font family'],
				[
					'--typography-code-bg',
					'color-mix(--ui-neutral, transparent 85%)',
					'Code background color'
				],
				['--typography-code-radius', 'calc(var(--ui-base-radius) * 0.5)', 'Code border radius']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
