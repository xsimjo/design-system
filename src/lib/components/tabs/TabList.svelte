<script lang="ts">
	import './tabs.css';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { TABS_KEY } from './context.ts';
	import type { TabsContext } from './context.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();

	getContext<TabsContext>(TABS_KEY);

	function handleKeydown(e: KeyboardEvent) {
		const list = e.currentTarget as HTMLElement;
		const tabButtons = Array.from(
			list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
		);
		const current = tabButtons.indexOf(document.activeElement as HTMLButtonElement);
		if (current < 0) return;

		let next = -1;
		if (e.key === 'ArrowRight') {
			next = (current + 1) % tabButtons.length;
		} else if (e.key === 'ArrowLeft') {
			next = (current - 1 + tabButtons.length) % tabButtons.length;
		} else if (e.key === 'Home') {
			next = 0;
		} else if (e.key === 'End') {
			next = tabButtons.length - 1;
		}

		if (next >= 0) {
			e.preventDefault();
			tabButtons[next].focus();
			tabButtons[next].click();
		}
	}
</script>

<div class="tabs__list" role="tablist" onkeydown={handleKeydown} {...restProps}>
	{@render children()}
</div>
