<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
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
				Accessible text input with label, hint, and error support. Fully themeable through CSS
				variables, with three sizes and support for all native input types.
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
					Labels are linked to the input via a generated or provided <code>id</code>.
				</p>
				<CodeExample
					code={`<Input label="Full name" placeholder="Jane Smith" />
<Input label="Email address" placeholder="jane@example.com" />`}
					previewClass="column"
				>
					<Input label="Full name" placeholder="Jane Smith" />
					<Input label="Email address" placeholder="jane@example.com" />
				</CodeExample>
			</div>

			<div id="hint" class="example-block">
				<h3>With Hint</h3>
				<p class="example-desc">Hint text appears below the input to provide additional context.</p>
				<CodeExample
					code="<Input label=&quot;Username&quot; hint=&quot;Letters, numbers, and underscores only.&quot; placeholder=&quot;cool_user_42&quot; />"
				>
					<Input
						label="Username"
						hint="Letters, numbers, and underscores only."
						placeholder="cool_user_42"
					/>
				</CodeExample>
			</div>

			<div id="error" class="example-block">
				<h3>With Error</h3>
				<p class="example-desc">
					Error messages replace the hint text and style the border in the error color.
				</p>
				<CodeExample
					code="<Input label=&quot;Email address&quot; value=&quot;not-an-email&quot; error=&quot;Please enter a valid email address.&quot; />"
				>
					<Input
						label="Email address"
						value="not-an-email"
						error="Please enter a valid email address."
					/>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match your layout density.</p>
				<CodeExample
					code={`<Input size="sm" label="Small" placeholder="32px height" />
<Input size="md" label="Medium" placeholder="40px height" />
<Input size="lg" label="Large" placeholder="48px height" />`}
					previewClass="column"
				>
					<Input size="sm" label="Small" placeholder="32px height" />
					<Input size="md" label="Medium" placeholder="40px height" />
					<Input size="lg" label="Large" placeholder="48px height" />
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Disabled inputs prevent interaction and apply muted styling.</p>
				<CodeExample
					code={`<Input label="Active" placeholder="Interact with me" />
<Input label="Disabled" value="Can't touch this" disabled />`}
					previewClass="column"
				>
					<Input label="Active" placeholder="Interact with me" />
					<Input label="Disabled" value="Can't touch this" disabled />
				</CodeExample>
			</div>

			<div id="full-width" class="example-block">
				<h3>Full Width</h3>
				<p class="example-desc">Stretches the input to fill its container.</p>
				<CodeExample
					code="<Input label=&quot;Search&quot; placeholder=&quot;Search the docs...&quot; fullWidth />"
				>
					<Input label="Search" placeholder="Search the docs..." fullWidth />
				</CodeExample>
			</div>

			<div id="types" class="example-block">
				<h3>Input Types</h3>
				<p class="example-desc">
					All native HTML input types are supported via <code>restProps</code>.
				</p>
				<CodeExample
					code={`<Input label="Password" type="password" placeholder="••••••••" />
<Input label="Number" type="number" placeholder="42" />
<Input label="Date" type="date" />`}
					previewClass="column"
				>
					<Input label="Password" type="password" placeholder="••••••••" />
					<Input label="Number" type="number" placeholder="42" />
					<Input label="Date" type="date" />
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Props</h3>
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
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Label rendered above the input</td>
						</tr>
						<tr>
							<td><code>hint</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Helper text shown below the input (hidden when <code>error</code> is set)</td>
						</tr>
						<tr>
							<td><code>error</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Error message; also applies error border styling</td>
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
							<td>Disables the input</td>
						</tr>
						<tr>
							<td><code>id</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Custom ID for the input; auto-generated if omitted</td>
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
							<td>Input text and label color</td>
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
							<td>Placeholder and hint text color</td>
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
							<td>Border and error message color</td>
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
							<td><code>--input-label-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Label font size</td>
						</tr>
						<tr>
							<td><code>--input-label-font-weight</code></td>
							<td>var(--ui-weight-medium)</td>
							<td>Label font weight</td>
						</tr>
						<tr>
							<td><code>--input-hint-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Hint and error message font size</td>
						</tr>
						<tr>
							<td><code>--input-label-gap</code></td>
							<td>4px</td>
							<td>Gap between label and input</td>
						</tr>
						<tr>
							<td><code>--input-field-gap</code></td>
							<td>6px</td>
							<td>Gap between input and hint/error</td>
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
