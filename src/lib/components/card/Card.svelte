<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		interactive?: boolean;
		padding?: boolean;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let { interactive = false, padding = true, header, footer, children }: Props = $props();
</script>

<div class="card" class:card--interactive={interactive}>
	{#if header}
		<div class="card-header">
			{@render header()}
		</div>
	{/if}

	<div class="card-body" class:card-body--padded={padding}>
		{@render children()}
	</div>

	{#if footer}
		<div class="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.card {
		background-color: var(--card-bg);
		border: var(--card-border-width) solid var(--card-border);
		border-radius: var(--card-radius);
		box-shadow: var(--card-shadow);
		color: var(--card-text);
		transition: var(--card-transition);
	}

	.card--interactive {
		cursor: pointer;
	}

	.card--interactive:hover {
		box-shadow: var(--card-hover-shadow);
		border-color: var(--card-hover-border);
	}

	.card-header {
		padding: var(--card-header-padding);
		background-color: var(--card-header-bg);
		border-bottom: var(--card-header-border-width) solid var(--card-header-border);
	}

	.card-body--padded {
		padding: var(--card-body-padding);
	}

	.card-footer {
		padding: var(--card-footer-padding);
		background-color: var(--card-footer-bg);
		border-top: var(--card-footer-border-width) solid var(--card-footer-border);
	}
</style>
