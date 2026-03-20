<script lang="ts">
	import './breadcrumbs.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';

	export type BreadcrumbsContext = { getSeparator: () => 'chevron' | 'slash' };

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
		separator?: 'chevron' | 'slash';
		children: Snippet;
	}

	let { separator = 'chevron', children, ...restProps }: Props = $props();

	setContext<BreadcrumbsContext>('breadcrumbs', { getSeparator: () => separator });
</script>

<nav aria-label="Breadcrumb" {...restProps}>
	<ol class="breadcrumbs">
		{@render children()}
	</ol>
</nav>
