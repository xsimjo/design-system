<script lang="ts">
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
</script>

<section class="section">
	<h2 class="section-title">Progress Bar</h2>
	<p class="description">
		A visual indicator that displays the completion progress of a task or operation.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<div class="column">
			<ProgressBar value={0} />
			<ProgressBar value={25} />
			<ProgressBar value={50} />
			<ProgressBar value={75} />
			<ProgressBar value={100} />
		</div>
	</div>

	<div class="subsection">
		<h3>With Label & Percentage</h3>
		<div class="column">
			<ProgressBar value={65} label="Uploading files..." showPercentage />
			<ProgressBar value={30} label="Processing" showPercentage />
		</div>
	</div>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="column">
			<ProgressBar value={60} size="sm" label="Small" showPercentage />
			<ProgressBar value={60} size="md" label="Medium" showPercentage />
			<ProgressBar value={60} size="lg" label="Large" showPercentage />
		</div>
	</div>

	<div class="subsection">
		<h3>Variants</h3>
		<div class="column">
			<ProgressBar value={70} variant="default" label="Default" showPercentage />
			<ProgressBar value={100} variant="success" label="Success" showPercentage />
			<ProgressBar value={45} variant="warning" label="Warning" showPercentage />
			<ProgressBar value={25} variant="error" label="Error" showPercentage />
		</div>
	</div>

	<div class="subsection">
		<h3>Indeterminate</h3>
		<div class="column">
			<ProgressBar indeterminate label="Loading..." />
			<ProgressBar indeterminate variant="success" />
		</div>
	</div>

	<div class="subsection">
		<h3>Disabled</h3>
		<div class="column">
			<ProgressBar value={50} disabled label="Paused" showPercentage />
		</div>
	</div>

	<div class="subsection">
		<h3>Custom Max Value</h3>
		<div class="column">
			<ProgressBar value={3} max={10} label="Step 3 of 10" showPercentage />
			<ProgressBar value={750} max={1000} label="750 / 1000 MB" showPercentage />
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
</style>
