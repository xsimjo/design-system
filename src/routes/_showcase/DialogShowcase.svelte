<script lang="ts">
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import Button from '$lib/components/button/Button.svelte';

	let basicOpen = $state(false);
	let smallOpen = $state(false);
	let largeOpen = $state(false);
	let persistentOpen = $state(false);
	let customHeaderOpen = $state(false);
	let noCloseOpen = $state(false);
</script>

<section class="section">
	<h2 class="section-title">Dialog</h2>
	<p class="description">
		A modal dialog component for displaying content that requires user attention or interaction.
	</p>

	<div class="subsection">
		<h3>Basic Dialog</h3>
		<div class="row">
			<Button size="sm" onclick={() => (basicOpen = true)}>Open Dialog</Button>
		</div>
		<Dialog
			bind:open={basicOpen}
			title="Confirm Action"
			description="Are you sure you want to proceed with this action?"
		>
			<p>This action will update your settings. You can always change them later.</p>

			{#snippet footer()}
				<Button variant="ghost" color="secondary" size="sm" onclick={() => (basicOpen = false)}>
					Cancel
				</Button>
				<Button size="sm" onclick={() => (basicOpen = false)}>Confirm</Button>
			{/snippet}
		</Dialog>
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
		<Dialog bind:open={smallOpen} title="Small Dialog" size="sm">
			<p>This is a small dialog with less width.</p>
			{#snippet footer()}
				<Button size="sm" onclick={() => (smallOpen = false)}>Close</Button>
			{/snippet}
		</Dialog>
		<Dialog bind:open={largeOpen} title="Large Dialog" size="lg">
			<p>This is a large dialog with more width, suitable for displaying more content.</p>
			<p>You can use this for forms, detailed information, or complex interactions.</p>
			{#snippet footer()}
				<Button size="sm" onclick={() => (largeOpen = false)}>Close</Button>
			{/snippet}
		</Dialog>
	</div>

	<div class="subsection">
		<h3>Persistent Dialog</h3>
		<div class="row">
			<Button variant="outline" color="secondary" size="sm" onclick={() => (persistentOpen = true)}>
				Open Persistent
			</Button>
		</div>
		<Dialog
			bind:open={persistentOpen}
			title="Required Action"
			description="You must complete this action to continue."
			closeOnClickOutside={false}
			closeOnEscape={false}
		>
			<p>This dialog cannot be closed by clicking outside or pressing Escape.</p>
			<p>You must use the button to close it.</p>

			{#snippet footer()}
				<Button size="sm" onclick={() => (persistentOpen = false)}>I Understand</Button>
			{/snippet}
		</Dialog>
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
		<Dialog bind:open={customHeaderOpen}>
			{#snippet header()}
				<div class="custom-header">
					<span class="custom-header-badge">NEW</span>
					<span class="custom-header-title">Feature Announcement</span>
				</div>
			{/snippet}

			<p>You can customize the header with your own content using the header snippet.</p>

			{#snippet footer()}
				<Button size="sm" onclick={() => (customHeaderOpen = false)}>Got it</Button>
			{/snippet}
		</Dialog>
	</div>

	<div class="subsection">
		<h3>Without Close Button</h3>
		<div class="row">
			<Button variant="outline" color="secondary" size="sm" onclick={() => (noCloseOpen = true)}>
				No Close Button
			</Button>
		</div>
		<Dialog bind:open={noCloseOpen} title="Simple Message" showCloseButton={false}>
			<p>This dialog has no close button in the header. Use the footer buttons or press Escape.</p>

			{#snippet footer()}
				<Button variant="ghost" color="secondary" size="sm" onclick={() => (noCloseOpen = false)}>
					Dismiss
				</Button>
			{/snippet}
		</Dialog>
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
		font-size: var(--dialog-title-font-size);
		font-weight: var(--dialog-title-font-weight);
		color: var(--dialog-title-color);
	}
</style>
