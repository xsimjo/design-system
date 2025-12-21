<script lang="ts">
	import ToastContainer from '$lib/components/toast/ToastContainer.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { toastStore } from '$lib/components/toast/toast.svelte.ts';

	type Position =
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';

	let position: Position = $state('top-right');

	function showSuccess() {
		toastStore.success('Success', 'Your changes have been saved successfully.');
	}

	function showError() {
		toastStore.error('Error', 'Something went wrong. Please try again.');
	}

	function showWarning() {
		toastStore.warning('Warning', 'Your session will expire in 5 minutes.');
	}

	function showInfo() {
		toastStore.info('Info', 'A new version is available.');
	}

	function showAll() {
		showSuccess();
		setTimeout(showError, 200);
		setTimeout(showWarning, 400);
		setTimeout(showInfo, 600);
	}
</script>

<ToastContainer {position} />

<section class="section">
	<h2 class="section-title">Toast</h2>
	<p class="description">
		Toast notifications for displaying brief, non-blocking messages to users.
	</p>

	<div class="subsection">
		<h3>Variants</h3>
		<div class="row">
			<Button size="sm" onclick={showSuccess}>Success</Button>
			<Button size="sm" color="danger" onclick={showError}>Error</Button>
			<Button size="sm" variant="outline" color="secondary" onclick={showWarning}>Warning</Button>
			<Button size="sm" variant="outline" color="secondary" onclick={showInfo}>Info</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Stacking</h3>
		<div class="row">
			<Button size="sm" variant="outline" color="secondary" onclick={showAll}
				>Show All Variants</Button
			>
			<Button size="sm" variant="ghost" color="secondary" onclick={() => toastStore.clear()}>
				Clear All
			</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Position</h3>
		<div class="row">
			<Button
				size="sm"
				variant={position === 'top-left' ? 'solid' : 'outline'}
				color="secondary"
				onclick={() => (position = 'top-left')}
			>
				Top Left
			</Button>
			<Button
				size="sm"
				variant={position === 'top-center' ? 'solid' : 'outline'}
				color="secondary"
				onclick={() => (position = 'top-center')}
			>
				Top Center
			</Button>
			<Button
				size="sm"
				variant={position === 'top-right' ? 'solid' : 'outline'}
				color="secondary"
				onclick={() => (position = 'top-right')}
			>
				Top Right
			</Button>
		</div>
		<div class="row">
			<Button
				size="sm"
				variant={position === 'bottom-left' ? 'solid' : 'outline'}
				color="secondary"
				onclick={() => (position = 'bottom-left')}
			>
				Bottom Left
			</Button>
			<Button
				size="sm"
				variant={position === 'bottom-center' ? 'solid' : 'outline'}
				color="secondary"
				onclick={() => (position = 'bottom-center')}
			>
				Bottom Center
			</Button>
			<Button
				size="sm"
				variant={position === 'bottom-right' ? 'solid' : 'outline'}
				color="secondary"
				onclick={() => (position = 'bottom-right')}
			>
				Bottom Right
			</Button>
		</div>
	</div>

	<div class="subsection">
		<h3>Custom Duration</h3>
		<div class="row">
			<Button
				size="sm"
				variant="outline"
				color="secondary"
				onclick={() => toastStore.info('Quick Toast', 'This disappears in 2 seconds.', 2000)}
			>
				2 seconds
			</Button>
			<Button
				size="sm"
				variant="outline"
				color="secondary"
				onclick={() => toastStore.info('Long Toast', 'This stays for 10 seconds.', 10000)}
			>
				10 seconds
			</Button>
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
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.row:last-child {
		margin-bottom: 0;
	}
</style>
