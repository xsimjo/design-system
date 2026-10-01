<script lang="ts">
	import Select from '$lib/components/select/Select.svelte';
	import type { SelectOption } from '$lib/components/select/Select.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import TokenGroup from './TokenGroup.svelte';
	import { TOKEN_DEFS, TOKEN_GROUPS } from '../lib/token-definitions.js';
	import type { BaseTheme } from '../lib/token-state.svelte.js';

	interface Props {
		baseTheme: BaseTheme;
		values: Record<string, string>;
		onBaseThemeChange?: (theme: BaseTheme) => void;
		onTokenChange?: (name: string, value: string) => void;
		onReset?: () => void;
	}

	let { baseTheme, values, onBaseThemeChange, onTokenChange, onReset }: Props = $props();

	let selectTheme = $derived(baseTheme);

	$effect(() => {
		if (selectTheme !== baseTheme) {
			onBaseThemeChange?.(selectTheme as BaseTheme);
		}
	});

	const themeOptions: SelectOption[] = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'dev', label: 'Developer' },
		{ value: 'qr', label: 'QR' }
	];

	const groupedTokens = $derived(
		TOKEN_GROUPS.map((group) => ({
			group,
			tokens: TOKEN_DEFS.filter((t) => t.group === group)
		})).filter((g) => g.tokens.length > 0)
	);
</script>

<div class="editor-panel">
	<div class="editor-panel__base-theme">
		<span class="editor-panel__label">Base Theme</span>
		<div class="editor-panel__theme-row">
			<Select bind:value={selectTheme} options={themeOptions} />
			<Button variant="outline" color="neutral" size="sm" onclick={onReset}>Reset</Button>
		</div>
	</div>

	<div class="editor-panel__groups">
		{#each groupedTokens as { group, tokens } (group)}
			<TokenGroup {group} {tokens} {values} onchange={onTokenChange} />
		{/each}
	</div>
</div>

<style>
	.editor-panel {
		display: flex;
		flex-direction: column;
		gap: calc(var(--ui-base-spacing) * 4);
	}

	.editor-panel__base-theme {
		display: flex;
		flex-direction: column;
		gap: var(--ui-base-spacing);
	}

	.editor-panel__label {
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-semibold);
		color: var(--ui-surface-foreground);
	}

	.editor-panel__theme-row {
		display: flex;
		align-items: center;
		gap: var(--ui-base-spacing);
	}

	.editor-panel__groups {
		display: flex;
		flex-direction: column;
		gap: var(--ui-base-spacing);
	}
</style>
