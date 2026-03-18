<script lang="ts">
	import Textarea from '$lib/components/textarea/Textarea.svelte';
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
		{ id: 'resize', label: 'Resize', indent: true },
		{ id: 'rows', label: 'Rows', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Textarea - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Textarea</h1>
			<p class="lead">
				Accessible multi-line text input. Compose with <code>Field</code>,
				<code>FieldLabel</code>, and <code>FieldDescription</code> for labels, hints, and error messages.
				Supports three sizes, configurable resize behavior, and all native textarea attributes.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">A minimal textarea with a placeholder.</p>
				<CodeExample code="<Textarea placeholder=&quot;Enter your message...&quot; />">
					<Textarea placeholder="Enter your message..." />
				</CodeExample>
			</div>

			<div id="label" class="example-block">
				<h3>With Label</h3>
				<p class="example-desc">
					Wrap with <code>Field</code> and <code>FieldLabel</code> — the label is linked to the textarea
					automatically via context.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Message</FieldLabel>
  <Textarea placeholder="Tell us what's on your mind..." />
</Field>
<Field>
  <FieldLabel>Bio</FieldLabel>
  <Textarea placeholder="Write a short bio..." />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Message</FieldLabel>
						<Textarea placeholder="Tell us what's on your mind..." />
					</Field>
					<Field>
						<FieldLabel>Bio</FieldLabel>
						<Textarea placeholder="Write a short bio..." />
					</Field>
				</CodeExample>
			</div>

			<div id="hint" class="example-block">
				<h3>With Hint</h3>
				<p class="example-desc">
					<code>FieldDescription</code> provides supporting context below the textarea.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Description</FieldLabel>
  <Textarea placeholder="Describe your project..." />
  <FieldDescription>Markdown is supported.</FieldDescription>
</Field>`}
				>
					<Field>
						<FieldLabel>Description</FieldLabel>
						<Textarea placeholder="Describe your project..." />
						<FieldDescription>Markdown is supported.</FieldDescription>
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
					code={`<Field error="Message is required.">
  <FieldLabel>Message</FieldLabel>
  <Textarea />
  <FieldDescription>Message is required.</FieldDescription>
</Field>`}
				>
					<Field error="Message is required.">
						<FieldLabel>Message</FieldLabel>
						<Textarea />
						<FieldDescription>Message is required.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="resize" class="example-block">
				<h3>Resize</h3>
				<p class="example-desc">
					Control how the user can resize the textarea. Defaults to <code>vertical</code>.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Vertical (default)</FieldLabel>
  <Textarea resize="vertical" placeholder="Drag the bottom-right corner..." />
</Field>
<Field>
  <FieldLabel>None</FieldLabel>
  <Textarea resize="none" placeholder="Fixed size, no resizing" />
</Field>
<Field>
  <FieldLabel>Both</FieldLabel>
  <Textarea resize="both" placeholder="Drag any corner to resize" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Vertical (default)</FieldLabel>
						<Textarea resize="vertical" placeholder="Drag the bottom-right corner..." />
					</Field>
					<Field>
						<FieldLabel>None</FieldLabel>
						<Textarea resize="none" placeholder="Fixed size, no resizing" />
					</Field>
					<Field>
						<FieldLabel>Both</FieldLabel>
						<Textarea resize="both" placeholder="Drag any corner to resize" />
					</Field>
				</CodeExample>
			</div>

			<div id="rows" class="example-block">
				<h3>Rows</h3>
				<p class="example-desc">
					Use the native <code>rows</code> attribute to set the initial height.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Short (3 rows)</FieldLabel>
  <Textarea rows={3} placeholder="Brief note..." />
</Field>
<Field>
  <FieldLabel>Tall (8 rows)</FieldLabel>
  <Textarea rows={8} placeholder="Longer content..." />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Short (3 rows)</FieldLabel>
						<Textarea rows={3} placeholder="Brief note..." />
					</Field>
					<Field>
						<FieldLabel>Tall (8 rows)</FieldLabel>
						<Textarea rows={8} placeholder="Longer content..." />
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Disabled textareas prevent interaction and apply muted styling.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Textarea placeholder="Interact with me" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Textarea value="Can't touch this" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Active</FieldLabel>
						<Textarea placeholder="Interact with me" />
					</Field>
					<Field disabled>
						<FieldLabel>Disabled</FieldLabel>
						<Textarea value="Can't touch this" />
					</Field>
				</CodeExample>
			</div>

			<div id="full-width" class="example-block">
				<h3>Full Width</h3>
				<p class="example-desc">Stretches the textarea to fill its container.</p>
				<CodeExample
					code={`<Field fullWidth>
  <FieldLabel>Notes</FieldLabel>
  <Textarea fullWidth placeholder="Add your notes here..." />
</Field>`}
				>
					<Field fullWidth>
						<FieldLabel>Notes</FieldLabel>
						<Textarea fullWidth placeholder="Add your notes here..." />
					</Field>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Textarea Props</h3>
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
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Bindable textarea value</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls padding and font size</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches the textarea to 100% of its container</td>
						</tr>
						<tr>
							<td><code>resize</code></td>
							<td><code>'none' | 'vertical' | 'horizontal' | 'both'</code></td>
							<td><code>'vertical'</code></td>
							<td>Controls user resize behavior</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the textarea (also inherited from Field context)</td>
						</tr>
						<tr>
							<td><code>id</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Custom ID; auto-generated from Field context if omitted</td>
						</tr>
						<tr>
							<td><code>...restProps</code></td>
							<td><code>HTMLTextareaAttributes</code></td>
							<td><code>—</code></td>
							<td
								>All other native textarea attributes (e.g. <code>rows</code>,
								<code>placeholder</code>, <code>maxlength</code>)</td
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
							<td>Triggers error styling on Textarea and FieldDescription</td>
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
							<td>Propagates disabled state to child Textarea</td>
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
				Override these tokens to adapt Textarea to your brand or to create specialized variants.
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
							<td><code>--textarea-bg</code></td>
							<td>var(--ui-surface)</td>
							<td>Textarea background</td>
						</tr>
						<tr>
							<td><code>--textarea-fg</code></td>
							<td>var(--ui-surface-foreground)</td>
							<td>Textarea text color</td>
						</tr>
						<tr>
							<td><code>--textarea-border</code></td>
							<td>var(--ui-border)</td>
							<td>Default border color</td>
						</tr>
						<tr>
							<td><code>--textarea-border-width</code></td>
							<td>var(--ui-border-width)</td>
							<td>Border thickness</td>
						</tr>
						<tr>
							<td><code>--textarea-placeholder</code></td>
							<td>color-mix(…55% transparent)</td>
							<td>Placeholder text color</td>
						</tr>
						<tr>
							<td><code>--textarea-hover-border</code></td>
							<td>color-mix(…border+fg 25%)</td>
							<td>Border color on hover</td>
						</tr>
						<tr>
							<td><code>--textarea-focus-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Border and focus ring color when focused</td>
						</tr>
						<tr>
							<td><code>--textarea-focus-ring-width</code></td>
							<td>var(--ui-ring-width)</td>
							<td>Width of the focus ring outline</td>
						</tr>
						<tr>
							<td><code>--textarea-focus-ring-offset</code></td>
							<td>var(--ui-ring-offset)</td>
							<td>Offset of the focus ring from the border</td>
						</tr>
						<tr>
							<td><code>--textarea-error-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Border color in error state</td>
						</tr>
						<tr>
							<td><code>--textarea-disabled-bg</code></td>
							<td>color-mix(…neutral 80% transparent)</td>
							<td>Background when disabled</td>
						</tr>
						<tr>
							<td><code>--textarea-disabled-fg</code></td>
							<td>color-mix(…fg 50% transparent)</td>
							<td>Text color when disabled</td>
						</tr>
						<tr>
							<td><code>--textarea-disabled-border</code></td>
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
							<td><code>--textarea-{'{size}'}-padding-x</code></td>
							<td>12px</td>
							<td>16px</td>
							<td>24px</td>
						</tr>
						<tr>
							<td><code>--textarea-{'{size}'}-padding-y</code></td>
							<td>8px</td>
							<td>12px</td>
							<td>16px</td>
						</tr>
						<tr>
							<td><code>--textarea-{'{size}'}-font-size</code></td>
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
							<td><code>--textarea-min-height</code></td>
							<td>calc(var(--ui-base-spacing) * 10)</td>
							<td>Minimum height of the textarea</td>
						</tr>
						<tr>
							<td><code>--textarea-border-radius</code></td>
							<td>var(--ui-base-radius)</td>
							<td>Corner roundness</td>
						</tr>
						<tr>
							<td><code>--textarea-font-family</code></td>
							<td>var(--ui-font-sans)</td>
							<td>Font family</td>
						</tr>
						<tr>
							<td><code>--textarea-font-weight</code></td>
							<td>var(--ui-weight-normal)</td>
							<td>Text weight</td>
						</tr>
						<tr>
							<td><code>--textarea-line-height</code></td>
							<td>var(--ui-leading-normal)</td>
							<td>Line height</td>
						</tr>
						<tr>
							<td><code>--textarea-transition</code></td>
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
