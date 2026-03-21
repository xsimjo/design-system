<script lang="ts">
	import './datepicker.css';
	import { getContext, tick } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import DatePickerPanel from '$lib/internal/DatePickerPanel.svelte';
	import { isDateOutOfRange, normalizeToDay } from '$lib/internal/dateUtils.js';
	import { useFloatingPanel } from '$lib/internal/useFloatingPanel.svelte.js';

	export interface DatePickerLocale {
		tag?: string;
		dayPlaceholder?: string;
		monthPlaceholder?: string;
		yearPlaceholder?: string;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		value?: Date;
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		min?: Date;
		max?: Date;
		locale?: DatePickerLocale;
	}

	let {
		value = $bindable(undefined),
		fullWidth = false,
		disabled = false,
		id,
		name,
		min,
		max,
		locale,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `datepicker-${Math.random().toString(36).slice(2, 9)}`;
	const panelId = `${uid}-panel`;
	const datepickerId = $derived(id ?? field?.id ?? uid);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	const _now = new Date();
	const today = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());

	const minDay = $derived(min ? normalizeToDay(min) : null);
	const maxDay = $derived(max ? normalizeToDay(max) : null);

	const effectiveLocale = $derived(
		locale?.tag ?? (typeof navigator !== 'undefined' ? navigator.language : 'en')
	);

	let editD = $state(value?.getDate() ?? 0);
	let editM = $state(value ? value.getMonth() + 1 : 0);
	let editY = $state(value?.getFullYear() ?? 0);

	const iconSize = 16;

	let open = $state(false);
	let triggerEl = $state<HTMLDivElement | null>(null);
	let panelEl = $state<HTMLDivElement | null>(null);

	let dayInputEl = $state<HTMLInputElement | null>(null);
	let monthInputEl = $state<HTMLInputElement | null>(null);
	let yearInputEl = $state<HTMLInputElement | null>(null);

	type DateSeg = 'day' | 'month' | 'year';

	const { segmentOrder, segmentSeparators } = $derived.by(() => {
		const parts = new Intl.DateTimeFormat(effectiveLocale, {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric'
		}).formatToParts(new Date(2024, 0, 15));
		const order: DateSeg[] = [];
		const separators: string[] = [];
		for (const p of parts) {
			if (p.type === 'day' || p.type === 'month' || p.type === 'year') {
				order.push(p.type);
			} else if (p.type === 'literal' && order.length > 0 && order.length < 3) {
				separators.push(p.value);
			}
		}
		return { segmentOrder: order, segmentSeparators: separators };
	});

	const localePlaceholders: Record<string, { day: string; month: string; year: string }> = {
		fr: { day: 'JJ', month: 'MM', year: 'AAAA' },
		es: { day: 'DD', month: 'MM', year: 'AAAA' },
		pt: { day: 'DD', month: 'MM', year: 'AAAA' },
		it: { day: 'GG', month: 'MM', year: 'AAAA' },
		de: { day: 'TT', month: 'MM', year: 'JJJJ' },
		nl: { day: 'DD', month: 'MM', year: 'JJJJ' },
		pl: { day: 'DD', month: 'MM', year: 'RRRR' },
		ru: { day: 'ДД', month: 'ММ', year: 'ГГГГ' },
		uk: { day: 'ДД', month: 'ММ', year: 'РРРР' },
		ja: { day: 'DD', month: 'MM', year: 'YYYY' },
		zh: { day: 'DD', month: 'MM', year: 'YYYY' },
		ko: { day: 'DD', month: 'MM', year: 'YYYY' }
	};

	const segPlaceholders = $derived.by(() => {
		const lang = effectiveLocale.split('-')[0].toLowerCase();
		const defaults = localePlaceholders[lang] ?? { day: 'DD', month: 'MM', year: 'YYYY' };
		return {
			day: locale?.dayPlaceholder ?? defaults.day,
			month: locale?.monthPlaceholder ?? defaults.month,
			year: locale?.yearPlaceholder ?? defaults.year
		};
	});

	function syncFromValue() {
		if (value) {
			editD = value.getDate();
			editM = value.getMonth() + 1;
			editY = value.getFullYear();
		}
	}

	function buildDate(d: number, m: number, y: number): Date | undefined {
		if (!d || !m || !y) return undefined;
		const date = new Date(y, m - 1, d);
		if (date.getMonth() !== m - 1) return undefined;
		return date;
	}

	function isOutOfRange(date: Date): boolean {
		return isDateOutOfRange(date, minDay, maxDay);
	}

	function wrapRange(value: number, min: number, max: number, delta: number): number {
		const range = max - min + 1;
		return ((((value - min + delta) % range) + range) % range) + min;
	}

	function commitSegments() {
		const date = buildDate(editD, editM, editY);
		if (date && !isOutOfRange(date)) {
			value = date;
		}
	}

	function toYMD(date: Date) {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const d = String(date.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	useFloatingPanel(
		() => triggerEl,
		() => panelEl,
		() => open,
		closePanel
	);

	function openPanel() {
		if (isDisabled || open) return;
		syncFromValue();
		open = true;
	}

	function closePanel() {
		open = false;
	}

	function handlePanelSelect(date: Date) {
		value = date;
		editD = date.getDate();
		editM = date.getMonth() + 1;
		editY = date.getFullYear();
		closePanel();
	}

	function segInputEl(seg: DateSeg): HTMLInputElement | null {
		if (seg === 'day') return dayInputEl;
		if (seg === 'month') return monthInputEl;
		return yearInputEl;
	}

	function nextSeg(seg: DateSeg): DateSeg | null {
		const idx = segmentOrder.indexOf(seg);
		return idx < 2 ? segmentOrder[idx + 1] : null;
	}

	function prevSeg(seg: DateSeg): DateSeg | null {
		const idx = segmentOrder.indexOf(seg);
		return idx > 0 ? segmentOrder[idx - 1] : null;
	}

	async function advanceSeg(seg: DateSeg) {
		segInputEl(seg)?.focus();
		await tick();
		segInputEl(seg)?.select();
	}

	function stepSeg(seg: DateSeg, delta: number) {
		if (seg === 'day') {
			const daysInMonth = editM && editY ? new Date(editY, editM, 0).getDate() : 31;
			editD = editD ? wrapRange(editD, 1, daysInMonth, delta) : delta > 0 ? 1 : daysInMonth;
		} else if (seg === 'month') {
			editM = editM ? wrapRange(editM, 1, 12, delta) : delta > 0 ? 1 : 12;
		} else {
			editY = editY ? editY + delta : today.getFullYear();
		}
		commitSegments();
	}

	function handleSegInput(e: Event, seg: DateSeg) {
		const input = e.currentTarget as HTMLInputElement;
		const raw = input.value.replace(/\D/g, '');
		input.value = raw;
		if (raw.length === 0) return;
		const num = parseInt(raw, 10);

		if (seg === 'year') {
			if (raw.length === 4) {
				editY = num;
				commitSegments();
			}
			return;
		}

		const shouldAdvance = seg === 'day' ? raw.length >= 2 || num > 3 : raw.length >= 2 || num > 1;

		if (shouldAdvance) {
			if (seg === 'day') editD = Math.min(num, 31);
			else editM = Math.min(num, 12);
			const next = nextSeg(seg);
			if (next) advanceSeg(next);
			commitSegments();
		}
	}

	function handleSegBlur(e: FocusEvent, seg: DateSeg) {
		const input = e.currentTarget as HTMLInputElement;
		const raw = input.value.replace(/\D/g, '');
		if (raw.length === 0) return;
		const num = parseInt(raw, 10);

		if (seg === 'day') {
			editD = Math.min(Math.max(1, num), 31);
			input.value = String(editD).padStart(2, '0');
		} else if (seg === 'month') {
			editM = Math.min(Math.max(1, num), 12);
			input.value = String(editM).padStart(2, '0');
		} else {
			editY = num;
			input.value = String(editY).padStart(4, '0');
		}
		commitSegments();
	}

	function handleSegKeydown(e: KeyboardEvent, seg: DateSeg) {
		switch (e.key) {
			case 'ArrowUp':
				e.preventDefault();
				stepSeg(seg, 1);
				break;
			case 'ArrowDown':
				e.preventDefault();
				stepSeg(seg, -1);
				break;
			case 'Tab': {
				const adj = e.shiftKey ? prevSeg(seg) : nextSeg(seg);
				if (adj) {
					e.preventDefault();
					advanceSeg(adj);
				} else {
					closePanel();
				}
				break;
			}
			case 'Escape':
				e.preventDefault();
				closePanel();
				break;
		}
	}

	function handleIconBtnKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			openPanel();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			closePanel();
		}
	}
</script>

<div
	class="datepicker"
	class:datepicker--full-width={fullWidth}
	class:datepicker--disabled={isDisabled}
	{...restProps}
>
	<div
		bind:this={triggerEl}
		id={datepickerId}
		class="datepicker__trigger"
		class:datepicker__trigger--error={hasError}
		class:datepicker__trigger--open={open}
		class:datepicker__trigger--disabled={isDisabled}
		role="group"
		aria-label="Date picker"
		aria-describedby={describedBy}
	>
		<div class="datepicker__segments">
			{#each segmentOrder as seg, i (seg)}
				{#if i > 0}
					<span class="datepicker__seg-sep" aria-hidden="true">{segmentSeparators[i - 1]}</span>
				{/if}
				{#if seg === 'day'}
					<input
						bind:this={dayInputEl}
						class="datepicker__seg-input"
						type="text"
						inputmode="numeric"
						value={editD ? String(editD).padStart(2, '0') : ''}
						placeholder={segPlaceholders.day}
						aria-label="Day"
						disabled={isDisabled}
						onfocus={() => openPanel()}
						onblur={(e) => handleSegBlur(e, 'day')}
						onkeydown={(e) => handleSegKeydown(e, 'day')}
						oninput={(e) => handleSegInput(e, 'day')}
						onclick={(e) => (e.currentTarget as HTMLInputElement).select()}
					/>
				{:else if seg === 'month'}
					<input
						bind:this={monthInputEl}
						class="datepicker__seg-input"
						type="text"
						inputmode="numeric"
						value={editM ? String(editM).padStart(2, '0') : ''}
						placeholder={segPlaceholders.month}
						aria-label="Month"
						disabled={isDisabled}
						onfocus={() => openPanel()}
						onblur={(e) => handleSegBlur(e, 'month')}
						onkeydown={(e) => handleSegKeydown(e, 'month')}
						oninput={(e) => handleSegInput(e, 'month')}
						onclick={(e) => (e.currentTarget as HTMLInputElement).select()}
					/>
				{:else}
					<input
						bind:this={yearInputEl}
						class="datepicker__seg-input datepicker__seg-input--year"
						type="text"
						inputmode="numeric"
						value={editY ? String(editY).padStart(4, '0') : ''}
						placeholder={segPlaceholders.year}
						aria-label="Year"
						disabled={isDisabled}
						onfocus={() => openPanel()}
						onblur={(e) => handleSegBlur(e, 'year')}
						onkeydown={(e) => handleSegKeydown(e, 'year')}
						oninput={(e) => handleSegInput(e, 'year')}
						onclick={(e) => (e.currentTarget as HTMLInputElement).select()}
					/>
				{/if}
			{/each}
		</div>

		<button
			class="datepicker__icon-btn"
			type="button"
			tabindex="-1"
			aria-label={open ? 'Close date picker' : 'Open date picker'}
			aria-expanded={open}
			aria-controls={open ? panelId : undefined}
			disabled={isDisabled}
			onmousedown={(e) => e.preventDefault()}
			onclick={() => (open ? closePanel() : openPanel())}
			onkeydown={handleIconBtnKeydown}
		>
			<CalendarIcon class="datepicker__icon" size={iconSize} aria-hidden="true" />
		</button>
	</div>

	{#if name && value}
		<input type="hidden" {name} value={toYMD(value)} />
	{/if}

	{#if open}
		<DatePickerPanel
			bind:panelEl
			id={panelId}
			{value}
			{min}
			{max}
			{today}
			locale={effectiveLocale}
			onselect={handlePanelSelect}
			onclose={closePanel}
		/>
	{/if}
</div>
