<script lang="ts">
	import {
		ShowcaseCategory,
		ComponentBlock,
		DemoGroup,
		DemoRow,
		DemoColumn
	} from '../components/index.js';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Textarea from '$lib/components/textarea/Textarea.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import Radio from '$lib/components/radio/Radio.svelte';
	import Switch from '$lib/components/switch/Switch.svelte';
	import Slider from '$lib/components/slider/Slider.svelte';
	import Rating from '$lib/components/rating/Rating.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import FieldGroup from '$lib/components/field/FieldGroup.svelte';
	import FieldSet from '$lib/components/field/FieldSet.svelte';
	import FieldLegend from '$lib/components/field/FieldLegend.svelte';
	import FieldSeparator from '$lib/components/field/FieldSeparator.svelte';
	import Combobox from '$lib/components/combobox/Combobox.svelte';
	import DatePicker from '$lib/components/datepicker/DatePicker.svelte';
	import TimePicker from '$lib/components/timepicker/TimePicker.svelte';
	import MultiSelect from '$lib/components/multiselect/MultiSelect.svelte';
	import FileInput from '$lib/components/file-input/FileInput.svelte';
	import BadgeInput from '$lib/components/badge-input/BadgeInput.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SendIcon from '$lib/icons/SendIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';

	type Variant = 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
	type Color =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'neutral';

	const variants: Variant[] = ['filled', 'outline', 'ghost', 'soft', 'link', 'dash'];
	const colors: Color[] = [
		'primary',
		'secondary',
		'accent',
		'success',
		'danger',
		'warning',
		'info',
		'neutral'
	];

	const countryOptions = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
		{ value: 'jp', label: 'Japan' }
	];

	const fruitOptions = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'durian', label: 'Durian', disabled: true },
		{ value: 'elderberry', label: 'Elderberry' }
	];

	const skillOptions = [
		{ value: 'react', label: 'React' },
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'rust', label: 'Rust' }
	];

	let selectValue = $state('');
	let comboboxValue = $state('');
	let multiValues = $state<string[]>([]);
	let radioGroup = $state('');
	let sliderValue = $state(40);
	let ratingValue = $state(3);
	let dateValue = $state<Date | undefined>(undefined);
	let timeValue = $state<string | undefined>(undefined);
	let tags = $state<string[]>([]);
	let files = $state<FileList | null>(null);
</script>

<ShowcaseCategory id="form" title="Form">
	<!-- Button -->
	<ComponentBlock id="button" title="Button">
		<DemoGroup label="Variants">
			<DemoRow>
				{#each variants as v (v)}
					<Button variant={v}>{v}</Button>
				{/each}
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Colors">
			<DemoRow>
				{#each colors as c (c)}
					<Button color={c}>{c}</Button>
				{/each}
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Sizes">
			<DemoRow isAligned>
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="With Icons">
			<DemoRow>
				<Button><HeartIcon /> Like</Button>
				<Button variant="outline"><DownloadIcon /> Download</Button>
				<Button color="secondary"><SendIcon /> Send</Button>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Icon Only">
			<DemoRow isAligned>
				<Button isIcon size="sm"><PlusIcon /></Button>
				<Button isIcon size="md"><HeartIcon /></Button>
				<Button isIcon size="lg"><SettingsIcon /></Button>
				<Button isIcon variant="outline"><DownloadIcon /></Button>
				<Button isIcon variant="ghost"><SendIcon /></Button>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="States">
			<DemoRow>
				<Button>Default</Button>
				<Button isLoading>Loading</Button>
				<Button disabled>Disabled</Button>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Full Width">
			<DemoColumn style="max-width: 400px;">
				<Button fullWidth>Full Width Button</Button>
				<Button fullWidth variant="outline">Full Width Outline</Button>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Color + Variant Grid">
			<div class="combo-grid">
				{#each colors as c (c)}
					<div class="combo-row">
						{#each variants as v (v)}
							<Button color={c} variant={v}>{v}</Button>
						{/each}
					</div>
				{/each}
			</div>
		</DemoGroup>
	</ComponentBlock>

	<!-- Input -->
	<ComponentBlock id="input" title="Input">
		<DemoGroup label="Basic">
			<DemoColumn style="max-width: 400px;">
				<Input placeholder="Enter your name..." />
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="With Label & Hint">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Email address</FieldLabel>
					<Input type="email" placeholder="you@example.com" fullWidth />
					<FieldDescription>We'll never share your email.</FieldDescription>
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Error State">
			<DemoColumn style="max-width: 400px;">
				<Field error="Username is already taken.">
					<FieldLabel>Username</FieldLabel>
					<Input value="johndoe" fullWidth />
					<FieldDescription variant="error">Username is already taken.</FieldDescription>
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="States">
			<DemoRow style="max-width: 500px;">
				<Field>
					<FieldLabel>Active</FieldLabel>
					<Input placeholder="Type here..." />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Input placeholder="Disabled" />
				</Field>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Input Types">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Password</FieldLabel>
					<Input type="password" placeholder="Enter password" fullWidth />
				</Field>
				<Field>
					<FieldLabel>Number</FieldLabel>
					<Input type="number" placeholder="0" fullWidth />
				</Field>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Textarea -->
	<ComponentBlock id="textarea" title="Textarea">
		<DemoGroup label="Basic">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Message</FieldLabel>
					<Textarea placeholder="Write your message..." fullWidth />
					<FieldDescription>Max 500 characters.</FieldDescription>
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Error & Disabled">
			<DemoRow style="max-width: 600px;">
				<Field error="Message is required.">
					<FieldLabel>Error</FieldLabel>
					<Textarea fullWidth />
					<FieldDescription variant="error">Message is required.</FieldDescription>
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Textarea placeholder="Disabled" fullWidth />
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Select -->
	<ComponentBlock id="select" title="Select">
		<DemoGroup label="Basic">
			<DemoColumn style="max-width: 300px;">
				<Field>
					<FieldLabel>Country</FieldLabel>
					<Select
						options={countryOptions}
						bind:value={selectValue}
						placeholder="Choose a country"
					/>
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="With Error & Disabled">
			<DemoRow style="max-width: 500px;">
				<Field error="Selection required.">
					<FieldLabel>Required</FieldLabel>
					<Select options={countryOptions} placeholder="Choose..." />
					<FieldDescription variant="error">Selection required.</FieldDescription>
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Select options={countryOptions} placeholder="Disabled" />
				</Field>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Disabled Options">
			<DemoColumn style="max-width: 300px;">
				<Select options={fruitOptions} placeholder="Pick a fruit" />
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Checkbox -->
	<ComponentBlock id="checkbox" title="Checkbox">
		<DemoGroup label="States">
			<DemoRow>
				<Field inline>
					<Checkbox />
					<FieldLabel>Unchecked</FieldLabel>
				</Field>
				<Field inline>
					<Checkbox checked={true} />
					<FieldLabel>Checked</FieldLabel>
				</Field>
				<Field inline>
					<Checkbox indeterminate={true} />
					<FieldLabel>Indeterminate</FieldLabel>
				</Field>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Error & Disabled">
			<DemoRow>
				<Field inline error="Required">
					<Checkbox />
					<FieldLabel>Accept terms</FieldLabel>
				</Field>
				<Field inline disabled>
					<Checkbox checked={true} />
					<FieldLabel>Disabled checked</FieldLabel>
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Radio -->
	<ComponentBlock id="radio" title="Radio">
		<DemoGroup label="Basic">
			<DemoRow>
				<Field inline>
					<Radio bind:group={radioGroup} value="free" />
					<FieldLabel>Free</FieldLabel>
				</Field>
				<Field inline>
					<Radio bind:group={radioGroup} value="pro" />
					<FieldLabel>Pro</FieldLabel>
				</Field>
				<Field inline>
					<Radio bind:group={radioGroup} value="enterprise" />
					<FieldLabel>Enterprise</FieldLabel>
				</Field>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Disabled">
			<DemoRow>
				<Field inline disabled>
					<Radio group="free" value="free" />
					<FieldLabel>Selected</FieldLabel>
				</Field>
				<Field inline disabled>
					<Radio group="" value="other" />
					<FieldLabel>Unselected</FieldLabel>
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Switch -->
	<ComponentBlock id="switch" title="Switch">
		<DemoGroup label="States">
			<DemoRow>
				<Field inline>
					<Switch />
					<FieldLabel>Off</FieldLabel>
				</Field>
				<Field inline>
					<Switch checked={true} />
					<FieldLabel>On</FieldLabel>
				</Field>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Error & Disabled">
			<DemoRow>
				<Field inline error="Required">
					<Switch />
					<FieldLabel>Enable notifications</FieldLabel>
				</Field>
				<Field inline disabled>
					<Switch checked={true} />
					<FieldLabel>Disabled</FieldLabel>
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Slider -->
	<ComponentBlock id="slider" title="Slider">
		<DemoGroup label="Basic with Value">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Volume: {sliderValue}%</FieldLabel>
					<Slider bind:value={sliderValue} showValue />
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Range & Step">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Price</FieldLabel>
					<Slider value={250} min={0} max={1000} step={50} showValue />
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Disabled & Error">
			<DemoRow style="max-width: 600px;">
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Slider value={60} />
				</Field>
				<Field error="Value too low.">
					<FieldLabel>With Error</FieldLabel>
					<Slider value={20} />
					<FieldDescription variant="error">Value too low.</FieldDescription>
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Rating -->
	<ComponentBlock id="rating" title="Rating">
		<DemoGroup label="Interactive">
			<DemoRow isAligned>
				<Rating bind:value={ratingValue} />
				<span class="demo-value">{ratingValue} / 5</span>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Readonly">
			<DemoRow>
				{#each [1, 2, 3, 4, 5] as v (v)}
					<Rating value={v} readonly />
				{/each}
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Custom Max & Disabled">
			<DemoRow>
				<Rating value={2} max={3} readonly />
				<Rating value={7} max={10} readonly />
				<Rating value={3} disabled />
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Field -->
	<ComponentBlock id="field" title="Field">
		<DemoGroup label="FieldGroup">
			<DemoColumn style="max-width: 500px;">
				<FieldGroup direction="row">
					<Field>
						<FieldLabel>First name</FieldLabel>
						<Input placeholder="Jane" fullWidth />
					</Field>
					<Field>
						<FieldLabel>Last name</FieldLabel>
						<Input placeholder="Doe" fullWidth />
					</Field>
				</FieldGroup>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="FieldSet + FieldLegend">
			<DemoColumn style="max-width: 500px;">
				<FieldSet>
					<FieldLegend>Shipping Address</FieldLegend>
					<Field>
						<FieldLabel>Street</FieldLabel>
						<Input placeholder="123 Main St" fullWidth />
					</Field>
					<FieldGroup direction="row">
						<Field>
							<FieldLabel>City</FieldLabel>
							<Input placeholder="Springfield" fullWidth />
						</Field>
						<Field>
							<FieldLabel>ZIP</FieldLabel>
							<Input placeholder="12345" fullWidth />
						</Field>
					</FieldGroup>
				</FieldSet>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="FieldSeparator">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Email</FieldLabel>
					<Input type="email" placeholder="you@example.com" fullWidth />
				</Field>
				<FieldSeparator />
				<Field>
					<FieldLabel>Password</FieldLabel>
					<Input type="password" placeholder="Enter password" fullWidth />
				</Field>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Combobox -->
	<ComponentBlock id="combobox" title="Combobox">
		<DemoGroup label="Basic">
			<DemoColumn style="max-width: 300px;">
				<Field>
					<FieldLabel>Country</FieldLabel>
					<Combobox
						options={countryOptions}
						bind:value={comboboxValue}
						placeholder="Search countries..."
					/>
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Error & Disabled">
			<DemoRow style="max-width: 500px;">
				<Field error="Required">
					<FieldLabel>Error</FieldLabel>
					<Combobox options={countryOptions} placeholder="Search..." />
					<FieldDescription variant="error">Required</FieldDescription>
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Combobox options={countryOptions} placeholder="Disabled" />
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- DatePicker -->
	<ComponentBlock id="datepicker" title="DatePicker">
		<DemoGroup label="Basic">
			<DemoColumn style="max-width: 300px;">
				<Field>
					<FieldLabel>Date</FieldLabel>
					<DatePicker bind:value={dateValue} />
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Error & Disabled">
			<DemoRow style="max-width: 500px;">
				<Field error="Date is required.">
					<FieldLabel>Error</FieldLabel>
					<DatePicker />
					<FieldDescription variant="error">Date is required.</FieldDescription>
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<DatePicker />
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- TimePicker -->
	<ComponentBlock id="timepicker" title="TimePicker">
		<DemoGroup label="Basic & With Seconds">
			<DemoRow style="max-width: 500px;">
				<Field>
					<FieldLabel>Time</FieldLabel>
					<TimePicker bind:value={timeValue} />
				</Field>
				<Field>
					<FieldLabel>With Seconds</FieldLabel>
					<TimePicker seconds />
				</Field>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Error & Disabled">
			<DemoRow style="max-width: 500px;">
				<Field error="Required">
					<FieldLabel>Error</FieldLabel>
					<TimePicker />
					<FieldDescription variant="error">Required</FieldDescription>
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<TimePicker />
				</Field>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- MultiSelect -->
	<ComponentBlock id="multiselect" title="MultiSelect">
		<DemoGroup label="Basic">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Skills</FieldLabel>
					<MultiSelect
						options={skillOptions}
						bind:values={multiValues}
						placeholder="Select skills..."
					/>
					<FieldDescription>Choose your tech stack.</FieldDescription>
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Max Selections">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Max 3 skills</FieldLabel>
					<MultiSelect options={skillOptions} max={3} placeholder="Select up to 3..." />
				</Field>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- FileInput -->
	<ComponentBlock id="file-input" title="FileInput">
		<DemoGroup label="Basic & Multiple">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Upload file</FieldLabel>
					<FileInput bind:files placeholder="Choose a file..." />
				</Field>
				<Field>
					<FieldLabel>Multiple files</FieldLabel>
					<FileInput multiple placeholder="Choose files..." />
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Restricted & States">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Images only</FieldLabel>
					<FileInput accept="image/*" hint="PNG, JPG up to 5MB" maxSize={5242880} />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<FileInput placeholder="Disabled" />
				</Field>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- BadgeInput -->
	<ComponentBlock id="badge-input" title="BadgeInput">
		<DemoGroup label="Basic">
			<DemoColumn style="max-width: 400px;">
				<Field>
					<FieldLabel>Tags</FieldLabel>
					<BadgeInput bind:tags placeholder="Add tags..." />
					<FieldDescription>Press Enter to add a tag.</FieldDescription>
				</Field>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="With Error">
			<DemoColumn style="max-width: 400px;">
				<Field error="At least one tag is required.">
					<FieldLabel>Tags</FieldLabel>
					<BadgeInput placeholder="Add tags..." />
					<FieldDescription variant="error">At least one tag is required.</FieldDescription>
				</Field>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>
</ShowcaseCategory>

<style>
	.combo-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-4);
		background: color-mix(in oklch, var(--ui-neutral), transparent 92%);
		border-radius: var(--ui-base-radius);
		overflow-x: auto;
	}

	.combo-row {
		display: flex;
		gap: var(--space-2);
		flex-wrap: nowrap;
	}

	.demo-value {
		font-size: var(--ui-font-size-sm);
		color: var(--ui-text-secondary);
		font-variant-numeric: tabular-nums;
	}
</style>
