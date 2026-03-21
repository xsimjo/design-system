<script lang="ts">
	import './breadcrumbs.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { BREADCRUMBS_KEY, type BreadcrumbsContext } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
		separator?: 'chevron' | 'slash';
		children: Snippet;
	}

	let { separator = 'chevron', children, ...restProps }: Props = $props();

	setContext<BreadcrumbsContext>(BREADCRUMBS_KEY, { getSeparator: () => separator });
</script>

<nav aria-label="Breadcrumb" {...restProps}>
	<ol class="breadcrumbs">
		{@render children()}
	</ol>
</nav>
