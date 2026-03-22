<script lang="ts">
	import FileInput from '$lib/components/file-input/FileInput.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

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
		{ id: 'states', label: 'States', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>FileInput - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="FileInput"
		description="Drag-and-drop file upload zone with a styled drop area, selected file list, and native browser fallback. Supports single or multiple files, type restrictions via accept, size display, and full Field context integration."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="Click the zone or drag a file onto it to select. Selected files appear as a list below the zone with their name and size."
		>
			<CodeExample code={basicCode}>
				<FileInput bind:files placeholder="Drop a file here or click to browse" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="multiple" title="Multiple Files">
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
		</ExampleBlock>

		<ExampleBlock id="accept" title="File Type Restriction">
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
		</ExampleBlock>

		<ExampleBlock id="with-field" title="With Field">
			<p class="example-desc">
				Wrap with <code>Field</code> to connect a label, description, and error state. The component
				auto-wires <code>id</code>, <code>aria-describedby</code>, and
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
		</ExampleBlock>

		<ExampleBlock id="states" title="States" description="Disabled, success, and error states.">
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
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="FileInput Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['files', 'FileList | null', 'null', 'Bindable selected files'],
				['placeholder', 'string', "'Drop files here or click to browse'", 'Drop zone label text'],
				[
					'hint',
					'string',
					'—',
					'Secondary help text inside the zone (e.g. accepted formats). Overrides auto-generated accept hint.'
				],
				[
					'accept',
					'string',
					'—',
					'MIME types or extensions passed to the native input. Shown as a hint when hint is not set.'
				],
				['multiple', 'boolean', 'false', 'Allows selecting more than one file'],
				[
					'maxSize',
					'number',
					'—',
					'Display-only max file size in bytes shown as a hint inside the zone'
				],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls zone padding and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches to 100% of container'],
				[
					'disabled',
					'boolean',
					'false',
					'Disables interaction; also inherited from parent Field context'
				],
				['success', 'boolean', 'false', 'Shows success border state'],
				['id', 'string', '—', 'Custom ID; auto-set from Field context if omitted'],
				['name', 'string', '—', 'Form field name; emits hidden inputs with selected file names'],
				[
					'onchange',
					'(files: FileList | null) => void',
					'—',
					'Called when the file selection changes'
				]
			]}
		/>

		<PropsTable
			title="Keyboard Interaction"
			columns={['Key', 'Action']}
			rows={[
				['Enter / Space', 'Open the native file browser dialog'],
				['Tab', 'Move focus between the drop zone and file remove buttons']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
