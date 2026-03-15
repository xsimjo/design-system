<script lang="ts">
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'label', label: 'With Label', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Checkbox - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Checkbox</h1>
			<p class="lead">
				Accessible checkbox with checked and indeterminate states. Compose with <code>Field</code>,
				<code>FieldLabel</code>, and <code>FieldDescription</code> to add labels, hints, and error messages.
				Fully themeable through CSS variables, with three sizes.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">A minimal checkbox.</p>
				<CodeExample code="<Checkbox />">
					<Checkbox />
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Unchecked, checked, and indeterminate states.</p>
				<CodeExample
					code={`<Checkbox />
<Checkbox checked={true} />
<Checkbox indeterminate={true} />`}
					previewClass="aligned"
				>
					<Checkbox />
					<Checkbox checked={true} />
					<Checkbox indeterminate={true} />
				</CodeExample>
			</div>

			<div id="label" class="example-block">
				<h3>With Label</h3>
				<p class="example-desc">
					Use <code>inline</code> on <code>Field</code> to place the checkbox and label on one row. The
					label is linked to the checkbox automatically via context.
				</p>
				<CodeExample
					code={`<Field inline>
  <Checkbox />
  <FieldLabel>Accept terms and conditions</FieldLabel>
</Field>
<Field inline>
  <Checkbox />
  <FieldLabel>Subscribe to newsletter</FieldLabel>
</Field>`}
					previewClass="column"
				>
					<Field inline>
						<Checkbox />
						<FieldLabel>Accept terms and conditions</FieldLabel>
					</Field>
					<Field inline>
						<Checkbox />
						<FieldLabel>Subscribe to newsletter</FieldLabel>
					</Field>
				</CodeExample>
			</div>

			<div id="error" class="example-block">
				<h3>With Error</h3>
				<p class="example-desc">
					Set <code>error</code> on <code>Field</code> to apply error styling.
					<code>FieldDescription</code> automatically renders in the error color when the field has an
					error.
				</p>
				<CodeExample
					code={`<Field inline error="You must accept the terms to continue.">
  <Checkbox />
  <FieldLabel>Accept terms and conditions</FieldLabel>
</Field>
<FieldDescription>You must accept the terms to continue.</FieldDescription>`}
				>
					<div style="display: flex; flex-direction: column; gap: 6px;">
						<Field inline error="You must accept the terms to continue.">
							<Checkbox />
							<FieldLabel>Accept terms and conditions</FieldLabel>
						</Field>
						<FieldDescription variant="error"
							>You must accept the terms to continue.</FieldDescription
						>
					</div>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match your layout density.</p>
				<CodeExample
					code={`<Checkbox size="sm" checked={true} />
<Checkbox size="md" checked={true} />
<Checkbox size="lg" checked={true} />`}
					previewClass="aligned"
				>
					<Checkbox size="sm" checked={true} />
					<Checkbox size="md" checked={true} />
					<Checkbox size="lg" checked={true} />
				</CodeExample>
			</div>

			<div id="disabled" class="example-block">
				<h3>Disabled</h3>
				<p class="example-desc">Disabled checkboxes prevent interaction and apply muted styling.</p>
				<CodeExample
					code={`<Field inline disabled>
  <Checkbox />
  <FieldLabel>Unchecked</FieldLabel>
</Field>
<Field inline disabled>
  <Checkbox checked={true} />
  <FieldLabel>Checked</FieldLabel>
</Field>
<Field inline disabled>
  <Checkbox indeterminate={true} />
  <FieldLabel>Indeterminate</FieldLabel>
</Field>`}
					previewClass="column"
				>
					<Field inline disabled>
						<Checkbox />
						<FieldLabel>Unchecked</FieldLabel>
					</Field>
					<Field inline disabled>
						<Checkbox checked={true} />
						<FieldLabel>Checked</FieldLabel>
					</Field>
					<Field inline disabled>
						<Checkbox indeterminate={true} />
						<FieldLabel>Indeterminate</FieldLabel>
					</Field>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Checkbox Props</h3>
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
							<td><code>checked</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Bindable checked state</td>
						</tr>
						<tr>
							<td><code>indeterminate</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Bindable indeterminate state; takes visual precedence over checked</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls the width and height (14px / 16px / 20px)</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the checkbox (also inherited from Field context)</td>
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
							<td>All other native input attributes (e.g. <code>name</code>, <code>value</code>)</td
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
							<td>Triggers error styling on Checkbox and FieldDescription</td>
						</tr>
						<tr>
							<td><code>required</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Shows required indicator on FieldLabel; sets aria-required</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Propagates disabled state to child Checkbox</td>
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
				Override these tokens to adapt Checkbox to your brand or to create specialized variants.
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
							<td><code>--checkbox-bg</code></td>
							<td>var(--ui-surface)</td>
							<td>Default background color</td>
						</tr>
						<tr>
							<td><code>--checkbox-border</code></td>
							<td>var(--ui-border)</td>
							<td>Default border color</td>
						</tr>
						<tr>
							<td><code>--checkbox-border-width</code></td>
							<td>var(--ui-border-width)</td>
							<td>Border thickness</td>
						</tr>
						<tr>
							<td><code>--checkbox-checked-bg</code></td>
							<td>var(--ui-primary)</td>
							<td>Background when checked or indeterminate</td>
						</tr>
						<tr>
							<td><code>--checkbox-checked-border</code></td>
							<td>var(--ui-primary)</td>
							<td>Border color when checked or indeterminate</td>
						</tr>
						<tr>
							<td><code>--checkbox-hover-border</code></td>
							<td>color-mix(…border+hover 10%)</td>
							<td>Border color on hover</td>
						</tr>
						<tr>
							<td><code>--checkbox-focus-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Border and focus ring color when focused</td>
						</tr>
						<tr>
							<td><code>--checkbox-focus-ring-width</code></td>
							<td>var(--ui-ring-width)</td>
							<td>Width of the focus ring outline</td>
						</tr>
						<tr>
							<td><code>--checkbox-focus-ring-offset</code></td>
							<td>var(--ui-ring-offset)</td>
							<td>Offset of the focus ring from the border</td>
						</tr>
						<tr>
							<td><code>--checkbox-error-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Border and background color in error state</td>
						</tr>
						<tr>
							<td><code>--checkbox-disabled-bg</code></td>
							<td>color-mix(…neutral 80% transparent)</td>
							<td>Background when disabled</td>
						</tr>
						<tr>
							<td><code>--checkbox-disabled-border</code></td>
							<td>var(--ui-border)</td>
							<td>Border color when disabled</td>
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
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--checkbox-size-sm</code></td>
							<td>14px</td>
							<td>Width and height for sm size</td>
						</tr>
						<tr>
							<td><code>--checkbox-size-md</code></td>
							<td>16px</td>
							<td>Width and height for md size</td>
						</tr>
						<tr>
							<td><code>--checkbox-size-lg</code></td>
							<td>20px</td>
							<td>Width and height for lg size</td>
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
							<td><code>--checkbox-border-radius</code></td>
							<td>4px</td>
							<td>Corner roundness</td>
						</tr>
						<tr>
							<td><code>--checkbox-transition</code></td>
							<td>var(--ui-base-duration) var(--ui-base-easing)</td>
							<td>Transition for border and background</td>
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
