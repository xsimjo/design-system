<script lang="ts">
	import { Card } from '$lib/components/card';

	const primitiveTokens = {
		'Colors - Blue': [
			'--color-blue-50',
			'--color-blue-100',
			'--color-blue-200',
			'--color-blue-300',
			'--color-blue-400',
			'--color-blue-500',
			'--color-blue-600',
			'--color-blue-700',
			'--color-blue-800',
			'--color-blue-900',
			'--color-blue-950'
		],
		'Colors - Slate': [
			'--color-slate-50',
			'--color-slate-100',
			'--color-slate-200',
			'--color-slate-300',
			'--color-slate-400',
			'--color-slate-500',
			'--color-slate-600',
			'--color-slate-700',
			'--color-slate-800',
			'--color-slate-900',
			'--color-slate-950'
		],
		'Colors - Gray': [
			'--color-white',
			'--color-black',
			'--color-gray-50',
			'--color-gray-100',
			'--color-gray-200',
			'--color-gray-300',
			'--color-gray-400',
			'--color-gray-500',
			'--color-gray-600',
			'--color-gray-700',
			'--color-gray-800',
			'--color-gray-900',
			'--color-gray-950'
		],
		Spacing: [
			'--space-0',
			'--space-1',
			'--space-2',
			'--space-3',
			'--space-4',
			'--space-5',
			'--space-6',
			'--space-8',
			'--space-10',
			'--space-12',
			'--space-16',
			'--space-20',
			'--space-24',
			'--space-32'
		],
		'Border Radius': [
			'--radius-none',
			'--radius-sm',
			'--radius-md',
			'--radius-lg',
			'--radius-xl',
			'--radius-2xl',
			'--radius-3xl',
			'--radius-full'
		],
		'Border Width': [
			'--border-width-0',
			'--border-width-1',
			'--border-width-2',
			'--border-width-4'
		],
		'Font Size': [
			'--font-size-xs',
			'--font-size-sm',
			'--font-size-md',
			'--font-size-lg',
			'--font-size-xl',
			'--font-size-2xl',
			'--font-size-3xl',
			'--font-size-4xl'
		],
		'Font Weight': [
			'--font-weight-normal',
			'--font-weight-medium',
			'--font-weight-semibold',
			'--font-weight-bold'
		],
		'Line Height': [
			'--line-height-none',
			'--line-height-tight',
			'--line-height-normal',
			'--line-height-relaxed'
		],
		Shadow: ['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl', '--shadow-focus'],
		Transition: ['--transition-fast', '--transition-base', '--transition-slow'],
		'Z-Index': [
			'--z-base',
			'--z-dropdown',
			'--z-sticky',
			'--z-fixed',
			'--z-modal',
			'--z-popover',
			'--z-tooltip'
		],
		Opacity: [
			'--opacity-0',
			'--opacity-5',
			'--opacity-10',
			'--opacity-20',
			'--opacity-30',
			'--opacity-40',
			'--opacity-50',
			'--opacity-60',
			'--opacity-70',
			'--opacity-80',
			'--opacity-90',
			'--opacity-100'
		]
	};

	function isColorToken(token: string): boolean {
		return token.startsWith('--color-');
	}
</script>

<Card>
	<h2 class="section-title">Primitive Tokens</h2>
	<p class="description">Raw design values that serve as the foundation of the design system.</p>

	{#each Object.entries(primitiveTokens) as [category, tokens] (category)}
		<div class="subsection">
			<h3>{category}</h3>
			<div class="token-list">
				{#each tokens as token (token)}
					<div class="token-item">
						{#if isColorToken(token)}
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
