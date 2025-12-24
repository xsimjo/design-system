<script lang="ts">
	import Drawer from '$lib/components/drawer/Drawer.svelte';
	import Button from '$lib/components/button/Button.svelte';

	let basicOpen = $state(false);
	let leftOpen = $state(false);
	let smallOpen = $state(false);
	let largeOpen = $state(false);
	let persistentOpen = $state(false);
	let customHeaderOpen = $state(false);
	let noCloseOpen = $state(false);
</script>

<section class="section">
	<h2 class="section-title">Drawer</h2>
	<p class="description">
		A slide-in panel component for displaying contextual content, navigation, or forms that overlay
		the main content.
	</p>

	<div class="subsection">
		<h3>Basic Drawer</h3>
		<div class="row">
			<Button size="sm" onclick={() => (basicOpen = true)}>Open Drawer</Button>
		</div>
		<Drawer bind:open={basicOpen} title="Settings">
			<p>Adjust your application settings here. Changes are saved automatically.</p>
			<p>
				The drawer slides in from the side and can contain any content including forms, navigation
				menus, or detailed information.
			</p>

			{#snippet footer()}
				<Button variant="ghost" color="secondary" size="sm" onclick={() => (basicOpen = false)}>
					Cancel
				</Button>
				<Button size="sm" onclick={() => (basicOpen = false)}>Save Changes</Button>
			{/snippet}
		</Drawer>
	</div>

	<div class="subsection">
		<h3>Placement</h3>
		<div class="row">
			<Button variant="outline" color="secondary" size="sm" onclick={() => (leftOpen = true)}>
				Left
			</Button>
			<Button variant="outline" color="secondary" size="sm" onclick={() => (basicOpen = true)}>
				Right (default)
			</Button>
		</div>
		<Drawer bind:open={leftOpen} title="Navigation" placement="left">
			<nav class="nav-links">
				<a href="#home" class="nav-link">Home</a>
				<a href="#about" class="nav-link">About</a>
				<a href="#services" class="nav-link">Services</a>
				<a href="#contact" class="nav-link">Contact</a>
			</nav>
			{#snippet footer()}
				<Button size="sm" onclick={() => (leftOpen = false)}>Close</Button>
			{/snippet}
		</Drawer>
	</div>

	<div class="subsection">
		<h3>Size Variants</h3>
		<div class="row">
			<Button variant="outline" color="secondary" size="sm" onclick={() => (smallOpen = true)}>
				Small
			</Button>
			<Button variant="outline" color="secondary" size="sm" onclick={() => (basicOpen = true)}>
				Medium (default)
			</Button>
			<Button variant="outline" color="secondary" size="sm" onclick={() => (largeOpen = true)}>
				Large
			</Button>
		</div>
		<Drawer bind:open={smallOpen} title="Quick Actions" size="sm">
			<p>A compact drawer for quick actions or brief content.</p>
			{#snippet footer()}
				<Button size="sm" onclick={() => (smallOpen = false)}>Close</Button>
			{/snippet}
		</Drawer>
		<Drawer bind:open={largeOpen} title="Product Details" size="lg">
			<p>
				This is a large drawer suitable for displaying detailed content, forms with many fields, or
				complex data views.
			</p>
			<p>
				The extra width provides more room for multi-column layouts, large images, or data tables.
			</p>
			<p>
				You might use this size for product detail views, user profiles, or configuration panels.
			</p>
			{#snippet footer()}
				<Button size="sm" onclick={() => (largeOpen = false)}>Close</Button>
			{/snippet}
		</Drawer>
	</div>

	<div class="subsection">
		<h3>Persistent Drawer</h3>
		<div class="row">
			<Button variant="outline" color="secondary" size="sm" onclick={() => (persistentOpen = true)}>
				Open Persistent
			</Button>
		</div>
		<Drawer
			bind:open={persistentOpen}
			title="Important Form"
			closeOnClickOutside={false}
			closeOnEscape={false}
		>
			<p>This drawer cannot be closed by clicking outside or pressing Escape.</p>
			<p>
				Use this pattern for forms or flows that require completion before the user can continue.
			</p>

			{#snippet footer()}
				<Button size="sm" onclick={() => (persistentOpen = false)}>Complete</Button>
			{/snippet}
		</Drawer>
	</div>

	<div class="subsection">
		<h3>Custom Header</h3>
		<div class="row">
			<Button
				variant="outline"
				color="secondary"
				size="sm"
				onclick={() => (customHeaderOpen = true)}
			>
				Custom Header
			</Button>
		</div>
		<Drawer bind:open={customHeaderOpen}>
			{#snippet header()}
				<div class="custom-header">
					<span class="custom-header-badge">BETA</span>
					<span class="custom-header-title">New Feature</span>
				</div>
			{/snippet}

			<p>You can customize the header with your own content using the header snippet.</p>
			<p>This is useful for adding badges, icons, or custom layouts to the drawer header.</p>

			{#snippet footer()}
				<Button size="sm" onclick={() => (customHeaderOpen = false)}>Got it</Button>
			{/snippet}
		</Drawer>
	</div>

	<div class="subsection">
		<h3>Without Close Button</h3>
		<div class="row">
			<Button variant="outline" color="secondary" size="sm" onclick={() => (noCloseOpen = true)}>
				No Close Button
			</Button>
		</div>
		<Drawer bind:open={noCloseOpen} title="Information" showCloseButton={false}>
			<p>This drawer has no close button in the header.</p>
			<p>Use the footer buttons or press Escape to close.</p>

			{#snippet footer()}
				<Button variant="ghost" color="secondary" size="sm" onclick={() => (noCloseOpen = false)}>
					Dismiss
				</Button>
			{/snippet}
		</Drawer>
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
		gap: var(--space-3);
	}

	.nav-links {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.nav-link {
		padding: var(--space-2) var(--space-3);
		color: var(--drawer-text);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: background-color 0.15s;
	}

	.nav-link:hover {
		background-color: var(--drawer-close-bg-hover);
	}

	.custom-header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.custom-header-badge {
		display: inline-block;
		padding: 2px 8px;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		background-color: var(--button-color-primary);
		color: white;
		border-radius: var(--radius-sm);
	}

	.custom-header-title {
		font-size: var(--drawer-title-font-size);
		font-weight: var(--drawer-title-font-weight);
		color: var(--drawer-title-color);
	}
</style>
