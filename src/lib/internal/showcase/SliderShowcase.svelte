<script lang="ts">
	import Slider from '$lib/components/slider/Slider.svelte';

	let basicValue = $state(50);
	let volumeValue = $state(75);
	let brightnessValue = $state(100);
</script>

<section class="section">
	<h2 class="section-title">Slider</h2>
	<p class="description">
		A range input for selecting numeric values within a defined range, with full keyboard and touch
		support.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<div class="column">
			<Slider />
			<Slider value={25} />
		</div>
	</div>

	<div class="subsection">
		<h3>With Label & Value Display</h3>
		<div class="column">
			<Slider bind:value={volumeValue} label="Volume" showValue />
			<Slider bind:value={brightnessValue} label="Brightness" showValue max={100} />
		</div>
	</div>

	<div class="subsection">
		<h3>Custom Range</h3>
		<div class="column">
			<Slider label="Temperature (°C)" min={-20} max={40} value={22} showValue />
			<Slider label="Year" min={1900} max={2025} step={1} value={2000} showValue />
		</div>
	</div>

	<div class="subsection">
		<h3>Custom Step</h3>
		<div class="column">
			<Slider label="Step of 10" min={0} max={100} step={10} value={50} showValue />
			<Slider label="Step of 0.1" min={0} max={1} step={0.1} value={0.5} showValue />
		</div>
	</div>

	<div class="subsection">
		<h3>States</h3>
		<div class="column">
			<Slider label="Default" value={50} showValue />
			<Slider label="Disabled" value={30} disabled showValue />
		</div>
	</div>

	<div class="subsection">
		<h3>With Helper Text</h3>
		<div class="column">
			<Slider
				bind:value={basicValue}
				label="Quality"
				helperText="Adjust the quality level from 0 to 100"
				showValue
			/>
		</div>
	</div>

	<div class="subsection">
		<h3>Interactive Example</h3>
		<div class="column">
			<Slider bind:value={basicValue} label="Adjust Value" showValue />
			<p class="status">Current value: <strong>{basicValue}</strong></p>
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
