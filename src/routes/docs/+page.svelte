<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import CodeBlock from '$internal/CodeBlock.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ArrowRightIcon from '$lib/icons/ArrowRightIcon.svelte';

	const componentCategories: {
		title: string;
		items: { label: string; href: ResolvedPathname }[];
	}[] = [
		{
			title: 'Form',
			items: [
				{ label: 'Button', href: resolve('/docs/button') },
				{ label: 'Input', href: resolve('/docs/input') },
				{ label: 'Textarea', href: resolve('/docs/textarea') },
				{ label: 'Select', href: resolve('/docs/select') },
				{ label: 'Checkbox', href: resolve('/docs/checkbox') },
				{ label: 'Radio', href: resolve('/docs/radio') },
				{ label: 'Switch', href: resolve('/docs/switch') },
				{ label: 'Slider', href: resolve('/docs/slider') },
				{ label: 'Rating', href: resolve('/docs/rating') },
				{ label: 'Field', href: resolve('/docs/field') },
				{ label: 'Combobox', href: resolve('/docs/combobox') },
				{ label: 'DatePicker', href: resolve('/docs/datepicker') },
				{ label: 'TimePicker', href: resolve('/docs/timepicker') },
				{ label: 'MultiSelect', href: resolve('/docs/multiselect') },
				{ label: 'FileInput', href: resolve('/docs/file-input') },
				{ label: 'BadgeInput', href: resolve('/docs/badge-input') }
			]
		},
		{
			title: 'Data Display',
			items: [
				{ label: 'Avatar', href: resolve('/docs/avatar') },
				{ label: 'Badge', href: resolve('/docs/badge') },
				{ label: 'Card', href: resolve('/docs/card') },
				{ label: 'Table', href: resolve('/docs/table') },
				{ label: 'Typography', href: resolve('/docs/typography') },
				{ label: 'Skeleton', href: resolve('/docs/skeleton') }
			]
		},
		{
			title: 'Feedback',
			items: [
				{ label: 'Alert', href: resolve('/docs/alert') },
				{ label: 'Progress', href: resolve('/docs/progress') },
				{ label: 'Spinner', href: resolve('/docs/spinner') },
				{ label: 'Toast', href: resolve('/docs/toast') },
				{ label: 'Tooltip', href: resolve('/docs/tooltip') }
			]
		},
		{
			title: 'Overlay',
			items: [
				{ label: 'Drawer', href: resolve('/docs/drawer') },
				{ label: 'Dropdown', href: resolve('/docs/dropdown') },
				{ label: 'Modal', href: resolve('/docs/modal') },
				{ label: 'Popover', href: resolve('/docs/popover') }
			]
		},
		{
			title: 'Navigation',
			items: [
				{ label: 'Accordion', href: resolve('/docs/accordion') },
				{ label: 'Breadcrumbs', href: resolve('/docs/breadcrumbs') },
				{ label: 'Pagination', href: resolve('/docs/pagination') },
				{ label: 'SideNav', href: resolve('/docs/side-nav') },
				{ label: 'Tabs', href: resolve('/docs/tabs') }
			]
		}
	];
</script>

<svelte:head>
	<title>Introduction - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Introduction"
		description="Greenfield UI is a component library for Svelte 5. It provides accessible, themeable components with a token-based styling system that makes customization simple."
		isBordered
	/>

	<DocSection id="why" title="Why Greenfield UI?">
		<div class="principles">
			<div class="principle">
				<h3>Pure CSS</h3>
				<p>No CSS-in-JS runtime. Components use semantic CSS custom properties that you control.</p>
			</div>
			<div class="principle">
				<h3>Themeable</h3>
				<p>Override 57 variables to customize everything. Dark mode works out of the box.</p>
			</div>
			<div class="principle">
				<h3>Accessible</h3>
				<p>
					ARIA attributes, keyboard navigation, and focus management built into every component.
				</p>
			</div>
			<div class="principle">
				<h3>Svelte 5</h3>
				<p>Built with runes, snippets, and modern patterns. Extends native HTML attributes.</p>
			</div>
		</div>
	</DocSection>

	<DocSection id="quick-start" title="Quick Start">
		<CodeBlock code="npm install @xsimjo/design-system" language="bash" />
		<p class="hint">Then import styles and components in your layout.</p>
		<CodeBlock
			code={`<script>
  import '@xsimjo/design-system/styles';
  import { Button } from '@xsimjo/design-system';
${'</' + 'script>'}

<html data-theme="light">
  <Button>Click me</Button>
</html>`}
			language="svelte"
		/>
	</DocSection>

	<DocSection id="token-architecture" title="Token Architecture">
		<p class="section-intro">
			The styling system has three layers. You only need to touch the top layer to customize your
			theme.
		</p>
		<div class="architecture">
			<div class="layer layer--user">
				<span class="layer-label">You customize</span>
				<span class="layer-name">Theme Variables</span>
				<span class="layer-desc">57 semantic variables like colors, radii, spacing</span>
			</div>
			<div class="layer-arrow"></div>
			<div class="layer layer--auto">
				<span class="layer-label">Auto-computed</span>
				<span class="layer-name">Semantic Tokens</span>
				<span class="layer-desc">Component-specific tokens</span>
			</div>
			<div class="layer-arrow"></div>
			<div class="layer layer--base">
				<span class="layer-label">Foundation</span>
				<span class="layer-name">Primitives</span>
				<span class="layer-desc">Full color palettes, type scale, spacing</span>
			</div>
		</div>
	</DocSection>

	<DocSection id="components" title="Components">
		<p class="section-intro">
			{componentCategories.reduce((sum, cat) => sum + cat.items.length, 0)} production-ready components
			across {componentCategories.length} categories.
		</p>
		<div class="component-grid">
			{#each componentCategories as category (category.title)}
				<div class="component-group">
					<h4>{category.title} ({category.items.length})</h4>
					<ul>
						{#each category.items as item (item.href)}
							<li><a href={item.href}>{item.label}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</DocSection>

	<DocSection id="next-steps" title="Next Steps">
		<div class="next-steps">
			<a href={resolve('/docs/installation')}
				><Button>Installation <ArrowRightIcon size={16} /></Button></a
			>
			<a href={resolve('/docs/usage')}
				><Button variant="outline" color="secondary">Usage Guide</Button></a
			>
			<a href={resolve('/docs/theming')}
				><Button variant="outline" color="secondary">Theming</Button></a
			>
		</div>
	</DocSection>
</DocsPage>

<style>
	.hint {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: var(--space-3) 0;
	}

	.principles {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.principle {
		padding: var(--space-4);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		border-radius: calc(var(--ui-base-radius) * 0.75);
	}

	.principle h3 {
		font-size: var(--ui-text-sm);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin-bottom: var(--space-1);
	}

	.principle p {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
	}

	.architecture {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.layer {
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
		border-radius: calc(var(--ui-base-radius) * 0.75);
		border: 1px solid var(--ui-border);
	}

	.layer-label {
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-bottom: var(--space-1);
	}

	.layer-name {
		font-weight: 600;
		font-size: var(--ui-text-base);
		color: var(--ui-surface-foreground);
	}

	.layer-desc {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
	}

	.layer--user {
		background: color-mix(in oklch, var(--ui-primary) 8%, var(--ui-surface));
		border-color: color-mix(in oklch, var(--ui-primary) 25%, var(--ui-border));
	}

	.layer--user .layer-name {
		color: var(--ui-primary);
	}

	.layer--auto {
		background: var(--ui-surface-raised);
	}

	.layer--base {
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
	}

	.layer-arrow {
		width: 24px;
		height: 16px;
		align-self: center;
		border-left: 1px solid var(--ui-border);
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}

	.component-group h4 {
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-bottom: var(--space-2);
	}

	.component-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.component-group li {
		font-size: var(--ui-text-sm);
		padding: var(--space-1) 0;
	}

	.component-group a {
		color: var(--ui-surface-foreground);
		text-decoration: none;
		transition: color var(--ui-base-duration) var(--ui-base-easing);
	}

	.component-group a:hover {
		color: var(--ui-primary);
	}

	.next-steps {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	@media (max-width: 768px) {
		.principles {
			grid-template-columns: 1fr;
		}

		.component-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.component-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
