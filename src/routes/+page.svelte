<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import {
		ButtonShowcase,
		CardShowcase,
		CheckboxShowcase,
		InputShowcase,
		HeaderShowcase,
		AvatarShowcase,
		TooltipShowcase,
		PrimitiveTokensShowcase,
		SemanticTokensShowcase
	} from './_showcase';

	type Theme = 'light' | 'dark' | 'dev';
	const themes: Theme[] = ['light', 'dark', 'dev'];

	let theme = $state<Theme>('light');

	function nextTheme() {
		const currentIndex = themes.indexOf(theme);
		theme = themes[(currentIndex + 1) % themes.length];
		document.documentElement.setAttribute('data-theme', theme);
	}

	function getThemeLabel(t: Theme): string {
		return t.charAt(0).toUpperCase() + t.slice(1);
	}
</script>

<svelte:head>
	<title>Design System Showcase</title>
</svelte:head>

<div class="showcase">
	<header class="page-header">
		<h1>Design System</h1>
		<Button variant="outline" color="secondary" size="sm" onclick={nextTheme}>
			Theme: {getThemeLabel(theme)}
		</Button>
	</header>

	<main class="content">
		<ButtonShowcase />
		<CheckboxShowcase />
		<InputShowcase />
		<CardShowcase />
		<HeaderShowcase />
		<AvatarShowcase />
		<TooltipShowcase />
		<PrimitiveTokensShowcase />
		<SemanticTokensShowcase />
	</main>
</div>

<style>
	.showcase {
		min-height: 100vh;
		background-color: var(--page-bg);
	}

	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		border-bottom: 1px solid var(--header-border);
		background-color: var(--header-bg);
	}

	.page-header h1 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--header-text);
	}

	.content {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
</style>
