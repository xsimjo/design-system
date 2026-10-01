<script lang="ts">
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'rect', label: 'Rectangle', indent: true },
		{ id: 'circle', label: 'Circle', indent: true },
		{ id: 'text', label: 'Text Lines', indent: true },
		{ id: 'composed', label: 'Composed', indent: true },
		{ id: 'static', label: 'Static', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Skeleton - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Skeleton"
		description="Loading placeholder that mimics the shape of content before it loads. Renders a pulsing shimmer animation to prevent layout shift."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="rect" title="Rectangle">
			<p class="example-desc">
				Default <code>shape="rect"</code>. Use <code>width</code> and <code>height</code> to size the
				block.
			</p>
			<CodeExample
				code={`<Skeleton height="48px" />
<Skeleton width="60%" height="24px" />
<Skeleton width="120px" height="120px" />`}
				previewClass="column"
			>
				<Skeleton height="48px" />
				<Skeleton width="60%" height="24px" />
				<Skeleton width="120px" height="120px" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="circle" title="Circle">
			<p class="example-desc">
				Use <code>shape="circle"</code> for avatar and icon placeholders. Set equal
				<code>width</code> and <code>height</code>.
			</p>
			<CodeExample
				code={`<Skeleton shape="circle" width="32px" height="32px" />
<Skeleton shape="circle" width="40px" height="40px" />
<Skeleton shape="circle" width="56px" height="56px" />
<Skeleton shape="circle" width="72px" height="72px" />`}
				previewClass="row"
			>
				<Skeleton shape="circle" width="32px" height="32px" />
				<Skeleton shape="circle" width="40px" height="40px" />
				<Skeleton shape="circle" width="56px" height="56px" />
				<Skeleton shape="circle" width="72px" height="72px" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="text" title="Text Lines">
			<p class="example-desc">
				Use <code>shape="text"</code> to render multiple line placeholders. The last line is shorter to
				mimic natural text.
			</p>
			<CodeExample
				code={`<Skeleton shape="text" lines={2} />
<Skeleton shape="text" lines={4} />`}
				previewClass="column"
			>
				<Skeleton shape="text" lines={2} />
				<Skeleton shape="text" lines={4} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="composed"
			title="Composed"
			description="Combine shapes to mirror the layout of real content."
		>
			<CodeExample
				code={`<div class="card-skeleton">
  <Skeleton shape="circle" width="40px" height="40px" />
  <div class="card-skeleton__body">
    <Skeleton height="16px" width="50%" />
    <Skeleton shape="text" lines={2} />
  </div>
</div>

<style>
  .card-skeleton {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 16px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-base-radius);
  }
  .card-skeleton__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>`}
			>
				<div class="card-skeleton">
					<Skeleton shape="circle" width="40px" height="40px" />
					<div class="card-skeleton__body">
						<Skeleton height="16px" width="50%" />
						<Skeleton shape="text" lines={2} />
					</div>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="static" title="Static">
			<p class="example-desc">
				Set <code>animated={`{false}`}</code> to disable the shimmer animation.
			</p>
			<CodeExample
				code={`<Skeleton height="48px" animated={false} />
<Skeleton shape="text" lines={3} animated={false} />`}
				previewClass="column"
			>
				<Skeleton height="48px" animated={false} />
				<Skeleton shape="text" lines={3} animated={false} />
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['shape', "'rect' | 'circle' | 'text'", "'rect'", 'Shape of the skeleton placeholder'],
				['width', 'string', 'undefined', "Inline CSS width (e.g. '200px', '100%')"],
				['height', 'string', 'undefined', "Inline CSS height (e.g. '48px')"],
				['lines', 'number', '3', 'Number of lines when shape="text"'],
				['animated', 'boolean', 'true', 'Enables the shimmer animation']
			]}
		/>
		<p class="api-note">
			All standard <code>HTMLSpanElement</code> attributes are forwarded to the root element. The
			root element is always <code>aria-hidden="true"</code>.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--skeleton-bg', 'color-mix(--ui-neutral, transparent 78%)', 'Base background color'],
				[
					'--skeleton-shimmer-color',
					'color-mix(--ui-neutral-foreground, transparent 75%)',
					'Highlight color for the shimmer wave (light in all themes)'
				],
				['--skeleton-radius', 'var(--ui-base-radius)', 'Border radius for rect and text shapes'],
				['--skeleton-radius-circle', '9999px', 'Border radius for circle shape'],
				['--skeleton-duration', '1.5s', 'Duration of one shimmer cycle'],
				['--skeleton-easing', 'ease-in-out', 'Easing function for the shimmer animation'],
				['--skeleton-stagger', '0.15s', 'Delay increment between text lines for cascading shimmer'],
				['--skeleton-line-height', 'calc(var(--ui-base-spacing) * 4)', 'Height of each text line'],
				['--skeleton-line-gap', 'calc(var(--ui-base-spacing) * 3)', 'Gap between text lines'],
				['--skeleton-line-last-width', '70%', 'Width of the last text line']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.card-skeleton {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		padding: 16px;
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		width: 100%;
	}

	.card-skeleton__body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
