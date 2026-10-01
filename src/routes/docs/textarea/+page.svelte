<script lang="ts">
	import Textarea from '$lib/components/textarea/Textarea.svelte';
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

<DocsPage>
	<PageHeader title="Textarea">
		<p class="lead">
			Accessible multi-line text input. Compose with <code>Field</code>,
			<code>FieldLabel</code>, and <code>FieldDescription</code> for labels, hints, and error messages.
			Supports three sizes, configurable resize behavior, and all native textarea attributes.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="A minimal textarea with a placeholder.">
			<CodeExample code="<Textarea placeholder=&quot;Enter your message...&quot; />">
				<Textarea placeholder="Enter your message..." />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="label" title="With Label">
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
		</ExampleBlock>

		<ExampleBlock id="hint" title="With Hint">
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
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling.
				<code>FieldDescription</code> automatically renders in the error color when the field has an error.
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
		</ExampleBlock>

		<ExampleBlock id="resize" title="Resize">
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
		</ExampleBlock>

		<ExampleBlock id="rows" title="Rows">
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
		</ExampleBlock>

		<ExampleBlock
			id="states"
			title="States"
			description="Disabled textareas prevent interaction and apply muted styling."
		>
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
		</ExampleBlock>

		<ExampleBlock
			id="full-width"
			title="Full Width"
			description="Stretches the textarea to fill its container."
		>
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
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Textarea Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', "''", 'Bindable textarea value'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls padding and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches the textarea to 100% of its container'],
				[
					'resize',
					"'none' | 'vertical' | 'horizontal' | 'both'",
					"'vertical'",
					'Controls user resize behavior'
				],
				[
					'disabled',
					'boolean',
					'false',
					'Disables the textarea (also inherited from Field context)'
				],
				['id', 'string', '—', 'Custom ID; auto-generated from Field context if omitted'],
				[
					'...restProps',
					'HTMLTextareaAttributes',
					'—',
					'All other native textarea attributes (e.g. rows, placeholder, maxlength)'
				]
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '—', 'Triggers error styling on Textarea and FieldDescription'],
				[
					'required',
					'boolean',
					'false',
					'Shows required indicator on FieldLabel; sets aria-required'
				],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child Textarea'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Textarea to your brand or to create specialized variants.
		</p>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--textarea-bg', 'var(--ui-surface)', 'Textarea background'],
				['--textarea-fg', 'var(--ui-surface-foreground)', 'Textarea text color'],
				['--textarea-border', 'var(--ui-border)', 'Default border color'],
				['--textarea-border-width', 'var(--ui-border-width)', 'Border thickness'],
				['--textarea-placeholder', 'color-mix(…55% transparent)', 'Placeholder text color'],
				['--textarea-hover-border', 'color-mix(…border+fg 25%)', 'Border color on hover'],
				['--textarea-focus-color', 'var(--ui-primary)', 'Border and focus ring color when focused'],
				['--textarea-focus-ring-width', 'var(--ui-ring-width)', 'Width of the focus ring outline'],
				[
					'--textarea-focus-ring-offset',
					'var(--ui-ring-offset)',
					'Offset of the focus ring from the border'
				],
				['--textarea-error-color', 'var(--ui-danger)', 'Border color in error state'],
				[
					'--textarea-disabled-bg',
					'color-mix(…neutral 80% transparent)',
					'Background when disabled'
				],
				['--textarea-disabled-fg', 'color-mix(…fg 50% transparent)', 'Text color when disabled'],
				['--textarea-disabled-border', 'var(--ui-border)', 'Border color when disabled']
			]}
		/>

		<PropsTable
			title="Size Tokens"
			columns={['Token', 'SM', 'MD', 'LG']}
			rows={[
				['--textarea-{size}-padding-x', '12px', '16px', '24px'],
				['--textarea-{size}-padding-y', '8px', '12px', '16px'],
				[
					'--textarea-{size}-font-size',
					'var(--ui-text-sm)',
					'var(--ui-text-base)',
					'var(--ui-text-lg)'
				]
			]}
		/>

		<PropsTable
			title="Style Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				[
					'--textarea-min-height',
					'calc(var(--ui-base-spacing) * 20)',
					'Minimum height of the textarea'
				],
				['--textarea-border-radius', 'var(--ui-base-radius)', 'Corner roundness'],
				['--textarea-font-family', 'var(--ui-font-sans)', 'Font family'],
				['--textarea-font-weight', 'var(--ui-weight-normal)', 'Text weight'],
				['--textarea-line-height', 'var(--ui-leading-normal)', 'Line height'],
				[
					'--textarea-transition',
					'var(--ui-base-duration) var(--ui-base-easing)',
					'Transition for border and background'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
