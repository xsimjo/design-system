<script lang="ts">
	import Slider from '$lib/components/slider/Slider.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'label', label: 'With Label', indent: true },
		{ id: 'show-value', label: 'Show Value', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'range-step', label: 'Range & Step', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let volume = $state(40);
	let price = $state(250);
</script>

<svelte:head>
	<title>Slider - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Slider</h1>
			<p class="lead">
				Accessible range input for selecting a numeric value within a bounded interval. Compose with
				<code>Field</code> and <code>FieldLabel</code> for labels and error states. Supports three sizes,
				custom ranges, step increments, and an optional value display.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">A minimal slider from 0 to 100.</p>
				<CodeExample code="<Slider />">
					<Slider />
				</CodeExample>
			</div>

			<div id="label" class="example-block">
				<h3>With Label</h3>
				<p class="example-desc">
					Wrap with <code>Field</code> and <code>FieldLabel</code> — the label links to the slider automatically
					via context.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Volume</FieldLabel>
  <Slider />
</Field>
<Field>
  <FieldLabel>Brightness</FieldLabel>
  <Slider value={75} />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Volume</FieldLabel>
						<Slider />
					</Field>
					<Field>
						<FieldLabel>Brightness</FieldLabel>
						<Slider value={75} />
					</Field>
				</CodeExample>
			</div>

			<div id="show-value" class="example-block">
				<h3>Show Value</h3>
				<p class="example-desc">
					Use <code>showValue</code> to display the current numeric value beside the slider.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Volume</FieldLabel>
  <Slider bind:value={volume} showValue />
  <FieldDescription>Adjust the output volume.</FieldDescription>
</Field>`}
				>
					<Field>
						<FieldLabel>Volume</FieldLabel>
						<Slider bind:value={volume} showValue />
						<FieldDescription>Adjust the output volume.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match your layout density.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Small</FieldLabel>
  <Slider size="sm" value={30} />
</Field>
<Field>
  <FieldLabel>Medium</FieldLabel>
  <Slider size="md" value={50} />
</Field>
<Field>
  <FieldLabel>Large</FieldLabel>
  <Slider size="lg" value={70} />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Small</FieldLabel>
						<Slider size="sm" value={30} />
					</Field>
					<Field>
						<FieldLabel>Medium</FieldLabel>
						<Slider size="md" value={50} />
					</Field>
					<Field>
						<FieldLabel>Large</FieldLabel>
						<Slider size="lg" value={70} />
					</Field>
				</CodeExample>
			</div>

			<div id="range-step" class="example-block">
				<h3>Range & Step</h3>
				<p class="example-desc">
					Set <code>min</code>, <code>max</code>, and <code>step</code> to constrain the selectable range
					and increment size.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Price limit</FieldLabel>
  <Slider bind:value={price} min={100} max={500} step={50} showValue />
  <FieldDescription>Increments of $50 between $100 and $500.</FieldDescription>
</Field>

<Field>
  <FieldLabel>Temperature (°C)</FieldLabel>
  <Slider min={-20} max={40} step={0.5} value={20} showValue />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Price limit</FieldLabel>
						<Slider bind:value={price} min={100} max={500} step={50} showValue />
						<FieldDescription>Increments of $50 between $100 and $500.</FieldDescription>
					</Field>
					<Field>
						<FieldLabel>Temperature (°C)</FieldLabel>
						<Slider min={-20} max={40} step={0.5} value={20} showValue />
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Disabled sliders prevent interaction and apply muted styling.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Slider value={60} showValue />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Slider value={60} showValue />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Active</FieldLabel>
						<Slider value={60} showValue />
					</Field>
					<Field disabled>
						<FieldLabel>Disabled</FieldLabel>
						<Slider value={60} showValue />
					</Field>
				</CodeExample>
			</div>

			<div id="error" class="example-block">
				<h3>With Error</h3>
				<p class="example-desc">
					Set <code>error</code> on <code>Field</code> to apply error styling to the slider track and
					thumb.
				</p>
				<CodeExample
					code={`<Field error="Value must be at least 50.">
  <FieldLabel>Minimum threshold</FieldLabel>
  <Slider value={20} showValue />
  <FieldDescription>Value must be at least 50.</FieldDescription>
</Field>`}
				>
					<Field error="Value must be at least 50.">
						<FieldLabel>Minimum threshold</FieldLabel>
						<Slider value={20} showValue />
						<FieldDescription>Value must be at least 50.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="full-width" class="example-block">
				<h3>Full Width</h3>
				<p class="example-desc">Stretches the slider to fill its container.</p>
				<CodeExample
					code={`<Field fullWidth>
  <FieldLabel>Coverage</FieldLabel>
  <Slider fullWidth value={65} showValue />
</Field>`}
				>
					<Field fullWidth>
						<FieldLabel>Coverage</FieldLabel>
						<Slider fullWidth value={65} showValue />
					</Field>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Slider Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>value</code></td>
							<td><code>number</code></td>
							<td><code>0</code></td>
							<td>Bindable slider value</td>
						</tr>
						<tr>
							<td><code>min</code></td>
							<td><code>number</code></td>
							<td><code>0</code></td>
							<td>Minimum selectable value</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td><code>number</code></td>
							<td><code>100</code></td>
							<td>Maximum selectable value</td>
						</tr>
						<tr>
							<td><code>step</code></td>
							<td><code>number</code></td>
							<td><code>1</code></td>
							<td>Increment between selectable values</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls track height and thumb size</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches the slider to 100% of its container</td>
						</tr>
						<tr>
							<td><code>showValue</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Displays the current numeric value beside the slider</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the slider (also inherited from Field context)</td>
						</tr>
						<tr>
							<td><code>id</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Custom ID; auto-generated from Field context if omitted</td>
						</tr>
						<tr>
							<td><code>...restProps</code></td>
							<td><code>HTMLInputAttributes</code></td>
							<td><code>—</code></td>
							<td
								>All other native input attributes (e.g. <code>name</code>,
								<code>oninput</code>)</td
							>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Field Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>error</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Triggers error styling on Slider and FieldDescription</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Propagates disabled state to child Slider</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches the field container to 100% width</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Override these tokens to adapt Slider to your brand or to create specialized variants.
			</p>

			<div class="token-group">
				<h3>Color Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--slider-track-bg</code></td>
							<td>color-mix(…neutral 70% transparent)</td>
							<td>Unfilled track background</td>
						</tr>
						<tr>
							<td><code>--slider-fill-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Filled track and thumb border color</td>
						</tr>
						<tr>
							<td><code>--slider-thumb-bg</code></td>
							<td>var(--ui-surface-raised)</td>
							<td>Thumb background color</td>
						</tr>
						<tr>
							<td><code>--slider-thumb-border</code></td>
							<td>var(--ui-primary)</td>
							<td>Thumb border color</td>
						</tr>
						<tr>
							<td><code>--slider-focus-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Focus ring color</td>
						</tr>
						<tr>
							<td><code>--slider-focus-ring-width</code></td>
							<td>var(--ui-ring-width)</td>
							<td>Width of the focus ring outline</td>
						</tr>
						<tr>
							<td><code>--slider-focus-ring-offset</code></td>
							<td>var(--ui-ring-offset)</td>
							<td>Offset of the focus ring from the border</td>
						</tr>
						<tr>
							<td><code>--slider-error-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Fill and thumb border color in error state</td>
						</tr>
						<tr>
							<td><code>--slider-disabled-track-bg</code></td>
							<td>color-mix(…neutral 80% transparent)</td>
							<td>Unfilled track when disabled</td>
						</tr>
						<tr>
							<td><code>--slider-disabled-fill-color</code></td>
							<td>color-mix(…neutral 50% transparent)</td>
							<td>Filled track when disabled</td>
						</tr>
						<tr>
							<td><code>--slider-disabled-thumb-bg</code></td>
							<td>color-mix(…neutral 60% transparent)</td>
							<td>Thumb background when disabled</td>
						</tr>
						<tr>
							<td><code>--slider-disabled-thumb-border</code></td>
							<td>color-mix(…neutral 40% transparent)</td>
							<td>Thumb border when disabled</td>
						</tr>
						<tr>
							<td><code>--slider-value-fg</code></td>
							<td>var(--ui-surface-foreground)</td>
							<td>Color of the value display text</td>
						</tr>
						<tr>
							<td><code>--slider-value-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Font size of the value display</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Size Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>SM</th>
							<th>MD</th>
							<th>LG</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--slider-{'{size}'}-track-height</code></td>
							<td>4px</td>
							<td>6px</td>
							<td>8px</td>
						</tr>
						<tr>
							<td><code>--slider-{'{size}'}-thumb-size</code></td>
							<td>16px</td>
							<td>20px</td>
							<td>24px</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Style Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--slider-track-radius</code></td>
							<td>9999px</td>
							<td>Track corner roundness (pill-shaped by default)</td>
						</tr>
						<tr>
							<td><code>--slider-thumb-radius</code></td>
							<td>50%</td>
							<td>Thumb corner roundness (circular by default)</td>
						</tr>
						<tr>
							<td><code>--slider-thumb-shadow</code></td>
							<td>0 1px 3px …</td>
							<td>Box shadow on the thumb</td>
						</tr>
						<tr>
							<td><code>--slider-transition</code></td>
							<td>var(--ui-base-duration) var(--ui-base-easing)</td>
							<td>Transition for thumb transform and focus ring</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</article>

	<TableOfContents sections={tocSections} />
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 1fr 180px;
		gap: var(--space-12);
	}

	.docs-content {
		min-width: 0;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
	}

	.lead {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	.lead code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.doc-section {
		margin-bottom: var(--space-12);
		scroll-margin-top: var(--space-4);
	}

	.doc-section h2 {
		font-size: var(--font-size-2xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-6) 0;
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--ui-border);
	}

	.section-intro {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		font-size: var(--ui-text-base);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--space-6) 0;
	}

	.example-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-4);
	}

	.example-block h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.example-desc {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.example-desc code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.api-table,
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3,
	.token-group h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.props-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--ui-text-sm);
	}

	.props-table th,
	.props-table td {
		padding: var(--space-2) var(--space-3);
		text-align: left;
		border-bottom: 1px solid var(--ui-border);
	}

	.props-table th {
		font-weight: 600;
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
	}

	.props-table code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
