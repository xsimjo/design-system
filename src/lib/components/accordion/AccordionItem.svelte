<script lang="ts">
	import './accordion.css';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import { ACCORDION_KEY } from './context.ts';
	import type { AccordionContext } from './context.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
		value: string;
		title?: string;
		trigger?: Snippet;
		disabled?: boolean;
		children: Snippet;
	}

	let { value, title, trigger, disabled = false, children, ...restProps }: Props = $props();

	const accordion = getContext<AccordionContext>(ACCORDION_KEY);

	let open = $derived(accordion.isOpen(value));

	const panelId = `accordion-panel-${Math.random().toString(36).slice(2, 9)}`;
	const triggerId = `accordion-trigger-${Math.random().toString(36).slice(2, 9)}`;

	function handleClick() {
		if (!disabled) accordion.toggle(value);
	}
</script>

<div class="accordion-item" class:accordion-item--open={open} {...restProps}>
	<h3 class="accordion-item__heading">
		<button
			id={triggerId}
			class="accordion-item__trigger"
			aria-expanded={open}
			aria-controls={panelId}
			{disabled}
			onclick={handleClick}
			type="button"
		>
			<span class="accordion-item__title">
				{#if trigger}
					{@render trigger()}
				{:else}
					{title}
				{/if}
			</span>
			<span class="accordion-item__chevron" aria-hidden="true">
				<ChevronDownIcon size={18} />
			</span>
		</button>
	</h3>
	<div id={panelId} role="region" aria-labelledby={triggerId} class="accordion-item__panel">
		<div class="accordion-item__panel-inner">
			<div class="accordion-item__content">
				{@render children()}
			</div>
		</div>
	</div>
</div>
