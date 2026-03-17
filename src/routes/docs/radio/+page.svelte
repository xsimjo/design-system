<script lang="ts">
	import Radio from '$lib/components/radio/Radio.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'label', label: 'With Label', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let plan = $state('');
	let size = $state('');
	let errorPlan = $state('');
	let disabledPlan = $state('free');
</script>

<svelte:head>
	<title>Radio - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Radio</h1>
			<p class="lead">
				A styled radio button for single-selection within a group. Works with Svelte's
				<code>bind:group</code> for group state management. Compose with <code>Field</code> and
				<code>FieldLabel</code> to add labels and error handling.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Use <code>bind:group</code> and <code>value</code> to link radios into a group.
				</p>
				<CodeExample
					code={`<Radio bind:group={plan} value="free" name="plan" />
<Radio bind:group={plan} value="pro" name="plan" />
<Radio bind:group={plan} value="enterprise" name="plan" />`}
					previewClass="aligned"
				>
					<Radio bind:group={plan} value="free" name="plan-basic" />
					<Radio bind:group={plan} value="pro" name="plan-basic" />
					<Radio bind:group={plan} value="enterprise" name="plan-basic" />
				</CodeExample>
			</div>

			<div id="label" class="example-block">
				<h3>With Label</h3>
				<p class="example-desc">
					Use <code>inline</code> on <code>Field</code> to place each radio and its label on one row.
				</p>
				<CodeExample
					code={`<Field inline>
  <Radio bind:group={plan} value="free" name="plan" />
  <FieldLabel>Free</FieldLabel>
</Field>
<Field inline>
  <Radio bind:group={plan} value="pro" name="plan" />
  <FieldLabel>Pro</FieldLabel>
</Field>
<Field inline>
  <Radio bind:group={plan} value="enterprise" name="plan" />
  <FieldLabel>Enterprise</FieldLabel>
</Field>`}
					previewClass="column"
				>
					<Field inline>
						<Radio bind:group={plan} value="free" name="plan-label" />
						<FieldLabel>Free</FieldLabel>
					</Field>
					<Field inline>
						<Radio bind:group={plan} value="pro" name="plan-label" />
						<FieldLabel>Pro</FieldLabel>
					</Field>
					<Field inline>
						<Radio bind:group={plan} value="enterprise" name="plan-label" />
						<FieldLabel>Enterprise</FieldLabel>
					</Field>
				</CodeExample>
			</div>

			<div id="error" class="example-block">
				<h3>With Error</h3>
				<p class="example-desc">
					Set <code>error</code> on <code>Field</code> to apply error styling to the radio button.
				</p>
				<CodeExample
					code={`<Field inline error="Please select a plan.">
  <Radio bind:group={plan} value="free" name="plan" />
  <FieldLabel>Free</FieldLabel>
</Field>
<Field inline error="Please select a plan.">
  <Radio bind:group={plan} value="pro" name="plan" />
  <FieldLabel>Pro</FieldLabel>
</Field>
<FieldDescription variant="error">Please select a plan.</FieldDescription>`}
				>
					<div style="display: flex; flex-direction: column; gap: 6px;">
						<Field inline error="Please select a plan.">
							<Radio bind:group={errorPlan} value="free" name="plan-error" />
							<FieldLabel>Free</FieldLabel>
						</Field>
						<Field inline error="Please select a plan.">
							<Radio bind:group={errorPlan} value="pro" name="plan-error" />
							<FieldLabel>Pro</FieldLabel>
						</Field>
						<FieldDescription variant="error">Please select a plan.</FieldDescription>
					</div>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match your layout density.</p>
				<CodeExample
					code={`<Radio size="sm" checked />
<Radio size="md" checked />
<Radio size="lg" checked />`}
					previewClass="aligned"
				>
					<Radio bind:group={size} value="sm" size="sm" name="size-demo" />
					<Radio bind:group={size} value="md" size="md" name="size-demo" />
					<Radio bind:group={size} value="lg" size="lg" name="size-demo" />
				</CodeExample>
			</div>

			<div id="disabled" class="example-block">
				<h3>Disabled</h3>
				<p class="example-desc">Disabled radios prevent interaction and apply muted styling.</p>
				<CodeExample
					code={`<Field inline disabled>
  <Radio bind:group={plan} value="free" name="plan" />
  <FieldLabel>Free</FieldLabel>
</Field>
<Field inline disabled>
  <Radio bind:group={plan} value="pro" name="plan" />
  <FieldLabel>Pro (selected)</FieldLabel>
</Field>`}
					previewClass="column"
				>
					<Field inline disabled>
						<Radio bind:group={disabledPlan} value="free" name="plan-disabled" />
						<FieldLabel>Free</FieldLabel>
					</Field>
					<Field inline disabled>
						<Radio bind:group={disabledPlan} value="pro" name="plan-disabled" />
						<FieldLabel>Pro (selected)</FieldLabel>
					</Field>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Radio Props</h3>
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
							<td><code>group</code></td>
							<td><code>unknown</code></td>
							<td><code>—</code></td>
							<td>Bindable group value shared across all radios in the group</td>
						</tr>
						<tr>
							<td><code>value</code></td>
							<td><code>unknown</code></td>
							<td><code>—</code></td>
							<td>The value this radio represents; set on group when selected</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls the radio button diameter (14px / 16px / 20px)</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the radio (also inherited from Field context)</td>
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
								<code>checked</code>)</td
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
							<td>Triggers error styling on Radio and FieldDescription</td>
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
							<td>Propagates disabled state to child Radio</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Override these tokens to adapt Radio to your brand or to create specialized variants.
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
							<td><code>--radio-bg</code></td>
							<td>var(--ui-surface)</td>
							<td>Background in unselected state</td>
						</tr>
						<tr>
							<td><code>--radio-border</code></td>
							<td>var(--ui-border)</td>
							<td>Border color in unselected state</td>
						</tr>
						<tr>
							<td><code>--radio-border-width</code></td>
							<td>var(--ui-border-width)</td>
							<td>Border thickness</td>
						</tr>
						<tr>
							<td><code>--radio-checked-bg</code></td>
							<td>var(--ui-primary)</td>
							<td>Background when selected</td>
						</tr>
						<tr>
							<td><code>--radio-checked-border</code></td>
							<td>var(--ui-primary)</td>
							<td>Border color when selected</td>
						</tr>
						<tr>
							<td><code>--radio-hover-border</code></td>
							<td>color-mix(…border+hover)</td>
							<td>Border color on hover</td>
						</tr>
						<tr>
							<td><code>--radio-focus-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Border and focus ring color when focused</td>
						</tr>
						<tr>
							<td><code>--radio-focus-ring-width</code></td>
							<td>var(--ui-ring-width)</td>
							<td>Width of the focus ring outline</td>
						</tr>
						<tr>
							<td><code>--radio-focus-ring-offset</code></td>
							<td>var(--ui-ring-offset)</td>
							<td>Offset of the focus ring from the border</td>
						</tr>
						<tr>
							<td><code>--radio-error-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Border and background color in error state</td>
						</tr>
						<tr>
							<td><code>--radio-disabled-bg</code></td>
							<td>color-mix(…neutral 80% transparent)</td>
							<td>Background when disabled</td>
						</tr>
						<tr>
							<td><code>--radio-disabled-border</code></td>
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
							<td><code>--radio-size-sm</code></td>
							<td>14px</td>
							<td>Diameter for sm</td>
						</tr>
						<tr>
							<td><code>--radio-size-md</code></td>
							<td>16px</td>
							<td>Diameter for md</td>
						</tr>
						<tr>
							<td><code>--radio-size-lg</code></td>
							<td>20px</td>
							<td>Diameter for lg</td>
						</tr>
						<tr>
							<td><code>--radio-dot-size-sm</code></td>
							<td>5px</td>
							<td>Inner dot size for sm</td>
						</tr>
						<tr>
							<td><code>--radio-dot-size-md</code></td>
							<td>6px</td>
							<td>Inner dot size for md</td>
						</tr>
						<tr>
							<td><code>--radio-dot-size-lg</code></td>
							<td>8px</td>
							<td>Inner dot size for lg</td>
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
							<td><code>--radio-transition</code></td>
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
