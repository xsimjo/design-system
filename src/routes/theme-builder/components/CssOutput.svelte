<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import { TOKEN_DEFS } from '../lib/token-definitions.js';

	interface Props {
		values: Record<string, string>;
	}

	let { values }: Props = $props();

	let isCopied = $state(false);

	const cssOutput = $derived(
		`[data-theme='custom'] {\n${TOKEN_DEFS.map((t) => `\t${t.name}: ${values[t.name]};`).join('\n')}\n}`
	);

	async function copyToClipboard() {
		await navigator.clipboard.writeText(cssOutput);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}
</script>

<div class="css-output">
	<div class="css-output__header">
		<span class="css-output__title">Generated CSS</span>
		<Button
			variant="outline"
			color={isCopied ? 'success' : 'secondary'}
			size="sm"
			onclick={copyToClipboard}
		>
			{#if isCopied}
				<CheckIcon size={14} />
				Copied
			{:else}
				<CopyIcon size={14} />
				Copy CSS
			{/if}
		</Button>
	</div>
	<pre class="css-output__code"><code>{cssOutput}</code></pre>
</div>

<style>
	.css-output {
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		overflow: hidden;
	}

	.css-output__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--ui-base-spacing) * 1.5) calc(var(--ui-base-spacing) * 2);
		border-bottom: 1px solid var(--ui-border);
		background: var(--ui-surface-raised);
	}

	.css-output__title {
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-semibold);
		color: var(--ui-surface-foreground);
	}

	.css-output__code {
		padding: calc(var(--ui-base-spacing) * 2);
		margin: 0;
		overflow-x: auto;
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-xs);
		line-height: var(--ui-leading-relaxed);
		color: var(--ui-surface-foreground);
		background: var(--ui-surface);
		max-height: 400px;
		overflow-y: auto;
	}
</style>
