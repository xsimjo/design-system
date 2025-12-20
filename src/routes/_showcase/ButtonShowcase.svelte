<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
</script>

<section class="section">
	<h2 class="section-title">Button</h2>
	<p class="description">A versatile button component with multiple variants and colors.</p>

	<div class="subsection">
		<h3>Style Variants (Filled color=primary)</h3>
		<div class="row">
			<Button variant="filled">Filled</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="soft">Soft</Button>
			<Button variant="link">Link</Button>
			<Button variant="dash">Dash</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Colors (Filled variant)</h3>
		<div class="row">
			<Button color="primary">Primary</Button>
			<Button color="secondary">Secondary</Button>
			<Button color="info">Info</Button>
			<Button color="success">Success</Button>
			<Button color="warning">Warning</Button>
			<Button color="error">Error</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Outline Variant Colors</h3>
		<div class="row">
			<Button variant="outline" color="primary">Primary</Button>
			<Button variant="outline" color="secondary">Secondary</Button>
			<Button variant="outline" color="success">Success</Button>
			<Button variant="outline" color="warning">Warning</Button>
			<Button variant="outline" color="error">Error</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Ghost Variant Colors</h3>
		<div class="row">
			<Button variant="ghost" color="primary">Primary</Button>
			<Button variant="ghost" color="secondary">Secondary</Button>
			<Button variant="ghost" color="success">Success</Button>
			<Button variant="ghost" color="warning">Warning</Button>
			<Button variant="ghost" color="error">Error</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Soft Variant Colors</h3>
		<div class="row">
			<Button variant="soft" color="primary">Primary</Button>
			<Button variant="soft" color="secondary">Secondary</Button>
			<Button variant="soft" color="success">Success</Button>
			<Button variant="soft" color="warning">Warning</Button>
			<Button variant="soft" color="error">Error</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="row">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Icon Buttons</h3>
		<div class="row">
			<Button icon size="sm" variant="filled" color="primary">+</Button>
			<Button icon size="md" variant="outline" color="secondary">×</Button>
			<Button icon size="lg" variant="ghost" color="error">!</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>States</h3>
		<div class="row">
			<Button color="primary">Default</Button>
			<Button color="primary" disabled>Disabled</Button>
			<Button color="primary" active>Active</Button>
		</div>
		<div class="row">
			<Button variant="outline" color="secondary">Default</Button>
			<Button variant="outline" color="secondary" disabled>Disabled</Button>
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
</style>
