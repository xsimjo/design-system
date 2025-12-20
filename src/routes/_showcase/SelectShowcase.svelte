<script lang="ts">
	import Select from '$lib/components/select/Select.svelte';

	let selectedValue: string | number | null = $state(null);
	let searchableValue: string | number | null = $state(null);

	const fruitOptions = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'date', label: 'Date' },
		{ value: 'elderberry', label: 'Elderberry' }
	];

	const countryOptions = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'au', label: 'Australia' },
		{ value: 'br', label: 'Brazil' },
		{ value: 'in', label: 'India' },
		{ value: 'cn', label: 'China' }
	];

	const statusOptions = [
		{ value: 'active', label: 'Active' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'suspended', label: 'Suspended', disabled: true },
		{ value: 'archived', label: 'Archived' }
	];
</script>

<section class="section">
	<h2 class="section-title">Select</h2>
	<p class="description">
		A dropdown select component for choosing from a list of options, with support for search,
		keyboard navigation, and disabled states.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<div class="column">
			<Select options={fruitOptions} placeholder="Choose a fruit..." />
			<Select options={fruitOptions} label="Favorite Fruit" placeholder="Select fruit" />
		</div>
	</div>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="column">
			<Select size="sm" options={fruitOptions} placeholder="Small select" />
			<Select size="md" options={fruitOptions} placeholder="Medium select" />
			<Select size="lg" options={fruitOptions} placeholder="Large select" />
		</div>
	</div>

	<div class="subsection">
		<h3>With Labels & Helper Text</h3>
		<div class="column">
			<Select
				options={countryOptions}
				label="Country"
				placeholder="Select your country"
				helperText="We use this for shipping purposes"
			/>
			<Select
				options={statusOptions}
				label="Account Status"
				placeholder="Select status"
				helperText="Some options may be unavailable"
			/>
		</div>
	</div>

	<div class="subsection">
		<h3>Searchable</h3>
		<div class="column">
			<Select
				bind:value={searchableValue}
				options={countryOptions}
				label="Country"
				placeholder="Search countries..."
				searchable
				helperText="Type to filter options"
			/>
			<p class="status">Selected: <strong>{searchableValue || '(none)'}</strong></p>
		</div>
	</div>

	<div class="subsection">
		<h3>States</h3>
		<div class="column">
			<Select options={fruitOptions} label="Default" placeholder="Default state" />
			<Select options={fruitOptions} label="Disabled" placeholder="Cannot select" disabled />
			<Select
				options={fruitOptions}
				label="Error"
				placeholder="Invalid selection"
				error="Please select a valid option"
			/>
			<Select
				options={statusOptions}
				label="With Disabled Options"
				placeholder="Some options disabled"
				helperText="Suspended option is disabled"
			/>
		</div>
	</div>

	<div class="subsection">
		<h3>Interactive Example</h3>
		<div class="column">
			<Select
				bind:value={selectedValue}
				options={fruitOptions}
				label="Pick a fruit"
				placeholder="Select a fruit..."
			/>
			<p class="status">
				Selected value: <strong>{selectedValue || '(none)'}</strong>
			</p>
		</div>
	</div>
</section>

<style>
	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--card-border);
	}

	.section-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.description {
		margin: 0 0 var(--space-6) 0;
		color: var(--section-description);
	}

	.subsection {
		margin-bottom: var(--space-6);
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection h3 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 400px;
	}

	.status {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--section-description);
	}

	.status strong {
		color: var(--section-title);
	}
</style>
