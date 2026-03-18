<script lang="ts">
	import BadgeInput from '$lib/components/badge-input/BadgeInput.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const basicCode = '<BadgeInput bind:tags placeholder="Add tag and press Enter…" />';

	let tags = $state<string[]>([]);
	let emailTags = $state<string[]>(['hello@example.com']);

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'validation', label: 'Validation', indent: true },
		{ id: 'api', label: 'API' }
	];

	function validateEmail(tag: string): boolean | string {
		return tag.includes('@') || 'Must be a valid email address';
	}
</script>

<svelte:head>
	<title>BadgeInput - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>BadgeInput</h1>
			<p class="lead">
				Free-form tag entry. Type and press <kbd>Enter</kbd> to commit a tag. Tags render as badge
				pills inside the input. Supports validation, transform, and duplicate prevention. No options
				list — use <code>MultiSelect</code> for predefined choices.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Type a value and press <kbd>Enter</kbd> to add it. Press <kbd>Backspace</kbd> on empty input
					to focus the last tag's remove button.
				</p>
				<CodeExample code={basicCode}>
					<BadgeInput bind:tags placeholder="Add tag and press Enter…" />
				</CodeExample>
			</div>

			<div id="with-field" class="example-block">
				<h3>With Field</h3>
				<p class="example-desc">Integrates with <code>Field</code> for label and error state.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Tags</FieldLabel>
  <BadgeInput bind:tags placeholder="Add tag…" />
  <FieldDescription>Press Enter to add each tag.</FieldDescription>
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Tags</FieldLabel>
						<BadgeInput bind:tags placeholder="Add tag…" />
						<FieldDescription>Press Enter to add each tag.</FieldDescription>
					</Field>
					<Field error="Tags are required.">
						<FieldLabel>Tags (error)</FieldLabel>
						<BadgeInput placeholder="Add tag…" />
					</Field>
				</CodeExample>
			</div>

			<div id="validation" class="example-block">
				<h3>Validation</h3>
				<p class="example-desc">
					Pass a <code>validate</code> function. Return <code>true</code> to accept, or a string error
					message to reject.
				</p>
				<CodeExample
					code={`function validateEmail(tag) {
  return tag.includes('@') || 'Must be a valid email address';
}

<BadgeInput
  bind:tags={emailTags}
  validate={validateEmail}
  placeholder="Add email address…"
/>`}
				>
					<Field>
						<FieldLabel>Email addresses</FieldLabel>
						<BadgeInput
							bind:tags={emailTags}
							validate={validateEmail}
							placeholder="Add email address…"
						/>
					</Field>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>BadgeInput Props</h3>
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
							<td><code>tags</code></td>
							<td><code>string[]</code></td>
							<td><code>[]</code></td>
							<td>Bindable array of committed tags</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td><code>'Add tag…'</code></td>
							<td>Input placeholder text</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls min-height, padding, and font size</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches to 100% of container</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables input and badge removal</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td><code>number</code></td>
							<td><code>—</code></td>
							<td>Maximum number of tags allowed</td>
						</tr>
						<tr>
							<td><code>maxLength</code></td>
							<td><code>number</code></td>
							<td><code>—</code></td>
							<td>Maximum character length per tag input</td>
						</tr>
						<tr>
							<td><code>delimiters</code></td>
							<td><code>string[]</code></td>
							<td><code>['Enter']</code></td>
							<td>Keys that commit the current input as a tag</td>
						</tr>
						<tr>
							<td><code>addOnBlur</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Commits current input value when focus leaves the field</td>
						</tr>
						<tr>
							<td><code>allowDuplicates</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Allows adding the same tag value more than once</td>
						</tr>
						<tr>
							<td><code>transform</code></td>
							<td><code>(tag: string) => string</code></td>
							<td><code>—</code></td>
							<td>Transform raw input before validation and commit (e.g. lowercase)</td>
						</tr>
						<tr>
							<td><code>validate</code></td>
							<td><code>(tag: string) => boolean | string</code></td>
							<td><code>—</code></td>
							<td>Return <code>true</code> to accept; string becomes the error message</td>
						</tr>
						<tr>
							<td><code>onadd</code></td>
							<td><code>(tag: string) => void</code></td>
							<td><code>—</code></td>
							<td>Called after a tag is committed</td>
						</tr>
						<tr>
							<td><code>onremove</code></td>
							<td><code>(tag, index) => void</code></td>
							<td><code>—</code></td>
							<td>Called after a tag is removed</td>
						</tr>
						<tr>
							<td><code>name</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Submits as <code>name[]</code> hidden inputs</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Keyboard Interaction</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Key</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><kbd>Enter</kbd> (default delimiter)</td>
							<td>Commit current input as a tag</td>
						</tr>
						<tr>
							<td><kbd>Backspace</kbd> (empty input)</td>
							<td>Move DOM focus to the last badge's remove button</td>
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

	.lead code,
	.lead kbd {
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

	.example-desc code,
	.example-desc kbd {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.api-table {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3 {
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

	.props-table code,
	.props-table kbd {
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
