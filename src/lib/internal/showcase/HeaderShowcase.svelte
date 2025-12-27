<script lang="ts">
	import Header from '$lib/internal/Header.svelte';
	import Button from '$lib/components/button/Button.svelte';
</script>

<section class="section">
	<h2 class="section-title">Header</h2>
	<p class="description">
		A persistent navigation element with logo, navigation items, and actions.
	</p>

	<div class="subsection">
		<h3>With Logo, Nav, and Actions</h3>
		<div class="header-preview">
			<Header sticky={false}>
				{#snippet logo()}
					<span class="logo-text">Logo</span>
				{/snippet}

				{#snippet nav()}
					<Button variant="ghost" color="secondary" size="sm">Home</Button>
					<Button variant="ghost" color="secondary" size="sm">About</Button>
					<Button variant="ghost" color="secondary" size="sm">Contact</Button>
				{/snippet}

				{#snippet actions()}
					<Button variant="outline" color="secondary" size="sm">Sign In</Button>
					<Button size="sm">Sign Up</Button>
				{/snippet}
			</Header>
		</div>
	</div>

	<div class="subsection">
		<h3>Minimal</h3>
		<div class="header-preview">
			<Header sticky={false}>
				{#snippet logo()}
					<span class="logo-text">Brand</span>
				{/snippet}

				{#snippet actions()}
					<Button size="sm">Get Started</Button>
				{/snippet}
			</Header>
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

	.header-preview {
		border: 1px solid var(--card-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.logo-text {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--header-text);
	}
</style>
