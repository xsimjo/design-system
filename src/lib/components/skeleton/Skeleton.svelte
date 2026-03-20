<script lang="ts">
	import './skeleton.css';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		shape?: 'rect' | 'circle' | 'text';
		width?: string;
		height?: string;
		lines?: number;
		animated?: boolean;
	}

	let {
		shape = 'rect',
		width,
		height,
		lines = 3,
		animated = true,
		style,
		...restProps
	}: Props = $props();

	const inlineStyle = $derived(
		[width ? `width: ${width}` : '', height ? `height: ${height}` : '', style ?? '']
			.filter(Boolean)
			.join('; ')
	);

	const lineKeys = $derived(Array.from({ length: lines }, (_, i) => i));
</script>

{#if shape === 'text'}
	<span
		class="skeleton skeleton--text"
		class:skeleton--animated={animated}
		style={inlineStyle || undefined}
		aria-hidden="true"
		{...restProps}
	>
		{#each lineKeys as key (key)}
			<span class="skeleton__line"></span>
		{/each}
	</span>
{:else}
	<span
		class="skeleton"
		class:skeleton--circle={shape === 'circle'}
		class:skeleton--animated={animated}
		style={inlineStyle || undefined}
		aria-hidden="true"
		{...restProps}
	></span>
{/if}
