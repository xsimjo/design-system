<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';

	let theme = $state<'light' | 'dark'>('light');

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<svelte:head>
	<title>Design System Showcase</title>
</svelte:head>

<div class="showcase">
	<header class="header">
		<h1>Design System</h1>
		<Button variant="secondary" size="sm" onclick={toggleTheme}>
			Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
		</Button>
	</header>

	<main class="content">
		<section class="section">
			<h2>Button</h2>
			<p class="description">A versatile button component with multiple variants and sizes.</p>

			<div class="subsection">
				<h3>Variants</h3>
				<div class="row">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
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
				<h3>States</h3>
				<div class="row">
					<Button variant="primary">Default</Button>
					<Button variant="primary" disabled>Disabled</Button>
				</div>
				<div class="row">
					<Button variant="secondary">Default</Button>
					<Button variant="secondary" disabled>Disabled</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>All Combinations</h3>
				<div class="grid">
					<Button variant="primary" size="sm">Primary SM</Button>
					<Button variant="primary" size="md">Primary MD</Button>
					<Button variant="primary" size="lg">Primary LG</Button>
					<Button variant="secondary" size="sm">Secondary SM</Button>
					<Button variant="secondary" size="md">Secondary MD</Button>
					<Button variant="secondary" size="lg">Secondary LG</Button>
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	.showcase {
		min-height: 100vh;
		background-color: var(--color-slate-50);
	}

	:global([data-theme='dark']) .showcase {
		background-color: var(--color-slate-900);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		border-bottom: 1px solid var(--color-slate-200);
		background-color: var(--color-white);
	}

	:global([data-theme='dark']) .header {
		border-color: var(--color-slate-700);
		background-color: var(--color-slate-800);
	}

	.header h1 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-slate-900);
	}

	:global([data-theme='dark']) .header h1 {
		color: var(--color-white);
	}

	.content {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-8);
	}

	.section {
		background-color: var(--color-white);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		box-shadow: var(--shadow-sm);
	}

	:global([data-theme='dark']) .section {
		background-color: var(--color-slate-800);
	}

	.section h2 {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-slate-900);
	}

	:global([data-theme='dark']) .section h2 {
		color: var(--color-white);
	}

	.description {
		margin: 0 0 var(--space-6) 0;
		color: var(--color-slate-600);
	}

	:global([data-theme='dark']) .description {
		color: var(--color-slate-400);
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
		color: var(--color-slate-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global([data-theme='dark']) .subsection h3 {
		color: var(--color-slate-400);
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

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: var(--space-3);
	}
</style>
