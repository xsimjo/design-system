<script lang="ts">
	import './rating.css';

	interface Props {
		value?: number;
		max?: number;
		size?: 'sm' | 'md' | 'lg';
		readonly?: boolean;
		disabled?: boolean;
		label?: string;
		name?: string;
	}

	let {
		value = $bindable(0),
		max = 5,
		size = 'md',
		readonly = false,
		disabled = false,
		label = 'Rating',
		name
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
	class="rating rating--{size}"
	class:rating--disabled={disabled}
	class:rating--readonly={readonly}
	role="radiogroup"
	tabindex={isInteractive ? 0 : -1}
	aria-label={label}
	aria-disabled={disabled || undefined}
	onkeydown={handleKeydown}
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
			<svg
				class="rating__star-icon"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	{/each}
</div>
