<script lang="ts">
	import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
	import Button from '$lib/components/button/Button.svelte';
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
		{ id: 'placements', label: 'Placements', indent: true },
		{ id: 'no-arrow', label: 'Without Arrow', indent: true },
		{ id: 'triggers', label: 'Trigger Types', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Tooltip - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader title="Tooltip">
		<p class="lead">
			A floating label that appears on hover or focus to provide supplementary context. Positioned
			with <code>@floating-ui/dom</code> and escapes overflow-clipped ancestors via
			<code>position: fixed</code>.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Wrap any trigger with <code>Tooltip</code> and provide a <code>text</code> label. The tooltip
				appears above by default.
			</p>
			<CodeExample
				code={`<Tooltip text="Save your changes">
  <Button>Save</Button>
</Tooltip>`}
			>
				<div class="example-row">
					<Tooltip text="Save your changes">
						<Button>Save</Button>
					</Tooltip>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="placements" title="Placements">
			<p class="example-desc">
				Use the <code>placement</code> prop to control which side the tooltip appears on. Accepts
				<code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code> and their
				<code>-start</code> / <code>-end</code> alignment variants. The <code>flip</code> middleware automatically
				switches sides when there is insufficient viewport space.
			</p>
			<CodeExample
				code={`<Tooltip text="Appears above" placement="top">
  <Button variant="outline" color="secondary">Top</Button>
</Tooltip>
<Tooltip text="Appears below" placement="bottom">
  <Button variant="outline" color="secondary">Bottom</Button>
</Tooltip>
<Tooltip text="Appears to the left" placement="left">
  <Button variant="outline" color="secondary">Left</Button>
</Tooltip>
<Tooltip text="Appears to the right" placement="right">
  <Button variant="outline" color="secondary">Right</Button>
</Tooltip>`}
			>
				<div class="example-row">
					<Tooltip text="Appears above" placement="top">
						<Button variant="outline" color="secondary">Top</Button>
					</Tooltip>
					<Tooltip text="Appears below" placement="bottom">
						<Button variant="outline" color="secondary">Bottom</Button>
					</Tooltip>
					<Tooltip text="Appears to the left" placement="left">
						<Button variant="outline" color="secondary">Left</Button>
					</Tooltip>
					<Tooltip text="Appears to the right" placement="right">
						<Button variant="outline" color="secondary">Right</Button>
					</Tooltip>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="no-arrow" title="Without Arrow">
			<p class="example-desc">
				Set <code>showArrow={`{false}`}</code> for a cleaner label-style tooltip without the directional
				indicator.
			</p>
			<CodeExample
				code={`<Tooltip text="No arrow here" showArrow={false}>
  <Button variant="outline" color="secondary">Hover me</Button>
</Tooltip>`}
			>
				<div class="example-row">
					<Tooltip text="No arrow here" showArrow={false}>
						<Button variant="outline" color="secondary">Hover me</Button>
					</Tooltip>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="triggers"
			title="Trigger Types"
			description="Any focusable or hoverable element works as a trigger — buttons, links, text spans, icon buttons, or disabled controls."
		>
			<CodeExample
				code={`<Tooltip text="Primary action">
  <Button>Primary</Button>
</Tooltip>

<Tooltip text="This action is unavailable">
  <Button disabled>Disabled</Button>
</Tooltip>

<Tooltip text="Inline text with a tooltip">
  <span class="highlighted-text">Hover this text</span>
</Tooltip>`}
			>
				<div class="example-row">
					<Tooltip text="Primary action">
						<Button>Primary</Button>
					</Tooltip>
					<Tooltip text="This action is currently unavailable">
						<Button disabled>Disabled</Button>
					</Tooltip>
					<Tooltip text="Inline text with a tooltip" placement="bottom">
						<span class="highlight">Hover this text</span>
					</Tooltip>
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Tooltip Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['text', 'string', 'required', 'The tooltip label text'],
				[
					'placement',
					'Placement',
					"'top'",
					'Preferred floating-ui placement. Accepts all 12 values: top, bottom, left, right, and their -start / -end variants. Flips automatically.'
				],
				[
					'showArrow',
					'boolean',
					'true',
					'Renders the directional arrow connecting the tooltip to its trigger'
				],
				['children', 'Snippet', 'required', 'The trigger element(s) wrapped by the tooltip']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="example-desc" style="margin-bottom: var(--space-4)">
			All tokens are defined in <code>[data-theme]</code> scope and can be overridden per-theme or locally.
		</p>
		<PropsTable
			columns={['Token', 'Default value', 'Description']}
			rows={[
				['--tooltip-bg', '--ui-surface-foreground', 'Background color (inverted surface)'],
				['--tooltip-color', '--ui-surface', 'Text color (inverted surface)'],
				['--tooltip-border-radius', '--ui-base-radius × 0.5', 'Corner radius'],
				['--tooltip-shadow', '--ui-depth', 'Drop shadow'],
				['--tooltip-font-size', '--ui-text-xs', 'Label font size'],
				['--tooltip-font-weight', '--ui-weight-normal', 'Label font weight'],
				['--tooltip-line-height', '--ui-leading-tight', 'Label line height'],
				['--tooltip-padding-x', '--ui-base-spacing × 1.25', 'Horizontal padding'],
				['--tooltip-padding-y', '--ui-base-spacing × 0.625', 'Vertical padding'],
				['--tooltip-max-width', '--ui-base-spacing × 32', 'Maximum width before text wraps'],
				['--tooltip-z-index', '--ui-z-overlay', 'Stacking order'],
				['--tooltip-arrow-size', '8px', 'Arrow square dimensions'],
				['--tooltip-transition', '--ui-base-duration + easing', 'Opacity fade duration and easing']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.example-row {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
		padding: var(--space-8) var(--space-4);
	}

	.highlight {
		font-family: var(--ui-font-sans);
		font-size: var(--ui-text-sm);
		color: var(--ui-primary);
		text-decoration: underline;
		text-decoration-style: dotted;
		cursor: default;
	}
</style>
