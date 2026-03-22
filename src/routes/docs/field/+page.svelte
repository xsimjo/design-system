<script lang="ts">
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import FieldGroup from '$lib/components/field/FieldGroup.svelte';
	import FieldSet from '$lib/components/field/FieldSet.svelte';
	import FieldLegend from '$lib/components/field/FieldLegend.svelte';
	import FieldSeparator from '$lib/components/field/FieldSeparator.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Textarea from '$lib/components/textarea/Textarea.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import Radio from '$lib/components/radio/Radio.svelte';
	import Switch from '$lib/components/switch/Switch.svelte';
	import Slider from '$lib/components/slider/Slider.svelte';
	import Combobox from '$lib/components/combobox/Combobox.svelte';
	import MultiSelect from '$lib/components/multiselect/MultiSelect.svelte';
	import BadgeInput from '$lib/components/badge-input/BadgeInput.svelte';
	import FileInput from '$lib/components/file-input/FileInput.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

	let demoSlider = $state(40);
	let demoCheckbox = $state(false);
	let demoRadio = $state('');
	let demoSwitch = $state(false);
	let demoSelect = $state<string | undefined>(undefined);
	let demoMulti = $state<string[]>([]);
	let demoCombobox = $state<string | undefined>(undefined);
	let demoTags = $state<string[]>([]);

	const roleOptions = [
		{ value: 'dev', label: 'Developer' },
		{ value: 'design', label: 'Designer' },
		{ value: 'pm', label: 'Product Manager' },
		{ value: 'other', label: 'Other' }
	];

	const skillOptions = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'ts', label: 'TypeScript' },
		{ value: 'css', label: 'CSS' }
	];

	const tocSections = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'description', label: 'Description', indent: true },
		{ id: 'description-above', label: 'Description Above', indent: true },
		{ id: 'error', label: 'Error State', indent: true },
		{ id: 'required', label: 'Required', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'group', label: 'FieldGroup', indent: true },
		{ id: 'fieldset', label: 'FieldSet + FieldLegend', indent: true },
		{ id: 'separator', label: 'FieldSeparator', indent: true },
		{ id: 'components', label: 'Compatible Components' },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Field - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Field"
		description="A composable set of primitives for building accessible form fields. Field provides context that wires up labels, descriptions, and error states automatically — no manual id or aria-* plumbing required."
	/>

	<DocSection id="overview" title="Overview">
		<p class="section-intro">
			The field system is built from seven components that compose together. Each one has a single
			responsibility.
		</p>

		<div class="component-list">
			<div class="component-row">
				<code class="component-name">Field</code>
				<span class="component-desc"
					>Root container. Manages shared state (id, error, required, disabled) and provides it to
					children via context.</span
				>
			</div>
			<div class="component-row">
				<code class="component-name">FieldLabel</code>
				<span class="component-desc"
					>Renders a <code>&lt;label&gt;</code> linked to the field's input via the shared
					<code>id</code> from context. Shows a required indicator when <code>required</code> is set.</span
				>
			</div>
			<div class="component-row">
				<code class="component-name">FieldDescription</code>
				<span class="component-desc"
					>Renders helper text or error messages. Registers its ID into context so the input gets a
					correct <code>aria-describedby</code>. Automatically switches to error styling when the
					field has an error.</span
				>
			</div>
			<div class="component-row">
				<code class="component-name">FieldGroup</code>
				<span class="component-desc"
					>A flex container for grouping multiple fields side-by-side or in a column. No semantic
					meaning — use <code>FieldSet</code> when grouping requires accessibility semantics.</span
				>
			</div>
			<div class="component-row">
				<code class="component-name">FieldSet</code>
				<span class="component-desc"
					>Renders a <code>&lt;fieldset&gt;</code> for semantically grouping related inputs such as radio
					buttons or checkboxes.</span
				>
			</div>
			<div class="component-row">
				<code class="component-name">FieldLegend</code>
				<span class="component-desc"
					>Renders a <code>&lt;legend&gt;</code> inside a <code>FieldSet</code>. Provides the
					accessible group label for screen readers.</span
				>
			</div>
			<div class="component-row">
				<code class="component-name">FieldSeparator</code>
				<span class="component-desc">A styled <code>&lt;hr&gt;</code> divider.</span>
			</div>
		</div>
	</DocSection>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Wrap any input with <code>Field</code> and <code>FieldLabel</code>. The label's
				<code>for</code> attribute and the input's <code>id</code> are wired automatically.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Full name</FieldLabel>
  <Input placeholder="Jane Smith" />
</Field>`}
			>
				<Field>
					<FieldLabel>Full name</FieldLabel>
					<Input placeholder="Jane Smith" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="description" title="Description">
			<p class="example-desc">
				<code>FieldDescription</code> renders helper text below the input and automatically wires
				<code>aria-describedby</code> on the control.
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
		</ExampleBlock>

		<ExampleBlock id="description-above" title="Description Above">
			<p class="example-desc">
				<code>FieldDescription</code> can appear anywhere in the composition — including between the label
				and the input — for instructional text that should be read before interaction.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>API key</FieldLabel>
  <FieldDescription>Found in your account settings under Developer.</FieldDescription>
  <Input placeholder="sk-..." />
</Field>`}
			>
				<Field>
					<FieldLabel>API key</FieldLabel>
					<FieldDescription>Found in your account settings under Developer.</FieldDescription>
					<Input placeholder="sk-..." />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="Error State">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to propagate error state to the input and all
				<code>FieldDescription</code> children. The input gets <code>aria-invalid</code> and
				<code>FieldDescription</code> automatically switches to the error color.
			</p>
			<CodeExample
				code={`<Field error="Please enter a valid email address.">
  <FieldLabel>Email</FieldLabel>
  <Input value="not-an-email" />
  <FieldDescription>Please enter a valid email address.</FieldDescription>
</Field>`}
			>
				<Field error="Please enter a valid email address.">
					<FieldLabel>Email</FieldLabel>
					<Input value="not-an-email" />
					<FieldDescription>Please enter a valid email address.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="required" title="Required">
			<p class="example-desc">
				<code>required</code> on <code>Field</code> adds a visual indicator to the label and sets
				<code>aria-required</code> on the input.
			</p>
			<CodeExample
				code={`<Field required>
  <FieldLabel>Password</FieldLabel>
  <Input type="password" placeholder="••••••••" />
  <FieldDescription>Must be at least 8 characters.</FieldDescription>
</Field>`}
			>
				<Field required>
					<FieldLabel>Password</FieldLabel>
					<Input type="password" placeholder="••••••••" />
					<FieldDescription>Must be at least 8 characters.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="disabled" title="Disabled">
			<p class="example-desc">
				<code>disabled</code> on <code>Field</code> propagates to the input automatically via context
				— no need to set it on each child.
			</p>
			<CodeExample
				code={`<Field disabled>
  <FieldLabel>Account email</FieldLabel>
  <Input value="jane@example.com" />
  <FieldDescription>Contact support to change your email.</FieldDescription>
</Field>`}
			>
				<Field disabled>
					<FieldLabel>Account email</FieldLabel>
					<Input value="jane@example.com" />
					<FieldDescription>Contact support to change your email.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="group" title="FieldGroup">
			<p class="example-desc">
				Group multiple fields side-by-side with <code>FieldGroup</code>. Use
				<code>direction="row"</code> (default) for horizontal layouts or
				<code>direction="column"</code> for vertical stacks.
			</p>
			<CodeExample
				code={`<FieldGroup>
  <Field fullWidth>
    <FieldLabel>First name</FieldLabel>
    <Input fullWidth placeholder="Jane" />
  </Field>
  <Field fullWidth>
    <FieldLabel>Last name</FieldLabel>
    <Input fullWidth placeholder="Smith" />
  </Field>
</FieldGroup>`}
			>
				<FieldGroup>
					<Field fullWidth>
						<FieldLabel>First name</FieldLabel>
						<Input fullWidth placeholder="Jane" />
					</Field>
					<Field fullWidth>
						<FieldLabel>Last name</FieldLabel>
						<Input fullWidth placeholder="Smith" />
					</Field>
				</FieldGroup>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="fieldset" title="FieldSet + FieldLegend">
			<p class="example-desc">
				Use <code>FieldSet</code> and <code>FieldLegend</code> when grouping semantically related
				fields. The <code>&lt;fieldset&gt;</code>/<code>&lt;legend&gt;</code> pair is announced by screen
				readers as a group label.
			</p>
			<CodeExample
				code={`<FieldSet>
  <FieldLegend>Shipping address</FieldLegend>
  <FieldGroup>
    <Field fullWidth>
      <FieldLabel>First name</FieldLabel>
      <Input fullWidth placeholder="Jane" />
    </Field>
    <Field fullWidth>
      <FieldLabel>Last name</FieldLabel>
      <Input fullWidth placeholder="Smith" />
    </Field>
  </FieldGroup>
  <Field fullWidth>
    <FieldLabel>Street</FieldLabel>
    <Input fullWidth placeholder="123 Main St" />
  </Field>
  <Field fullWidth>
    <FieldLabel>City</FieldLabel>
    <Input fullWidth placeholder="Montreal" />
  </Field>
</FieldSet>`}
			>
				<FieldSet>
					<FieldLegend>Shipping address</FieldLegend>
					<FieldGroup>
						<Field fullWidth>
							<FieldLabel>First name</FieldLabel>
							<Input fullWidth placeholder="Jane" />
						</Field>
						<Field fullWidth>
							<FieldLabel>Last name</FieldLabel>
							<Input fullWidth placeholder="Smith" />
						</Field>
					</FieldGroup>
					<Field fullWidth>
						<FieldLabel>Street</FieldLabel>
						<Input fullWidth placeholder="123 Main St" />
					</Field>
					<Field fullWidth>
						<FieldLabel>City</FieldLabel>
						<Input fullWidth placeholder="Montreal" />
					</Field>
				</FieldSet>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="separator"
			title="FieldSeparator"
			description="A visual divider between fields or sections of a form."
		>
			<CodeExample
				code={`<Field fullWidth>
  <FieldLabel>Email</FieldLabel>
  <Input fullWidth type="email" placeholder="jane@example.com" />
</Field>
<FieldSeparator />
<Field fullWidth>
  <FieldLabel>Password</FieldLabel>
  <Input fullWidth type="password" placeholder="••••••••" />
</Field>`}
				previewClass="column"
			>
				<Field fullWidth>
					<FieldLabel>Email</FieldLabel>
					<Input fullWidth type="email" placeholder="jane@example.com" />
				</Field>
				<FieldSeparator />
				<Field fullWidth>
					<FieldLabel>Password</FieldLabel>
					<Input fullWidth type="password" placeholder="••••••••" />
				</Field>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="components" title="Compatible Components">
		<p class="section-intro">
			Every component that reads from <code>Field</code> context. Drop any of these inside a
			<code>Field</code> and labels, errors, and disabled state wire up automatically.
		</p>

		<CodeExample
			code={`<Field fullWidth>
  <FieldLabel>Full name</FieldLabel>
  <Input fullWidth placeholder="Jane Smith" />
</Field>

<Field fullWidth>
  <FieldLabel>Bio</FieldLabel>
  <Textarea fullWidth placeholder="Tell us about yourself" />
</Field>

<Field fullWidth>
  <FieldLabel>Role</FieldLabel>
  <Select fullWidth options={roleOptions} />
</Field>

<Field fullWidth>
  <FieldLabel>Skills</FieldLabel>
  <MultiSelect fullWidth options={skillOptions} />
</Field>

<Field fullWidth>
  <FieldLabel>City</FieldLabel>
  <Combobox fullWidth options={cityOptions} placeholder="Search cities…" />
</Field>

<Field fullWidth>
  <FieldLabel>Tags</FieldLabel>
  <BadgeInput fullWidth placeholder="Add a tag…" />
</Field>

<Field fullWidth>
  <FieldLabel>Resume</FieldLabel>
  <FileInput fullWidth />
</Field>

<Field fullWidth>
  <FieldLabel>Volume</FieldLabel>
  <Slider fullWidth bind:value={volume} showValue />
</Field>

<Field inline>
  <Checkbox bind:checked={agreed} />
  <FieldLabel>Agree to terms</FieldLabel>
</Field>

<FieldSet>
  <FieldLegend>Availability</FieldLegend>
  <Field inline>
    <Radio bind:group={avail} value="full" name="avail" />
    <FieldLabel>Full-time</FieldLabel>
  </Field>
  <Field inline>
    <Radio bind:group={avail} value="part" name="avail" />
    <FieldLabel>Part-time</FieldLabel>
  </Field>
</FieldSet>

<Field inline>
  <Switch bind:checked={notifications} />
  <FieldLabel>Email notifications</FieldLabel>
</Field>`}
			previewClass="column"
		>
			<Field fullWidth>
				<FieldLabel>Full name</FieldLabel>
				<Input fullWidth placeholder="Jane Smith" />
			</Field>

			<Field fullWidth>
				<FieldLabel>Bio</FieldLabel>
				<Textarea fullWidth placeholder="Tell us about yourself" />
			</Field>

			<Field fullWidth>
				<FieldLabel>Role</FieldLabel>
				<Select fullWidth options={roleOptions} bind:value={demoSelect} />
			</Field>

			<Field fullWidth>
				<FieldLabel>Skills</FieldLabel>
				<MultiSelect fullWidth options={skillOptions} bind:values={demoMulti} />
			</Field>

			<Field fullWidth>
				<FieldLabel>City</FieldLabel>
				<Combobox
					fullWidth
					options={skillOptions}
					bind:value={demoCombobox}
					placeholder="Search…"
				/>
			</Field>

			<Field fullWidth>
				<FieldLabel>Tags</FieldLabel>
				<BadgeInput fullWidth bind:tags={demoTags} placeholder="Add a tag…" />
			</Field>

			<Field fullWidth>
				<FieldLabel>Resume</FieldLabel>
				<FileInput fullWidth />
			</Field>

			<Field fullWidth>
				<FieldLabel>Volume</FieldLabel>
				<Slider fullWidth bind:value={demoSlider} showValue />
			</Field>

			<Field inline>
				<Checkbox bind:checked={demoCheckbox} />
				<FieldLabel>Agree to terms</FieldLabel>
			</Field>

			<FieldSet>
				<FieldLegend>Availability</FieldLegend>
				<Field inline>
					<Radio bind:group={demoRadio} value="full" name="avail-demo" />
					<FieldLabel>Full-time</FieldLabel>
				</Field>
				<Field inline>
					<Radio bind:group={demoRadio} value="part" name="avail-demo" />
					<FieldLabel>Part-time</FieldLabel>
				</Field>
			</FieldSet>

			<Field inline>
				<Switch bind:checked={demoSwitch} />
				<FieldLabel>Email notifications</FieldLabel>
			</Field>
		</CodeExample>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Field"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['id', 'string', '—', 'Custom ID for the field; auto-generated if omitted'],
				[
					'error',
					'string',
					'—',
					'Triggers error styling on child inputs and FieldDescription; sets aria-invalid'
				],
				[
					'required',
					'boolean',
					'false',
					'Shows required indicator on FieldLabel; sets aria-required'
				],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child inputs via context'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width'],
				['children', 'Snippet', '—', 'Field contents']
			]}
		/>

		<PropsTable
			title="FieldLabel"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['children', 'Snippet', '—', 'Label text'],
				[
					'...restProps',
					'HTMLLabelAttributes',
					'—',
					'All native label attributes; for is set automatically from context'
				]
			]}
		/>

		<PropsTable
			title="FieldDescription"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'variant',
					"'hint' | 'error'",
					'—',
					'Controls color. When omitted, automatically applies error styling if the parent Field has an error'
				],
				['children', 'Snippet', '—', 'Description text']
			]}
		/>

		<PropsTable
			title="FieldGroup"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['direction', "'row' | 'column'", "'row'", 'Flex direction of the group'],
				['children', 'Snippet', '—', 'Field children']
			]}
		/>

		<PropsTable
			title="FieldSet"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['children', 'Snippet', '—', 'Contents (typically FieldLegend + Field children)'],
				['...restProps', 'HTMLFieldsetAttributes', '—', 'All native fieldset attributes']
			]}
		/>

		<PropsTable
			title="FieldLegend"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['children', 'Snippet', '—', 'Legend text'],
				['...restProps', 'HTMLAttributes<HTMLLegendElement>', '—', 'All native legend attributes']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			All field tokens are defined in a single <code>field.css</code> file scoped to
			<code>[data-theme]</code>.
		</p>

		<PropsTable
			title="Field"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--field-gap', '12px', 'Spacing between Field children (label, input, description)'],
				['--field-font-family', 'var(--ui-font-sans)', 'Font family for all field text']
			]}
		/>

		<PropsTable
			title="FieldLabel"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--field-label-font-size', 'var(--ui-text-sm)', 'Label font size'],
				['--field-label-font-weight', 'var(--ui-weight-medium)', 'Label font weight'],
				['--field-label-color', 'var(--ui-surface-foreground)', 'Label text color'],
				['--field-required-color', 'var(--ui-danger)', 'Color of the required asterisk']
			]}
		/>

		<PropsTable
			title="FieldDescription"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--field-description-font-size', 'var(--ui-text-sm)', 'Description font size'],
				[
					'--field-description-color',
					'color-mix(…fg 55% transparent)',
					'Default (hint) text color'
				],
				['--field-description-error-color', 'var(--ui-danger)', 'Error text color']
			]}
		/>

		<PropsTable
			title="FieldGroup"
			columns={['Token', 'Default', 'Description']}
			rows={[['--field-group-gap', '16px', 'Gap between fields in a group']]}
		/>

		<PropsTable
			title="FieldSet + FieldLegend"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--field-set-gap', '16px', 'Gap between fields inside the fieldset'],
				['--field-set-border', 'var(--ui-border)', 'Fieldset border color'],
				['--field-set-border-width', 'var(--ui-border-width)', 'Fieldset border thickness'],
				['--field-set-border-radius', 'var(--ui-base-radius)', 'Fieldset corner roundness'],
				['--field-set-padding', '16px', 'Fieldset inner padding'],
				['--field-legend-font-size', 'var(--ui-text-sm)', 'Legend font size'],
				['--field-legend-font-weight', 'var(--ui-weight-medium)', 'Legend font weight'],
				['--field-legend-color', 'var(--ui-surface-foreground)', 'Legend text color']
			]}
		/>

		<PropsTable
			title="FieldSeparator"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--field-separator-color', 'var(--ui-border)', 'Separator line color'],
				['--field-separator-width', 'var(--ui-border-width)', 'Separator line thickness']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.component-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		overflow: hidden;
	}

	.component-row {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--ui-border);
		align-items: baseline;
	}

	.component-row:last-child {
		border-bottom: none;
	}

	.component-name {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-primary), transparent 88%);
		color: var(--ui-primary);
		padding: 2px 8px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
		white-space: nowrap;
		justify-self: start;
	}

	.component-desc {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		line-height: var(--ui-leading-normal);
	}

	.component-desc code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 1px 5px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	@media (max-width: 1024px) {
		.component-row {
			grid-template-columns: 1fr;
			gap: var(--space-2);
		}
	}
</style>
