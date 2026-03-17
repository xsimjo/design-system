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

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Field</h1>
			<p class="lead">
				A composable set of primitives for building accessible form fields. <code>Field</code>
				provides context that wires up labels, descriptions, and error states automatically — no manual
				<code>id</code> or <code>aria-*</code> plumbing required.
			</p>
		</header>

		<section id="overview" class="doc-section">
			<h2>Overview</h2>
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
						>Renders helper text or error messages. Registers its ID into context so the input gets
						a correct <code>aria-describedby</code>. Automatically switches to error styling when
						the field has an error.</span
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
						>Renders a <code>&lt;fieldset&gt;</code> for semantically grouping related inputs such as
						radio buttons or checkboxes.</span
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
		</section>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
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
			</div>

			<div id="description" class="example-block">
				<h3>Description</h3>
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
			</div>

			<div id="description-above" class="example-block">
				<h3>Description Above</h3>
				<p class="example-desc">
					<code>FieldDescription</code> can appear anywhere in the composition — including between the
					label and the input — for instructional text that should be read before interaction.
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
			</div>

			<div id="error" class="example-block">
				<h3>Error State</h3>
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
			</div>

			<div id="required" class="example-block">
				<h3>Required</h3>
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
			</div>

			<div id="disabled" class="example-block">
				<h3>Disabled</h3>
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
			</div>

			<div id="group" class="example-block">
				<h3>FieldGroup</h3>
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
			</div>

			<div id="fieldset" class="example-block">
				<h3>FieldSet + FieldLegend</h3>
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
			</div>

			<div id="separator" class="example-block">
				<h3>FieldSeparator</h3>
				<p class="example-desc">A visual divider between fields or sections of a form.</p>
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
			</div>
		</section>

		<section id="components" class="doc-section">
			<h2>Compatible Components</h2>
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
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Field</h3>
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
							<td><code>id</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Custom ID for the field; auto-generated if omitted</td>
						</tr>
						<tr>
							<td><code>error</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td
								>Triggers error styling on child inputs and <code>FieldDescription</code>; sets
								<code>aria-invalid</code></td
							>
						</tr>
						<tr>
							<td><code>required</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td
								>Shows required indicator on <code>FieldLabel</code>; sets
								<code>aria-required</code></td
							>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Propagates disabled state to child inputs via context</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches the field container to 100% width</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Field contents</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>FieldLabel</h3>
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
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Label text</td>
						</tr>
						<tr>
							<td><code>...restProps</code></td>
							<td><code>HTMLLabelAttributes</code></td>
							<td><code>—</code></td>
							<td
								>All native label attributes; <code>for</code> is set automatically from context</td
							>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>FieldDescription</h3>
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
							<td><code>variant</code></td>
							<td><code>'hint' | 'error'</code></td>
							<td><code>—</code></td>
							<td
								>Controls color. When omitted, automatically applies error styling if the parent
								<code>Field</code> has an error</td
							>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Description text</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>FieldGroup</h3>
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
							<td><code>direction</code></td>
							<td><code>'row' | 'column'</code></td>
							<td><code>'row'</code></td>
							<td>Flex direction of the group</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Field children</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>FieldSet</h3>
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
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Contents (typically <code>FieldLegend</code> + <code>Field</code> children)</td>
						</tr>
						<tr>
							<td><code>...restProps</code></td>
							<td><code>HTMLFieldsetAttributes</code></td>
							<td><code>—</code></td>
							<td>All native fieldset attributes</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>FieldLegend</h3>
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
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Legend text</td>
						</tr>
						<tr>
							<td><code>...restProps</code></td>
							<td><code>HTMLAttributes&lt;HTMLLegendElement&gt;</code></td>
							<td><code>—</code></td>
							<td>All native legend attributes</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				All field tokens are defined in a single <code>field.css</code> file scoped to
				<code>[data-theme]</code>.
			</p>

			<div class="token-group">
				<h3>Field</h3>
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
							<td><code>--field-gap</code></td>
							<td>12px</td>
							<td>Spacing between Field children (label, input, description)</td>
						</tr>
						<tr>
							<td><code>--field-font-family</code></td>
							<td>var(--ui-font-sans)</td>
							<td>Font family for all field text</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>FieldLabel</h3>
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
							<td><code>--field-label-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Label font size</td>
						</tr>
						<tr>
							<td><code>--field-label-font-weight</code></td>
							<td>var(--ui-weight-medium)</td>
							<td>Label font weight</td>
						</tr>
						<tr>
							<td><code>--field-label-color</code></td>
							<td>var(--ui-surface-foreground)</td>
							<td>Label text color</td>
						</tr>
						<tr>
							<td><code>--field-required-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Color of the required asterisk</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>FieldDescription</h3>
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
							<td><code>--field-description-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Description font size</td>
						</tr>
						<tr>
							<td><code>--field-description-color</code></td>
							<td>color-mix(…fg 55% transparent)</td>
							<td>Default (hint) text color</td>
						</tr>
						<tr>
							<td><code>--field-description-error-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Error text color</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>FieldGroup</h3>
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
							<td><code>--field-group-gap</code></td>
							<td>16px</td>
							<td>Gap between fields in a group</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>FieldSet + FieldLegend</h3>
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
							<td><code>--field-set-gap</code></td>
							<td>16px</td>
							<td>Gap between fields inside the fieldset</td>
						</tr>
						<tr>
							<td><code>--field-set-border</code></td>
							<td>var(--ui-border)</td>
							<td>Fieldset border color</td>
						</tr>
						<tr>
							<td><code>--field-set-border-width</code></td>
							<td>var(--ui-border-width)</td>
							<td>Fieldset border thickness</td>
						</tr>
						<tr>
							<td><code>--field-set-border-radius</code></td>
							<td>var(--ui-base-radius)</td>
							<td>Fieldset corner roundness</td>
						</tr>
						<tr>
							<td><code>--field-set-padding</code></td>
							<td>16px</td>
							<td>Fieldset inner padding</td>
						</tr>
						<tr>
							<td><code>--field-legend-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Legend font size</td>
						</tr>
						<tr>
							<td><code>--field-legend-font-weight</code></td>
							<td>var(--ui-weight-medium)</td>
							<td>Legend font weight</td>
						</tr>
						<tr>
							<td><code>--field-legend-color</code></td>
							<td>var(--ui-surface-foreground)</td>
							<td>Legend text color</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>FieldSeparator</h3>
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
							<td><code>--field-separator-color</code></td>
							<td>var(--ui-border)</td>
							<td>Separator line color</td>
						</tr>
						<tr>
							<td><code>--field-separator-width</code></td>
							<td>var(--ui-border-width)</td>
							<td>Separator line thickness</td>
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

	.section-intro code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

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

		.component-row {
			grid-template-columns: 1fr;
			gap: var(--space-2);
		}
	}
</style>
