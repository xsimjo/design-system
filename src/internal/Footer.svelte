<script lang="ts">
	import { resolve } from '$app/paths';
	import type { HTMLAttributes } from 'svelte/elements';
	import PaletteIcon from '$lib/icons/PaletteIcon.svelte';

	interface Props extends HTMLAttributes<HTMLElement> {
		maxWidth?: string;
	}

	let { maxWidth = '1500px', ...restProps }: Props = $props();
</script>

<footer class="footer" {...restProps}>
	<div class="footer-inner" style:max-width={maxWidth}>
		<div class="footer-brand">
			<div class="footer-logo">
				<PaletteIcon size={22} />
				<span class="footer-logo-text">Greenfield UI</span>
			</div>
			<p class="footer-tagline">Built with Svelte 5</p>
		</div>

		<nav class="footer-links">
			<span class="footer-links-title">Resources</span>
			<a href={resolve('/docs')}>Documentation</a>
			<a href={resolve('/docs/button')}>Components</a>
			<a href={resolve('/docs/theming')}>Theming</a>
			<a href={resolve('/docs/installation')}>Installation</a>
		</nav>

		<div class="footer-meta">
			<span class="footer-links-title">Package</span>
			<span class="footer-package">@xsimjo/design-system</span>
			<span class="footer-version">v0.0.22</span>
			<span class="footer-license">MIT License</span>
		</div>
	</div>

	<div class="footer-bottom" style:max-width={maxWidth}>
		<span class="footer-copyright">&copy; 2024–2026 Greenfield UI</span>
	</div>
</footer>

<style>
	.footer {
		margin-top: auto;
		border-top: 1px solid var(--ui-border);
		background-color: var(--ui-surface);
		padding: var(--space-12) var(--space-6) 0;
	}

	.footer-inner {
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: var(--space-12);
		padding-bottom: var(--space-10);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--ui-surface-foreground);
	}

	.footer-logo-text {
		font-size: var(--ui-text-base);
		font-weight: var(--ui-weight-bold);
		letter-spacing: -0.01em;
	}

	.footer-tagline {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 50%);
		margin: 0;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.footer-links-title {
		font-size: var(--ui-text-xs);
		font-weight: var(--ui-weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-bottom: var(--space-1);
	}

	.footer-links a {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 25%);
		text-decoration: none;
		transition: color var(--ui-base-duration) var(--ui-base-easing);
	}

	.footer-links a:hover {
		color: var(--ui-primary);
	}

	.footer-meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.footer-package {
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 25%);
	}

	.footer-version,
	.footer-license {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 50%);
	}

	.footer-bottom {
		margin: 0 auto;
		padding: var(--space-4) 0;
		border-top: 1px solid var(--ui-border);
	}

	.footer-copyright {
		font-size: var(--ui-text-xs);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 60%);
	}

	@media (max-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr;
			gap: var(--space-8);
		}
	}
</style>
