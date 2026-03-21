<script lang="ts">
	import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';
	import { BREADCRUMBS_KEY, type BreadcrumbsContext } from './context.js';
	import ChevronRightIcon from '$lib/icons/ChevronRightIcon.svelte';

	type AnchorProps = Omit<HTMLAnchorAttributes, 'children'> & { href: string };
	type SpanProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> & { href?: never };
	type Props = { children: Snippet } & (AnchorProps | SpanProps);

	let { href, children, ...restProps }: Props = $props();

	const ctx = getContext<BreadcrumbsContext>(BREADCRUMBS_KEY);
	const separator = $derived(ctx?.getSeparator() ?? 'chevron');
</script>

<li class="breadcrumbs__item">
	<span class="breadcrumbs__separator" aria-hidden="true">
		{#if separator === 'chevron'}
			<ChevronRightIcon size={12} />
		{:else}
			/
		{/if}
	</span>
	{#if href}
		<a class="breadcrumbs__link" {href} {...restProps as HTMLAnchorAttributes}
			>{@render children()}</a
		>
	{:else}
		<span
			class="breadcrumbs__current"
			aria-current="page"
			{...restProps as HTMLAttributes<HTMLSpanElement>}>{@render children()}</span
		>
	{/if}
</li>
