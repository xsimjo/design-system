<script lang="ts">
	import TokenRow from './TokenRow.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import type { TokenMeta } from '../lib/token-definitions.js';

	interface Props {
		group: string;
		tokens: TokenMeta[];
		values: Record<string, string>;
		onchange?: (name: string, value: string) => void;
	}

	let { group, tokens, values, onchange }: Props = $props();

	let isOpen = $state(true);

	const groupId = $derived(`token-group-${group.toLowerCase().replace(/\s+/g, '-')}`);
	const contentId = $derived(`${groupId}-content`);
</script>

<section class="token-group" id={groupId}>
	<button
		class="token-group__header"
		type="button"
		aria-expanded={isOpen}
		aria-controls={contentId}
		onclick={() => (isOpen = !isOpen)}
	>
		<span class="token-group__title">{group}</span>
		<Badge label={String(tokens.length)} variant="neutral" size="sm" />
		<span class="token-group__chevron" class:token-group__chevron--open={isOpen}> &#9654; </span>
	</button>
	{#if isOpen}
		<div class="token-group__body" id={contentId}>
			{#each tokens as token (token.name)}
				<TokenRow meta={token} value={values[token.name]} {onchange} />
			{/each}
		</div>
	{/if}
</section>

<style>
	.token-group {
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		background: var(--ui-surface-raised);
		overflow: hidden;
	}

	.token-group__header {
		display: flex;
		align-items: center;
		gap: var(--ui-base-spacing);
		width: 100%;
		padding: calc(var(--ui-base-spacing) * 3) calc(var(--ui-base-spacing) * 4);
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--ui-text-base);
		font-weight: var(--ui-weight-semibold);
		color: var(--ui-surface-foreground);
		font-family: inherit;
		text-align: left;
	}

	.token-group__header:hover {
		background: color-mix(
			in oklch,
			var(--ui-surface-raised),
			var(--ui-hover-mix) var(--ui-hover-amount)
		);
	}

	.token-group__title {
		flex: 1;
	}

	.token-group__chevron {
		font-size: var(--ui-text-xs);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 50%);
		transition: transform var(--ui-base-duration) var(--ui-base-easing);
	}

	.token-group__chevron--open {
		transform: rotate(90deg);
	}

	.token-group__body {
		padding: 0 calc(var(--ui-base-spacing) * 4) calc(var(--ui-base-spacing) * 3);
	}
</style>
