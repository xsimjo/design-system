<script lang="ts">
	import { onMount } from 'svelte';

	interface TocSection {
		id: string;
		label: string;
		indent?: boolean;
	}

	interface Props {
		sections: TocSection[];
	}

	let { sections }: Props = $props();

	let activeId = $state('');

	function getHeaderOffset(): number {
		return (
			parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 20
		);
	}

	function updateActiveSection() {
		const offset = getHeaderOffset();
		let currentId = sections[0]?.id || '';

		for (const section of sections) {
			const element = document.getElementById(section.id);
			if (element) {
				const rect = element.getBoundingClientRect();
				if (rect.top <= offset) {
					currentId = section.id;
				} else {
					break;
				}
			}
		}

		activeId = currentId;
	}

	onMount(() => {
		updateActiveSection();
		window.addEventListener('scroll', updateActiveSection, { passive: true });
		return () => window.removeEventListener('scroll', updateActiveSection);
	});

	function scrollToSection(e: MouseEvent, id: string) {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			const headerHeight = parseInt(
				getComputedStyle(document.documentElement).getPropertyValue('--header-height')
			);
			const offset = headerHeight + 16;
			const top = element.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top, behavior: 'smooth' });
			history.pushState(null, '', `#${id}`);
		}
	}
</script>

<aside class="toc">
	<nav class="toc-nav" aria-label="Table of Contents">
		<h4>On this page</h4>
		<ul>
			{#each sections as section (section.id)}
				<li class:indent={section.indent}>
					<a
						href="#{section.id}"
						class:active={activeId === section.id}
						aria-current={activeId === section.id ? 'location' : undefined}
						onclick={(e) => scrollToSection(e, section.id)}
					>
						{section.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	.toc {
		position: sticky;
		top: calc(var(--header-height) + var(--space-4));
		align-self: start;
		max-height: calc(100vh - var(--header-height) - var(--space-8));
		overflow-y: auto;
	}

	.toc-nav h4 {
		font-size: var(--ui-text-sm);
		font-weight: 600;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--space-3) 0;
	}

	.toc-nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.toc-nav li {
		margin: 0;
	}

	.toc-nav li.indent {
		padding-left: var(--space-4);
	}

	.toc-nav a {
		display: block;
		padding: var(--space-1) var(--space-2);
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		text-decoration: none;
		border-left: 2px solid transparent;
		transition: all var(--ui-duration);
	}

	.toc-nav a:hover {
		color: var(--ui-surface-foreground);
	}

	.toc-nav a.active {
		color: var(--ui-primary);
		border-left-color: var(--ui-primary);
	}

	.toc-nav a:focus-visible {
		outline: 2px solid var(--ui-primary);
		outline-offset: 2px;
	}

	@media (max-width: 1024px) {
		.toc {
			display: none;
		}
	}
</style>
