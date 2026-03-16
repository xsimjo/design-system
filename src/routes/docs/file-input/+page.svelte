<script lang="ts">
	import FileInput from '$lib/components/file-input/FileInput.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	let files = $state<FileList | null>(null);
	let multiFiles = $state<FileList | null>(null);
	let imageFiles = $state<FileList | null>(null);

	const basicCode = '<FileInput bind:files placeholder="Drop a file here or click to browse" />';
	const multipleCode =
		'<FileInput bind:files multiple placeholder="Drop files here or click to browse" />';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'multiple', label: 'Multiple Files', indent: true },
		{ id: 'accept', label: 'File Type Restriction', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>FileInput - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>FileInput</h1>
			<p class="lead">
				Drag-and-drop file upload zone with a styled drop area, selected file list, and native
				browser fallback. Supports single or multiple files, type restrictions via <code
					>accept</code
				>, size display, and full <code>Field</code> context integration.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Click the zone or drag a file onto it to select. Selected files appear as a list below the
					zone with their name and size.
				</p>
				<CodeExample code={basicCode}>
					<FileInput bind:files placeholder="Drop a file here or click to browse" />
				</CodeExample>
			</div>

			<div id="multiple" class="example-block">
				<h3>Multiple Files</h3>
				<p class="example-desc">
					Set <code>multiple</code> to allow selecting more than one file at once. Each file can be individually
					removed from the list.
				</p>
				<CodeExample code={multipleCode}>
					<FileInput
						bind:files={multiFiles}
						multiple
						placeholder="Drop files here or click to browse"
					/>
				</CodeExample>
			</div>

			<div id="accept" class="example-block">
				<h3>File Type Restriction</h3>
				<p class="example-desc">
					Use <code>accept</code> to limit selectable file types. Combine with <code>hint</code> to
					communicate restrictions to users. Use <code>maxSize</code> to display a max file size hint.
				</p>
				<CodeExample
					code={`<FileInput
  bind:files
  accept="image/png,image/jpeg,image/webp"
  hint="PNG, JPEG, or WebP"
  maxSize={5 * 1024 * 1024}
  multiple
/>`}
				>
					<FileInput
						bind:files={imageFiles}
						accept="image/png,image/jpeg,image/webp"
						hint="PNG, JPEG, or WebP"
						maxSize={5 * 1024 * 1024}
						multiple
					/>
				</CodeExample>
			</div>

			<div id="with-field" class="example-block">
				<h3>With Field</h3>
				<p class="example-desc">
					Wrap with <code>Field</code> to connect a label, description, and error state. The
					component auto-wires <code>id</code>, <code>aria-describedby</code>, and
					<code>aria-invalid</code>.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Attachments</FieldLabel>
  <FileInput bind:files multiple placeholder="Drop files here or click to browse" />
  <FieldDescription>Attach any supporting documents.</FieldDescription>
</Field>

<Field error="Please upload at least one file.">
  <FieldLabel>Resume (required)</FieldLabel>
  <FileInput placeholder="Drop your resume here or click to browse" />
  <FieldDescription>PDF or Word document, max 10 MB.</FieldDescription>
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Attachments</FieldLabel>
						<FileInput bind:files multiple placeholder="Drop files here or click to browse" />
						<FieldDescription>Attach any supporting documents.</FieldDescription>
					</Field>
					<Field error="Please upload at least one file.">
						<FieldLabel>Resume (required)</FieldLabel>
						<FileInput placeholder="Drop your resume here or click to browse" />
						<FieldDescription>PDF or Word document, max 10 MB.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match layout density.</p>
				<CodeExample
					code={`<FileInput size="sm" placeholder="Small" />
<FileInput size="md" placeholder="Medium" />
<FileInput size="lg" placeholder="Large" />`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Small</FieldLabel>
						<FileInput size="sm" placeholder="Small" />
					</Field>
					<Field>
						<FieldLabel>Medium</FieldLabel>
						<FileInput size="md" placeholder="Medium" />
					</Field>
					<Field>
						<FieldLabel>Large</FieldLabel>
						<FileInput size="lg" placeholder="Large" />
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Disabled, success, and error states.</p>
				<CodeExample
					code={`<FileInput disabled placeholder="Drop files here or click to browse" />
<FileInput success placeholder="Upload complete" />
<Field error="Upload failed. Please try again.">
  <FileInput placeholder="Drop files here or click to browse" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Disabled</FieldLabel>
						<FileInput disabled placeholder="Drop files here or click to browse" />
					</Field>
					<Field>
						<FieldLabel>Success</FieldLabel>
						<FileInput success placeholder="Upload complete" />
					</Field>
					<Field error="Upload failed. Please try again.">
						<FieldLabel>Error</FieldLabel>
						<FileInput placeholder="Drop files here or click to browse" />
					</Field>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>FileInput Props</h3>
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
							<td><code>files</code></td>
							<td><code>FileList | null</code></td>
							<td><code>null</code></td>
							<td>Bindable selected files</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td><code>'Drop files here or click to browse'</code></td>
							<td>Drop zone label text</td>
						</tr>
						<tr>
							<td><code>hint</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td
								>Secondary help text inside the zone (e.g. accepted formats). Overrides
								auto-generated accept hint.</td
							>
						</tr>
						<tr>
							<td><code>accept</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td
								>MIME types or extensions passed to the native input. Shown as a hint when <code
									>hint</code
								> is not set.</td
							>
						</tr>
						<tr>
							<td><code>multiple</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Allows selecting more than one file</td>
						</tr>
						<tr>
							<td><code>maxSize</code></td>
							<td><code>number</code></td>
							<td><code>—</code></td>
							<td>Display-only max file size in bytes shown as a hint inside the zone</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls zone padding and font size</td>
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
							<td>Disables interaction; also inherited from parent <code>Field</code> context</td>
						</tr>
						<tr>
							<td><code>success</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Shows success border state</td>
						</tr>
						<tr>
							<td><code>id</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Custom ID; auto-set from <code>Field</code> context if omitted</td>
						</tr>
						<tr>
							<td><code>name</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Form field name; emits hidden inputs with selected file names</td>
						</tr>
						<tr>
							<td><code>onchange</code></td>
							<td><code>(files: FileList | null) => void</code></td>
							<td><code>—</code></td>
							<td>Called when the file selection changes</td>
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
							<td><kbd>Enter</kbd> / <kbd>Space</kbd></td>
							<td>Open the native file browser dialog</td>
						</tr>
						<tr>
							<td><kbd>Tab</kbd></td>
							<td>Move focus between the drop zone and file remove buttons</td>
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
