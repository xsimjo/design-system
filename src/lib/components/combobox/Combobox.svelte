<script lang="ts">
	import './combobox.css';
	import { getContext } from 'svelte';
	import {
		computePosition,
		flip,
		shift,
		offset,
		size as floatingSize,
		autoUpdate
	} from '@floating-ui/dom';
	import type { Middleware } from '@floating-ui/dom';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';

	export interface ComboboxOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		value?: string;
		options: ComboboxOption[];
		placeholder?: string;
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		emptyText?: string;
		filterFn?: (opt: ComboboxOption, query: string) => boolean;
	}

	let {
		value = $bindable(undefined),
		options = [],
		placeholder = 'Search…',
		fullWidth = false,
		disabled = false,
		id,
		name,
		emptyText = 'No results',
		filterFn
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `combobox-${Math.random().toString(36).slice(2, 9)}`;
	const listboxId = `${uid}-listbox`;
	const comboboxId = $derived(id ?? field?.id ?? uid);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	const selectedLabel = $derived(options.find((o) => o.value === value)?.label ?? '');

	let open = $state(false);
	let query = $state('');
	let triggerEl = $state<HTMLDivElement | null>(null);
	let inputEl = $state<HTMLInputElement | null>(null);
	let listboxEl = $state<HTMLDivElement | null>(null);
	let activeIndex = $state(-1);

	const defaultFilter = (opt: ComboboxOption, q: string) =>
		opt.label.toLowerCase().includes(q.toLowerCase());

	const filteredOptions = $derived(
		query
			? options.filter((o) => (filterFn ? filterFn(o, query) : defaultFilter(o, query)))
			: options
	);

	const activeOptionId = $derived(activeIndex >= 0 ? `${uid}-option-${activeIndex}` : undefined);

	async function updatePosition() {
		if (!triggerEl || !listboxEl) return;

		const middleware: Middleware[] = [
			offset(4),
			flip({ padding: 8 }),
			shift({ padding: 8 }),
			floatingSize({
				apply({
					rects,
					elements
				}: {
					rects: { reference: { width: number } };
					elements: { floating: HTMLElement };
				}) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`
					});
				}
			})
		];

		const { x, y } = await computePosition(triggerEl, listboxEl, {
			placement: 'bottom-start',
			strategy: 'fixed',
			middleware
		});

		listboxEl.style.left = `${x}px`;
		listboxEl.style.top = `${y}px`;
	}

	$effect(() => {
		if (open && triggerEl && listboxEl) {
			return autoUpdate(triggerEl, listboxEl, updatePosition);
		}
	});

	$effect(() => {
		if (!open) return;
		function handleClickOutside(e: MouseEvent) {
			if (!triggerEl?.contains(e.target as Node) && !listboxEl?.contains(e.target as Node)) {
				closeListbox();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	$effect(() => {
		if (!listboxEl || activeIndex < 0) return;
		const el = listboxEl.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
		el?.scrollIntoView({ block: 'nearest' });
	});

	function openListbox() {
		if (isDisabled) return;
		const selectedIdx = value ? filteredOptions.findIndex((o) => o.value === value) : -1;
		activeIndex = selectedIdx >= 0 ? selectedIdx : -1;
		open = true;
	}

	function closeListbox() {
		open = false;
		// Revert query to selected label
		query = selectedLabel;
	}

	function selectOption(option: ComboboxOption) {
		if (option.disabled) return;
		value = option.value;
		query = option.label;
		open = false;
		inputEl?.focus();
	}

	function moveActive(direction: 1 | -1) {
		const total = filteredOptions.length;
		if (total === 0) return;
		let next = activeIndex < 0 ? (direction === 1 ? 0 : total - 1) : activeIndex + direction;
		next = ((next % total) + total) % total;
		const start = next;
		while (filteredOptions[next]?.disabled) {
			next = (next + direction + total) % total;
			if (next === start) return;
		}
		activeIndex = next;
	}

	function handleInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
		if (!open) open = true;
		activeIndex = -1;
	}

	function handleFocus() {
		if (!open) {
			query = '';
			openListbox();
		}
	}

	function handleBlur(e: FocusEvent) {
		// Don't close if focus moves into the listbox
		if (listboxEl?.contains(e.relatedTarget as Node)) return;
		closeListbox();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (isDisabled) return;

		if (!open) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				query = '';
				openListbox();
			}
			return;
		}

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				closeListbox();
				break;
			case 'ArrowDown':
				e.preventDefault();
				moveActive(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				moveActive(-1);
				break;
			case 'Home':
				e.preventDefault();
				activeIndex = filteredOptions.findIndex((o) => !o.disabled);
				break;
			case 'End': {
				e.preventDefault();
				for (let i = filteredOptions.length - 1; i >= 0; i--) {
					if (!filteredOptions[i].disabled) {
						activeIndex = i;
						break;
					}
				}
				break;
			}
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0 && !filteredOptions[activeIndex]?.disabled) {
					selectOption(filteredOptions[activeIndex]);
				}
				break;
			case 'Tab':
				closeListbox();
				break;
		}
	}
</script>

<div class="combobox" class:combobox--full-width={fullWidth}>
	<div
		bind:this={triggerEl}
		class="combobox__trigger"
		class:combobox__trigger--error={hasError}
		class:combobox__trigger--open={open}
		class:combobox__trigger--disabled={isDisabled}
	>
		<input
			bind:this={inputEl}
			id={comboboxId}
			type="text"
			role="combobox"
			aria-autocomplete="list"
			aria-haspopup="listbox"
			aria-expanded={open}
			aria-controls={open ? listboxId : undefined}
			aria-activedescendant={activeOptionId}
			aria-describedby={describedBy}
			aria-required={field?.required || undefined}
			aria-invalid={hasError || undefined}
			class="combobox__input"
			{placeholder}
			disabled={isDisabled}
			value={query || (open ? '' : selectedLabel)}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		/>
		<svg
			class="combobox__chevron"
			class:combobox__chevron--open={open}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</div>

	{#if name && value}
		<input type="hidden" {name} {value} />
	{/if}

	{#if open}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			bind:this={listboxEl}
			id={listboxId}
			role="listbox"
			aria-labelledby={comboboxId}
			class="combobox__listbox"
		>
			{#if filteredOptions.length === 0}
				<div class="combobox__empty">{emptyText}</div>
			{:else}
				{#each filteredOptions as option, i (option.value)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						id="{uid}-option-{i}"
						role="option"
						aria-selected={option.value === value}
						aria-disabled={option.disabled || undefined}
						data-index={i}
						class="combobox__option"
						class:combobox__option--selected={option.value === value}
						class:combobox__option--active={activeIndex === i}
						class:combobox__option--disabled={option.disabled}
						onmousedown={(e) => e.preventDefault()}
						onclick={() => selectOption(option)}
						onmouseenter={() => {
							if (!option.disabled) activeIndex = i;
						}}
					>
						<span class="combobox__option-label">{option.label}</span>
						{#if option.value === value}
							<svg
								class="combobox__option-check"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 6 9 17l-5-5" />
							</svg>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
