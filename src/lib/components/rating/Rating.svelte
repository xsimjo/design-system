<script lang="ts">
	import './rating.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import StarIcon from '$lib/icons/StarIcon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		value?: number;
		max?: number;
		readonly?: boolean;
		disabled?: boolean;
		label?: string;
		name?: string;
	}

	let {
		value = $bindable(0),
		max = 5,
		readonly = false,
		disabled = false,
		label = 'Rating',
		name,
		...restProps
	}: Props = $props();

	let hoverValue = $state(0);
	let starRefs: HTMLButtonElement[] = $state([]);

	const isInteractive = $derived(!readonly && !disabled);
	const displayValue = $derived(hoverValue > 0 ? hoverValue : value);
	const focusedIndex = $derived(value > 0 ? value - 1 : 0);
	const stars = $derived(Array.from({ length: max }, (__, i) => i + 1));

	function setValue(v: number) {
		if (!isInteractive) return;
		value = v === value ? 0 : v;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isInteractive) return;
		let next = value;
		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				e.preventDefault();
				next = Math.min(value + 1, max);
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				e.preventDefault();
				next = Math.max(value - 1, 0);
				break;
			case 'Home':
				e.preventDefault();
				next = 1;
				break;
			case 'End':
				e.preventDefault();
				next = max;
				break;
			default:
				return;
		}
		value = next;
		const targetIndex = next > 0 ? next - 1 : 0;
		starRefs[targetIndex]?.focus();
	}
</script>

<div
	class="rating"
	class:rating--disabled={disabled}
	class:rating--readonly={readonly}
	role="radiogroup"
	tabindex={isInteractive ? 0 : -1}
	aria-label={label}
	aria-disabled={disabled || undefined}
	onkeydown={handleKeydown}
	{...restProps}
>
	{#if name}
		<input type="hidden" {name} {value} />
	{/if}

	{#each stars as starNum (starNum)}
		{@const filled = starNum <= displayValue}
		{@const isHovered = hoverValue > 0 && starNum <= hoverValue}
		{@const i = starNum - 1}
		<button
			type="button"
			role="radio"
			class="rating__star"
			class:rating__star--filled={filled && !isHovered}
			class:rating__star--hovered={isHovered}
			aria-label="{starNum} {starNum === 1 ? 'star' : 'stars'}"
			aria-checked={starNum === value}
			disabled={!isInteractive || undefined}
			tabindex={i === focusedIndex ? 0 : -1}
			bind:this={starRefs[i]}
			onclick={() => setValue(starNum)}
			onmouseenter={() => {
				if (isInteractive) hoverValue = starNum;
			}}
			onmouseleave={() => {
				hoverValue = 0;
			}}
		>
			<StarIcon class="rating__star-icon" size={20} aria-hidden="true" />
		</button>
	{/each}
</div>
