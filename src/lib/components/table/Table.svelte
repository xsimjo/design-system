<script lang="ts">
	import './table.css';
	import type { Snippet } from 'svelte';
	import type { HTMLTableAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLTableAttributes, 'children'> {
		variant?: 'plain' | 'striped' | 'bordered';
		size?: 'sm' | 'md' | 'lg';
		stickyHeader?: boolean;
		maxHeight?: string;
		caption?: string;
		captionSide?: 'top' | 'bottom';
		children: Snippet;
	}

	let {
		variant = 'plain',
		size = 'md',
		stickyHeader = false,
		maxHeight,
		caption,
		captionSide = 'bottom',
		children,
		...restProps
	}: Props = $props();
</script>

<div
	class="table-wrapper"
	class:table-wrapper--sticky={stickyHeader}
	style={maxHeight ? `--table-max-height: ${maxHeight}` : undefined}
>
	<table
		class="table table--{variant} table--{size}"
		style:caption-side={captionSide}
		{...restProps}
	>
		{#if caption}
			<caption class="table__caption">{caption}</caption>
		{/if}
		{@render children()}
	</table>
</div>
