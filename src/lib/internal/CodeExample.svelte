<script lang="ts">
	import type { Snippet } from 'svelte';
	import { codeToHtml } from 'shiki';
	import Button from '$lib/components/button/Button.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';

	interface Props {
		code: string;
		children: Snippet;
		previewClass?: string;
	}

	let { code, children, previewClass = '' }: Props = $props();

	let highlightedHtml = $state('');
	let copied = $state(false);

	$effect(() => {
		codeToHtml(code, {
			lang: 'svelte',
			theme: 'github-dark'
		}).then((html) => {
			highlightedHtml = html;
		});
	});

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			console.error('Failed to copy to clipboard');
		}
	}
</script>

<div class="code-example">
	<div class="code-example__preview {previewClass}">
		{@render children()}
	</div>
	<div class="code-example__code">
		<div class="code-example__copy">
			<Button
				variant="ghost"
				color={copied ? 'success' : 'secondary'}
				size="sm"
				icon
				onclick={copyToClipboard}
			>
				{#if copied}
					<CheckIcon size={18} />
				{:else}
					<CopyIcon size={18} />
				{/if}
			</Button>
		</div>
		<div class="code-example__content">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- Shiki generates safe HTML -->
			{@html highlightedHtml}
		</div>
	</div>
</div>

<style>
	.code-example {
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-radius);
		overflow: hidden;
	}

	.code-example__preview {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--ui-surface);
	}

	.code-example__preview:global(.aligned) {
		align-items: center;
	}

	.code-example__preview:global(.column) {
		flex-direction: column;
		max-width: 400px;
	}

	.code-example__code {
		position: relative;
		border-top: 1px solid var(--ui-border);
	}

	.code-example__copy {
		position: absolute;
		top: var(--space-2);
		right: var(--space-3);
		z-index: 1;
	}

	.code-example__copy :global(button) {
		color: #fff !important;
		--button-color: #fff !important;
	}

	.code-example__copy :global(button:hover) {
		background: rgba(255, 255, 255, 0.1) !important;
	}

	.code-example__copy :global(svg) {
		color: #fff !important;
		stroke: #fff !important;
	}

	.code-example__content {
		overflow-x: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--ui-border) transparent;
	}

	.code-example__content::-webkit-scrollbar {
		height: 6px;
	}

	.code-example__content::-webkit-scrollbar-track {
		background: transparent;
	}

	.code-example__content::-webkit-scrollbar-thumb {
		background-color: var(--ui-border);
		border-radius: 3px;
	}

	.code-example__content :global(pre) {
		margin: 0;
		padding: var(--space-4);
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-sm);
		font-variant-ligatures: none;
		line-height: 1.6;
		border-radius: 0;
	}

	.code-example__content :global(code) {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}
</style>
