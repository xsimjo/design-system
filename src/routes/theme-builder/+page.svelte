<script lang="ts">
	import SiteHeader from '$internal/SiteHeader.svelte';
	import EditorPanel from './components/EditorPanel.svelte';
	import PreviewPanel from './components/PreviewPanel.svelte';
	import CssOutput from './components/CssOutput.svelte';
	import { TOKEN_DEFS } from './lib/token-definitions.js';
	import { BASE_THEME_DEFAULTS } from './lib/token-state.svelte.js';
	import type { BaseTheme } from './lib/token-state.svelte.js';

	let baseTheme = $state<BaseTheme>('light');
	let values: Record<string, string> = $state(structuredClone(BASE_THEME_DEFAULTS['light']));

	function handleBaseThemeChange(theme: BaseTheme) {
		baseTheme = theme;
		const defaults = BASE_THEME_DEFAULTS[theme];
		for (const key of Object.keys(values)) {
			if (key in defaults) {
				values[key] = defaults[key];
			}
		}
	}

	function handleTokenChange(name: string, value: string) {
		values[name] = value;
	}

	function handleReset() {
		handleBaseThemeChange(baseTheme);
	}

	const styleAttr = $derived(TOKEN_DEFS.map((t) => `${t.name}: ${values[t.name]}`).join('; '));
</script>

<svelte:head>
	<title>Theme Builder - Greenfield UI</title>
</svelte:head>

<div class="theme-builder">
	<SiteHeader />

	<div class="theme-builder__body">
		<aside class="theme-builder__editor">
			<EditorPanel
				{baseTheme}
				{values}
				onBaseThemeChange={handleBaseThemeChange}
				onTokenChange={handleTokenChange}
				onReset={handleReset}
			/>
		</aside>

		<main class="theme-builder__preview">
			<PreviewPanel {styleAttr} />
			<CssOutput {values} />
		</main>
	</div>
</div>

<style>
	.theme-builder {
		min-height: 100vh;
		background-color: var(--ui-surface);
		display: flex;
		flex-direction: column;
	}

	.theme-builder__body {
		display: grid;
		grid-template-columns: 420px 1fr;
		gap: calc(var(--ui-base-spacing) * 6);
		max-width: 1500px;
		width: 100%;
		margin: 0 auto;
		padding: calc(var(--ui-base-spacing) * 6);
	}

	.theme-builder__editor {
		max-height: calc(100vh - 80px);
		overflow-y: auto;
		position: sticky;
		top: 80px;
	}

	.theme-builder__preview {
		display: flex;
		flex-direction: column;
		gap: calc(var(--ui-base-spacing) * 6);
	}

	@media (max-width: 1024px) {
		.theme-builder__body {
			grid-template-columns: 1fr;
			padding: calc(var(--ui-base-spacing) * 4);
		}

		.theme-builder__editor {
			max-height: none;
			position: static;
		}
	}
</style>
