<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'label', label: 'With Label', indent: true },
		{ id: 'hint', label: 'With Hint', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'types', label: 'Input Types', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Input - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Input</h1>
			<p class="lead">
				Accessible text input. Compose with <code>Field</code>, <code>FieldLabel</code>, and
				<code>FieldDescription</code> to add labels, hints, and error messages. Fully themeable through
				CSS variables, with three sizes and support for all native input types.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">A minimal input with a placeholder.</p>
				<CodeExample code="<Input placeholder=&quot;Enter text...&quot; />">
					<Input placeholder="Enter text..." />
				</CodeExample>
			</div>

			<div id="label" class="example-block">
				<h3>With Label</h3>
				<p class="example-desc">
					Wrap with <code>Field</code> and <code>FieldLabel</code> — the label is linked to the input
					automatically via context.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Full name</FieldLabel>
  <Input placeholder="Jane Smith" />
</Field>
<Field>
  <FieldLabel>Email address</FieldLabel>
  <Input placeholder="jane@example.com" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Full name</FieldLabel>
						<Input placeholder="Jane Smith" />
					</Field>
					<Field>
						<FieldLabel>Email address</FieldLabel>
						<Input placeholder="jane@example.com" />
					</Field>
				</CodeExample>
			</div>

			<div id="hint" class="example-block">
				<h3>With Hint</h3>
				<p class="example-desc">
					<code>FieldDescription</code> can appear before or after the input.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Username</FieldLabel>
  <Input placeholder="cool_user_42" />
  <FieldDescription>Letters, numbers, and underscores only.</FieldDescription>
</Field>`}
				>
					<Field>
						<FieldLabel>Username</FieldLabel>
						<Input placeholder="cool_user_42" />
						<FieldDescription>Letters, numbers, and underscores only.</FieldDescription>
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
					code={`<Field error="Please enter a valid email address.">
  <FieldLabel>Email address</FieldLabel>
  <Input value="not-an-email" />
  <FieldDescription>Please enter a valid email address.</FieldDescription>
</Field>`}
				>
					<Field error="Please enter a valid email address.">
						<FieldLabel>Email address</FieldLabel>
						<Input value="not-an-email" />
						<FieldDescription>Please enter a valid email address.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match your layout density.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Small</FieldLabel>
  <Input size="sm" placeholder="32px height" />
</Field>
<Field>
  <FieldLabel>Medium</FieldLabel>
  <Input size="md" placeholder="40px height" />
</Field>
<Field>
  <FieldLabel>Large</FieldLabel>
  <Input size="lg" placeholder="48px height" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Small</FieldLabel>
						<Input size="sm" placeholder="32px height" />
					</Field>
					<Field>
						<FieldLabel>Medium</FieldLabel>
						<Input size="md" placeholder="40px height" />
					</Field>
					<Field>
						<FieldLabel>Large</FieldLabel>
						<Input size="lg" placeholder="48px height" />
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Disabled inputs prevent interaction and apply muted styling.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Input placeholder="Interact with me" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Input value="Can't touch this" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Active</FieldLabel>
						<Input placeholder="Interact with me" />
					</Field>
					<Field disabled>
						<FieldLabel>Disabled</FieldLabel>
						<Input value="Can't touch this" />
					</Field>
				</CodeExample>
			</div>

			<div id="full-width" class="example-block">
				<h3>Full Width</h3>
				<p class="example-desc">Stretches the field to fill its container.</p>
				<CodeExample
					code={`<Field fullWidth>
  <FieldLabel>Search</FieldLabel>
  <Input fullWidth placeholder="Search the docs..." />
</Field>`}
				>
					<Field fullWidth>
						<FieldLabel>Search</FieldLabel>
						<Input fullWidth placeholder="Search the docs..." />
					</Field>
				</CodeExample>
			</div>

			<div id="types" class="example-block">
				<h3>Input Types</h3>
				<p class="example-desc">
					All native HTML input types are supported via <code>restProps</code>.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Password</FieldLabel>
  <Input type="password" placeholder="••••••••" />
</Field>
<Field>
  <FieldLabel>Number</FieldLabel>
  <Input type="number" placeholder="42" />
</Field>
<Field>
  <FieldLabel>Date</FieldLabel>
  <Input type="date" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Password</FieldLabel>
						<Input type="password" placeholder="••••••••" />
					</Field>
					<Field>
						<FieldLabel>Number</FieldLabel>
						<Input type="number" placeholder="42" />
					</Field>
					<Field>
						<FieldLabel>Date</FieldLabel>
						<Input type="date" />
					</Field>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Input Props</h3>
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
							<td><code>string | number</code></td>
							<td><code>''</code></td>
							<td>Bindable input value</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls height, padding, and font size</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches the input to 100% of its container</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the input (also inherited from Field context)</td>
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
								>All other native input attributes (e.g. <code>type</code>,
								<code>placeholder</code>, <code>autocomplete</code>)</td
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
							<td>Triggers error styling on Input and FieldDescription</td>
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
							<td>Propagates disabled state to child Input</td>
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
				Override these tokens to adapt Input to your brand or to create specialized variants.
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
							<td><code>--input-bg</code></td>
							<td>var(--ui-surface)</td>
							<td>Input background</td>
						</tr>
						<tr>
							<td><code>--input-fg</code></td>
							<td>var(--ui-surface-foreground)</td>
							<td>Input text color</td>
						</tr>
						<tr>
							<td><code>--input-border</code></td>
							<td>var(--ui-border)</td>
							<td>Default border color</td>
						</tr>
						<tr>
							<td><code>--input-border-width</code></td>
							<td>var(--ui-border-width)</td>
							<td>Border thickness</td>
						</tr>
						<tr>
							<td><code>--input-placeholder</code></td>
							<td>color-mix(…55% transparent)</td>
							<td>Placeholder text color</td>
						</tr>
						<tr>
							<td><code>--input-hover-border</code></td>
							<td>color-mix(…border+fg 25%)</td>
							<td>Border color on hover</td>
						</tr>
						<tr>
							<td><code>--input-focus-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Border and focus ring color when focused</td>
						</tr>
						<tr>
							<td><code>--input-focus-ring-width</code></td>
							<td>var(--ui-ring-width)</td>
							<td>Width of the focus ring outline</td>
						</tr>
						<tr>
							<td><code>--input-focus-ring-offset</code></td>
							<td>var(--ui-ring-offset)</td>
							<td>Offset of the focus ring from the border</td>
						</tr>
						<tr>
							<td><code>--input-error-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Border color in error state</td>
						</tr>
						<tr>
							<td><code>--input-disabled-bg</code></td>
							<td>color-mix(…neutral 80% transparent)</td>
							<td>Background when disabled</td>
						</tr>
						<tr>
							<td><code>--input-disabled-fg</code></td>
							<td>color-mix(…fg 50% transparent)</td>
							<td>Text color when disabled</td>
						</tr>
						<tr>
							<td><code>--input-disabled-border</code></td>
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
							<th>SM</th>
							<th>MD</th>
							<th>LG</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--input-{'{size}'}-height</code></td>
							<td>32px</td>
							<td>40px</td>
							<td>48px</td>
						</tr>
						<tr>
							<td><code>--input-{'{size}'}-padding-x</code></td>
							<td>12px</td>
							<td>16px</td>
							<td>24px</td>
						</tr>
						<tr>
							<td><code>--input-{'{size}'}-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>var(--ui-text-base)</td>
							<td>var(--ui-text-lg)</td>
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
							<td><code>--input-border-radius</code></td>
							<td>var(--ui-base-radius)</td>
							<td>Corner roundness</td>
						</tr>
						<tr>
							<td><code>--input-font-family</code></td>
							<td>var(--ui-font-sans)</td>
							<td>Font family</td>
						</tr>
						<tr>
							<td><code>--input-font-weight</code></td>
							<td>var(--ui-weight-normal)</td>
							<td>Input text weight</td>
						</tr>
						<tr>
							<td><code>--input-line-height</code></td>
							<td>var(--ui-leading-normal)</td>
							<td>Input line height</td>
						</tr>
						<tr>
							<td><code>--input-transition</code></td>
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
