<script lang="ts">
	import { Card } from '$lib/components/card';
	import Button from '$lib/components/button/Button.svelte';
</script>

<section class="section">
	<h2 class="section-title">Card</h2>
	<p class="description">
		A container component for grouping related content with optional header and footer.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<Card>
			<p>A simple card with default padding.</p>
		</Card>
	</div>

	<div class="subsection">
		<h3>With Header and Footer</h3>
		<Card>
			{#snippet header()}
				<h4 class="card-title">Card Title</h4>
			{/snippet}

			<p>This card has a header and footer section with borders separating the content.</p>

			{#snippet footer()}
				<div class="row">
					<Button variant="outline" color="secondary" size="sm">Cancel</Button>
					<Button size="sm">Save</Button>
				</div>
			{/snippet}
		</Card>
	</div>

	<div class="subsection">
		<h3>Interactive</h3>
		<div class="card-grid">
			<Card interactive>
				<h4 class="card-title">Hover Me</h4>
				<p>Interactive cards respond to hover with shadow and border changes.</p>
			</Card>
			<Card interactive>
				<h4 class="card-title">Click Target</h4>
				<p>Great for navigation or selection patterns.</p>
			</Card>
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
		gap: var(--space-3);
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.card-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--section-title);
	}

	.card-title + p {
		margin: 0;
	}
</style>
