<script lang="ts">
	import Badge from '$lib/components/badge/Badge.svelte';
</script>

<section class="section">
	<h2 class="section-title">Badge</h2>
	<p class="description">A small label component for highlighting status, counts, or categories.</p>

	<div class="subsection">
		<h3>Variants (Filled)</h3>
		<div class="row">
			<Badge variant="default">Default</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="error">Error</Badge>
		</div>
	</div>

	<div class="subsection">
		<h3>Outline Variants</h3>
		<div class="row">
			<Badge variant="default" outline>Default</Badge>
			<Badge variant="primary" outline>Primary</Badge>
			<Badge variant="secondary" outline>Secondary</Badge>
			<Badge variant="success" outline>Success</Badge>
			<Badge variant="warning" outline>Warning</Badge>
			<Badge variant="error" outline>Error</Badge>
		</div>
	</div>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="row row--align-center">
			<Badge size="sm">Small</Badge>
			<Badge size="md">Medium</Badge>
		</div>
	</div>

	<div class="subsection">
		<h3>Pill Shape</h3>
		<div class="row">
			<Badge pill>Default</Badge>
			<Badge variant="primary" pill>Primary</Badge>
			<Badge variant="success" pill>Success</Badge>
			<Badge variant="warning" pill>Warning</Badge>
			<Badge variant="error" pill>Error</Badge>
		</div>
	</div>

	<div class="subsection">
		<h3>Pill + Outline</h3>
		<div class="row">
			<Badge pill outline>Default</Badge>
			<Badge variant="primary" pill outline>Primary</Badge>
			<Badge variant="success" pill outline>Success</Badge>
			<Badge variant="warning" pill outline>Warning</Badge>
			<Badge variant="error" pill outline>Error</Badge>
		</div>
	</div>

	<div class="subsection">
		<h3>Status Indicators</h3>
		<div class="row">
			<Badge variant="success" size="sm">Active</Badge>
			<Badge variant="warning" size="sm">Pending</Badge>
			<Badge variant="error" size="sm">Inactive</Badge>
			<Badge variant="secondary" size="sm">Draft</Badge>
		</div>
	</div>

	<div class="subsection">
		<h3>Counts</h3>
		<div class="row">
			<Badge variant="primary" pill>3</Badge>
			<Badge variant="primary" pill>12</Badge>
			<Badge variant="error" pill>99+</Badge>
		</div>
	</div>

	<div class="subsection">
		<h3>Categories</h3>
		<div class="row">
			<Badge variant="secondary" outline>Design</Badge>
			<Badge variant="secondary" outline>Development</Badge>
			<Badge variant="secondary" outline>Marketing</Badge>
			<Badge variant="secondary" outline>Sales</Badge>
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
		margin-bottom: var(--space-3);
	}

	.row:last-child {
		margin-bottom: 0;
	}

	.row--align-center {
		align-items: center;
	}
</style>
