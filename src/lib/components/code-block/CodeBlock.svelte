<script lang="ts">
	import { codeToHtml } from 'shiki';
	import Button from '../button/Button.svelte';
	import CopyIcon from '../../icons/CopyIcon.svelte';
	import CheckIcon from '../../icons/CheckIcon.svelte';

	interface Props {
		code: string;
		language?: string;
		showLineNumbers?: boolean;
		showHeader?: boolean;
	}

	let { code, language = 'text', showLineNumbers = false, showHeader = true }: Props = $props();

	let highlightedHtml = $state('');
	let copied = $state(false);

	$effect(() => {
		codeToHtml(code, {
			lang: language,
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

<div class="codeblock" class:codeblock--line-numbers={showLineNumbers}>
	{#if showHeader}
		<div class="codeblock__header">
			<span class="codeblock__language">{language}</span>
		</div>
	{/if}
	<div class="codeblock__body">
		<div class="codeblock__copy">
			<Button
				variant="soft"
				color={copied ? 'success' : 'secondary'}
				size="sm"
				onclick={copyToClipboard}
			>
				{#if copied}
					<CheckIcon size={14} />
					Copied
				{:else}
					<CopyIcon size={14} />
					Copy
				{/if}
			</Button>
		</div>
		<div class="codeblock__content">
			{#if showLineNumbers}
				<div class="codeblock__line-numbers" aria-hidden="true">
					{#each Array.from({ length: code.split('\n').length }, (_, i) => i) as lineNum (lineNum)}
						<span class="codeblock__line-number">{lineNum + 1}</span>
					{/each}
				</div>
			{/if}
			<div class="codeblock__code">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- Shiki generates safe HTML -->
				{@html highlightedHtml}
			</div>
		</div>
	</div>
</div>

<style>
	.codeblock {
		background-color: var(--codeblock-bg);
		border: var(--codeblock-border-width) solid var(--codeblock-border);
		border-radius: var(--codeblock-border-radius);
		box-shadow: var(--codeblock-shadow);
		overflow: hidden;
	}

	.codeblock__header {
		background-color: var(--codeblock-header-bg);
		border-bottom: var(--codeblock-header-border-width) solid var(--codeblock-header-border);
		padding: var(--codeblock-header-padding-y) var(--codeblock-header-padding-x);
	}

	.codeblock__language {
		color: var(--codeblock-language-color);
		font-family: var(--codeblock-font-family);
		font-size: var(--codeblock-language-font-size);
		font-weight: var(--codeblock-language-font-weight);
		text-transform: lowercase;
	}

	.codeblock__body {
		position: relative;
	}

	.codeblock__copy {
		position: absolute;
		top: var(--codeblock-padding-y);
		right: var(--codeblock-padding-x);
		z-index: 1;
	}

	.codeblock__content {
		display: flex;
		max-height: var(--codeblock-max-height);
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--codeblock-scrollbar-thumb) var(--codeblock-scrollbar-track);
	}

	.codeblock__content::-webkit-scrollbar {
		width: var(--codeblock-scrollbar-width);
		height: var(--codeblock-scrollbar-width);
	}

	.codeblock__content::-webkit-scrollbar-track {
		background: var(--codeblock-scrollbar-track);
	}

	.codeblock__content::-webkit-scrollbar-thumb {
		background-color: var(--codeblock-scrollbar-thumb);
		border-radius: var(--codeblock-scrollbar-width);
	}

	.codeblock__content::-webkit-scrollbar-thumb:hover {
		background-color: var(--codeblock-scrollbar-thumb-hover);
	}

	.codeblock__line-numbers {
		display: flex;
		flex-direction: column;
		padding: var(--codeblock-padding-y) 0;
		padding-left: var(--codeblock-padding-x);
		padding-right: var(--codeblock-line-number-gap);
		border-right: 1px solid var(--codeblock-border);
		user-select: none;
		position: sticky;
		left: 0;
		background-color: var(--codeblock-bg);
	}

	.codeblock__line-number {
		color: var(--codeblock-line-number-color);
		font-family: var(--codeblock-font-family);
		font-size: var(--codeblock-font-size);
		line-height: var(--codeblock-line-height);
		text-align: right;
		min-width: var(--codeblock-line-number-width);
	}

	.codeblock__code {
		flex: 1;
		min-width: 0;
		padding: var(--codeblock-padding-y) var(--codeblock-padding-x);
	}

	.codeblock__code :global(pre) {
		margin: 0;
		padding: 0;
		background: transparent !important;
		font-family: var(--codeblock-font-family);
		font-size: var(--codeblock-font-size);
		line-height: var(--codeblock-line-height);
		overflow: visible;
	}

	.codeblock__code :global(code) {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	.codeblock--line-numbers .codeblock__code {
		padding-left: 0;
	}
</style>
