<script lang="ts">
	import Spinner from '$lib/components/spinner/Spinner.svelte';
</script>

<section class="section">
	<h2 class="section-title">Spinner</h2>
	<p class="description">A loading indicator to show that content is being loaded or processed.</p>

	<div class="subsection">
		<h3>Adaptive (Default)</h3>
		<p class="subsection-description">
			Without props, the spinner inherits size from font-size and color from parent.
		</p>
		<div class="row row--align-center">
			<span class="adaptive adaptive--sm">
				<Spinner /> Small text
			</span>
			<span class="adaptive adaptive--md">
				<Spinner /> Medium text
			</span>
			<span class="adaptive adaptive--lg">
				<Spinner /> Large text
			</span>
		</div>
		<div class="row row--align-center">
			<span class="adaptive" style="color: var(--color-primary)">
				<Spinner /> Primary
			</span>
			<span class="adaptive" style="color: var(--color-success)">
				<Spinner /> Success
			</span>
			<span class="adaptive" style="color: var(--color-error)">
				<Spinner /> Error
			</span>
		</div>
	</div>

	<div class="subsection">
		<h3>Fixed Sizes</h3>
		<div class="row row--align-center">
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
		</div>
	</div>

	<div class="subsection">
		<h3>Variants</h3>
		<div class="row row--align-center">
			<Spinner size="md" variant="primary" />
			<Spinner size="md" variant="secondary" />
			<Spinner size="md" variant="success" />
			<Spinner size="md" variant="warning" />
			<Spinner size="md" variant="error" />
		</div>
	</div>

	<div class="subsection">
		<h3>Use Cases</h3>
		<div class="row">
			<div class="use-case">
				<span class="use-case-label">Button loading (inherits color)</span>
				<button class="loading-button">
					<Spinner />
					<span>Submitting...</span>
				</button>
			</div>
			<div class="use-case">
				<span class="use-case-label">Inline loading</span>
				<span class="inline-loading">
					<Spinner />
					<span>Fetching data</span>
				</span>
			</div>
			<div class="use-case">
				<span class="use-case-label">Large heading</span>
				<h4 class="loading-heading">
					<Spinner /> Loading content...
				</h4>
			</div>
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

	.subsection-description {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-3);
	}

	.row:last-child {
		margin-bottom: 0;
	}

	.row--align-center {
		align-items: center;
	}

	.adaptive {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.adaptive--sm {
		font-size: var(--font-size-sm);
	}

	.adaptive--md {
		font-size: var(--font-size-lg);
	}

	.adaptive--lg {
		font-size: var(--font-size-2xl);
	}

	.use-case {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.use-case-label {
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
	}

	.loading-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background-color: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-button);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: not-allowed;
		opacity: 0.8;
	}

	.inline-loading {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.loading-heading {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
	}
</style>
