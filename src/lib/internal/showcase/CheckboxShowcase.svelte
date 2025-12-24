<script lang="ts">
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';

	let checked1 = $state(false);
	let checked2 = $state(true);
	let checked3 = $state(false);
</script>

<section class="section">
	<h2 class="section-title">Checkbox</h2>
	<p class="description">
		A form control for selecting one or more options, with support for indeterminate state.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<div class="row">
			<Checkbox bind:checked={checked1} />
			<Checkbox bind:checked={checked2} />
		</div>
	</div>

	<div class="subsection">
		<h3>With Labels</h3>
		<div class="column">
			<Checkbox label="Accept terms and conditions" />
			<Checkbox label="Subscribe to newsletter" checked />
			<Checkbox label="Remember me" />
		</div>
	</div>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="row">
			<Checkbox size="sm" label="Small" />
			<Checkbox size="md" label="Medium" />
			<Checkbox size="lg" label="Large" />
		</div>
	</div>

	<div class="subsection">
		<h3>States</h3>
		<div class="row">
			<Checkbox label="Unchecked" />
			<Checkbox label="Checked" checked />
			<Checkbox label="Indeterminate" indeterminate />
		</div>
		<div class="row">
			<Checkbox label="Disabled" disabled />
			<Checkbox label="Disabled checked" disabled checked />
			<Checkbox label="Error" error />
		</div>
	</div>

	<div class="subsection">
		<h3>Interactive Example</h3>
		<div class="column">
			<Checkbox bind:checked={checked3} label="Toggle me" />
			<p class="status">Checkbox is: <strong>{checked3 ? 'checked' : 'unchecked'}</strong></p>
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

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-3);
	}

	.row:last-child {
		margin-bottom: 0;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
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
