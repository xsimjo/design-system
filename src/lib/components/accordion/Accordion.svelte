<script lang="ts">
	import './accordion.css';
	import { setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { ACCORDION_KEY } from './context.ts';
	import type { AccordionContext } from './context.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
		mode?: 'single' | 'multiple';
		collapsible?: boolean;
		value?: string | string[];
		onchange?: (value: string | string[]) => void;
		children: Snippet;
	}

	let {
		mode = 'single',
		collapsible = false,
		value = $bindable<string | string[] | undefined>(undefined),
		onchange,
		children,
		...restProps
	}: Props = $props();

	function isOpen(itemValue: string): boolean {
		if (mode === 'multiple') {
			return Array.isArray(value) && value.includes(itemValue);
		}
		return value === itemValue;
	}

	function toggle(itemValue: string) {
		if (mode === 'multiple') {
			const arr = Array.isArray(value) ? [...value] : [];
			const idx = arr.indexOf(itemValue);
			if (idx >= 0) {
				arr.splice(idx, 1);
			} else {
				arr.push(itemValue);
			}
			value = arr;
			onchange?.(value);
		} else {
			value = collapsible && value === itemValue ? undefined : itemValue;
			onchange?.(value ?? '');
		}
	}

	setContext<AccordionContext>(ACCORDION_KEY, { isOpen, toggle });
</script>

<div class="accordion" {...restProps}>
	{@render children()}
</div>
