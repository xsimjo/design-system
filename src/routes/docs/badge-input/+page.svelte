<script lang="ts">
	import BadgeInput from '$lib/components/badge-input/BadgeInput.svelte';
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

<DocsPage>
	<PageHeader title="BadgeInput">
		<p class="lead">
			Free-form tag entry. Type and press <kbd>Enter</kbd> to commit a tag. Tags render as badge
			pills inside the input. Supports validation, transform, and duplicate prevention. No options
			list — use <code>MultiSelect</code> for predefined choices.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Type a value and press <kbd>Enter</kbd> to add it. Press <kbd>Backspace</kbd> on empty input to
				focus the last tag's remove button.
			</p>
			<CodeExample code={basicCode}>
				<BadgeInput bind:tags placeholder="Add tag and press Enter…" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-field" title="With Field">
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
		</ExampleBlock>

		<ExampleBlock id="validation" title="Validation">
			<p class="example-desc">
				Pass a <code>validate</code> function. Return <code>true</code> to accept, or a string error message
				to reject.
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
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="BadgeInput Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['tags', 'string[]', '[]', 'Bindable array of committed tags'],
				['placeholder', 'string', "'Add tag…'", 'Input placeholder text'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls min-height, padding, and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches to 100% of container'],
				['disabled', 'boolean', 'false', 'Disables input and badge removal'],
				['max', 'number', '\u2014', 'Maximum number of tags allowed'],
				['maxLength', 'number', '\u2014', 'Maximum character length per tag input'],
				['delimiters', 'string[]', "['Enter']", 'Keys that commit the current input as a tag'],
				[
					'addOnBlur',
					'boolean',
					'false',
					'Commits current input value when focus leaves the field'
				],
				['allowDuplicates', 'boolean', 'false', 'Allows adding the same tag value more than once'],
				[
					'transform',
					'(tag: string) => string',
					'\u2014',
					'Transform raw input before validation and commit (e.g. lowercase)'
				],
				[
					'validate',
					'(tag: string) => boolean | string',
					'\u2014',
					'Return true to accept; string becomes the error message'
				],
				['onadd', '(tag: string) => void', '\u2014', 'Called after a tag is committed'],
				['onremove', '(tag, index) => void', '\u2014', 'Called after a tag is removed'],
				['name', 'string', '\u2014', 'Submits as name[] hidden inputs']
			]}
		/>

		<PropsTable
			title="Keyboard Interaction"
			columns={['Key', 'Action']}
			rows={[
				['Enter (default delimiter)', 'Commit current input as a tag'],
				['Backspace (empty input)', "Move DOM focus to the last badge's remove button"]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
