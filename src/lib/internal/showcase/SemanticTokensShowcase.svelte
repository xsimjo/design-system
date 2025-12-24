<script lang="ts">
	import { Card } from '$lib/components/card';

	const semanticTokens = {
		Typography: ['--font-sans', '--font-mono'],
		Page: ['--page-bg', '--page-text'],
		Header: ['--header-bg', '--header-border', '--header-text'],
		Card: ['--card-bg', '--card-border', '--card-shadow', '--card-radius'],
		Section: ['--section-title', '--section-description', '--section-label'],
		'Button - Primary': [
			'--button-primary-bg',
			'--button-primary-bg-hover',
			'--button-primary-bg-active',
			'--button-primary-bg-disabled',
			'--button-primary-text',
			'--button-primary-text-hover',
			'--button-primary-text-active',
			'--button-primary-text-disabled',
			'--button-primary-border',
			'--button-primary-border-hover',
			'--button-primary-border-active',
			'--button-primary-border-disabled',
			'--button-primary-focus-ring'
		],
		'Button - Secondary': [
			'--button-secondary-bg',
			'--button-secondary-bg-hover',
			'--button-secondary-bg-active',
			'--button-secondary-bg-disabled',
			'--button-secondary-text',
			'--button-secondary-text-hover',
			'--button-secondary-text-active',
			'--button-secondary-text-disabled',
			'--button-secondary-border',
			'--button-secondary-border-hover',
			'--button-secondary-border-active',
			'--button-secondary-border-disabled',
			'--button-secondary-focus-ring'
		],
		'Button - Sizing': [
			'--button-sm-height',
			'--button-sm-padding-x',
			'--button-sm-padding-y',
			'--button-sm-font-size',
			'--button-sm-gap',
			'--button-sm-icon-size',
			'--button-md-height',
			'--button-md-padding-x',
			'--button-md-padding-y',
			'--button-md-font-size',
			'--button-md-gap',
			'--button-md-icon-size',
			'--button-lg-height',
			'--button-lg-padding-x',
			'--button-lg-padding-y',
			'--button-lg-font-size',
			'--button-lg-gap',
			'--button-lg-icon-size'
		],
		'Button - Shared': [
			'--button-font-family',
			'--button-font-weight',
			'--button-line-height',
			'--button-border-width',
			'--button-border-radius',
			'--button-shadow',
			'--button-shadow-hover',
			'--button-shadow-active',
			'--button-shadow-disabled',
			'--button-focus-ring-width',
			'--button-focus-ring-offset',
			'--button-focus-ring-opacity',
			'--button-transition',
			'--button-opacity-disabled',
			'--button-cursor-default',
			'--button-cursor-disabled'
		],
		'Avatar - Sizing': [
			'--avatar-sm-size',
			'--avatar-sm-font-size',
			'--avatar-sm-icon-size',
			'--avatar-md-size',
			'--avatar-md-font-size',
			'--avatar-md-icon-size',
			'--avatar-lg-size',
			'--avatar-lg-font-size',
			'--avatar-lg-icon-size'
		],
		'Avatar - Appearance': [
			'--avatar-bg',
			'--avatar-text',
			'--avatar-border',
			'--avatar-border-width',
			'--avatar-radius-circle',
			'--avatar-font-family',
			'--avatar-font-weight',
			'--avatar-transition'
		],
		'Avatar - Status': [
			'--avatar-status-size-sm',
			'--avatar-status-size-md',
			'--avatar-status-size-lg',
			'--avatar-status-border-width',
			'--avatar-status-border-color',
			'--avatar-status-online-bg',
			'--avatar-status-offline-bg',
			'--avatar-status-away-bg',
			'--avatar-status-busy-bg'
		],
		Tooltip: [
			'--tooltip-bg',
			'--tooltip-text',
			'--tooltip-shadow',
			'--tooltip-radius',
			'--tooltip-padding-x',
			'--tooltip-padding-y',
			'--tooltip-font-family',
			'--tooltip-font-size',
			'--tooltip-arrow-size',
			'--tooltip-arrow-color'
		]
	};

	function isVisualToken(token: string): boolean {
		return (
			token.includes('-bg') ||
			token.includes('-text') ||
			token.includes('-border') ||
			token.includes('-ring')
		);
	}
</script>

<Card>
	<h2 class="section-title">Semantic Tokens</h2>
	<p class="description">Purpose-driven tokens that change based on the active theme.</p>

	{#each Object.entries(semanticTokens) as [category, tokens] (category)}
		<div class="subsection">
			<h3>{category}</h3>
			<div class="token-list">
				{#each tokens as token (token)}
					<div class="token-item">
						{#if isVisualToken(token)}
							<span class="token-swatch" style="background-color: var({token});"></span>
						{/if}
						<code class="token-name">{token}</code>
						<span class="token-value">var({token})</span>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</Card>

<style>
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

	.token-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.token-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2);
		background-color: var(--page-bg);
		border-radius: var(--radius-sm);
	}

	.token-swatch {
		width: 24px;
		height: 24px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--header-border);
		flex-shrink: 0;
	}

	.token-name {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--section-title);
		flex-shrink: 0;
	}

	.token-value {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--section-label);
		margin-left: auto;
	}
</style>
