<script lang="ts">
	import './timepicker.css';
	import { getContext, tick } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import ClockIcon from '$lib/icons/ClockIcon.svelte';
	import { useFloatingPanel } from '$lib/internal/useFloatingPanel.svelte.js';
	import TimePickerPanel from '$lib/internal/TimePickerPanel.svelte';

	export interface TimePickerLocale {
		tag?: string;
		hourPlaceholder?: string;
		minutePlaceholder?: string;
		secondPlaceholder?: string;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		value?: string; // "HH:MM" or "HH:MM:SS" in 24-hour
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		seconds?: boolean; // show seconds column
		locale?: TimePickerLocale;
	}

	let {
		value = $bindable(undefined),
		fullWidth = false,
		disabled = false,
		id,
		name,
		seconds = false,
		locale,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `timepicker-${Math.random().toString(36).slice(2, 9)}`;
	const panelId = `${uid}-panel`;
	const timepickerId = $derived(id ?? field?.id ?? uid);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	const effectiveLocale = $derived(
		locale?.tag ?? (typeof navigator !== 'undefined' ? navigator.language : 'en')
	);

	const localePlaceholders: Record<string, { hour: string; minute: string; second: string }> = {
		de: { hour: 'SS', minute: 'MM', second: 'SS' },
		nl: { hour: 'UU', minute: 'MM', second: 'SS' },
		ru: { hour: 'ЧЧ', minute: 'ММ', second: 'СС' },
		uk: { hour: 'ГГ', minute: 'ХХ', second: 'СС' },
		ja: { hour: '時', minute: '分', second: '秒' },
		zh: { hour: '时', minute: '分', second: '秒' },
		ko: { hour: 'HH', minute: 'MM', second: 'SS' }
	};

	const segPlaceholders = $derived.by(() => {
		const lang = effectiveLocale.split('-')[0].toLowerCase();
		const defaults = localePlaceholders[lang] ?? { hour: 'HH', minute: 'MM', second: 'SS' };
		return {
			hour: locale?.hourPlaceholder ?? defaults.hour,
			minute: locale?.minutePlaceholder ?? defaults.minute,
			second: locale?.secondPlaceholder ?? defaults.second
		};
	});

	const iconSize = 16;

	function parseTimeString(val: string | undefined): { h: number; m: number; s: number } {
		if (!val) return { h: 0, m: 0, s: 0 };
		const parts = val.split(':').map(Number);
		return { h: parts[0] ?? 0, m: parts[1] ?? 0, s: parts[2] ?? 0 };
	}

	function buildTimeString(h: number, m: number, s: number): string {
		const hh = String(h).padStart(2, '0');
		const mm = String(m).padStart(2, '0');
		if (seconds) return `${hh}:${mm}:${String(s).padStart(2, '0')}`;
		return `${hh}:${mm}`;
	}

	let editH = $state(0);
	let editM = $state(0);
	let editS = $state(0);

	const hasValue = $derived(!!value);
	let open = $state(false);

	const showValues = $derived(hasValue || open);

	let triggerEl = $state<HTMLDivElement | null>(null);
	let panelEl = $state<HTMLDivElement | null>(null);
	let hourListEl = $state<HTMLUListElement | null>(null);
	let minuteListEl = $state<HTMLUListElement | null>(null);
	let secondListEl = $state<HTMLUListElement | null>(null);
	let hourInputEl = $state<HTMLInputElement | null>(null);
	let minuteInputEl = $state<HTMLInputElement | null>(null);
	let secondInputEl = $state<HTMLInputElement | null>(null);

	useFloatingPanel(
		() => triggerEl,
		() => panelEl,
		() => open,
		closePanel
	);

	function scrollToItemBehavior(
		listEl: HTMLUListElement | null,
		index: number,
		behavior: ScrollBehavior
	) {
		const item = listEl?.children[index] as HTMLElement | undefined;
		if (!item || !listEl) return;
		const top = item.offsetTop - listEl.clientHeight / 2 + item.offsetHeight / 2;
		listEl.scrollTo({ top, behavior });
	}

	// Keep segment inputs in sync with state
	$effect(() => {
		if (hourInputEl) hourInputEl.value = showValues ? String(editH).padStart(2, '0') : '';
		if (minuteInputEl) minuteInputEl.value = showValues ? String(editM).padStart(2, '0') : '';
		if (secondInputEl) secondInputEl.value = showValues ? String(editS).padStart(2, '0') : '';
	});

	function syncFromValue() {
		const p = parseTimeString(value);
		editH = p.h;
		editM = p.m;
		editS = p.s;
	}

	function openPanel() {
		if (isDisabled || open) return;
		syncFromValue();
		open = true;
	}

	function closePanel() {
		open = false;
	}

	function commitValue() {
		value = buildTimeString(editH, editM, editS);
	}

	type Col = 'hour' | 'minute' | 'second';

	function getListEl(col: Col): HTMLUListElement | null {
		if (col === 'hour') return hourListEl;
		if (col === 'minute') return minuteListEl;
		return secondListEl;
	}

	function getVal(col: Col): number {
		if (col === 'hour') return editH;
		if (col === 'minute') return editM;
		return editS;
	}

	function setVal(col: Col, val: number) {
		if (col === 'hour') editH = val;
		else if (col === 'minute') editM = val;
		else editS = val;
	}

	function stepCol(col: Col, delta: number) {
		const max = col === 'hour' ? 24 : 60;
		setVal(col, (((getVal(col) + delta) % max) + max) % max);
		commitValue();
		scrollToItemBehavior(getListEl(col), getVal(col), 'smooth');
	}

	function commitColFromInput(col: Col, num: number) {
		const max = col === 'hour' ? 23 : 59;
		setVal(col, Math.min(max, Math.max(0, num)));
		commitValue();
		scrollToItemBehavior(getListEl(col), getVal(col), 'smooth');
	}

	async function advanceSeg(col: Col) {
		const inputEl = col === 'hour' ? hourInputEl : col === 'minute' ? minuteInputEl : secondInputEl;
		inputEl?.focus();
		await tick();
		inputEl?.select();
	}

	function handleSegInput(e: Event, col: Col) {
		const input = e.currentTarget as HTMLInputElement;
		const raw = input.value.replace(/\D/g, '');
		input.value = raw;
		if (raw.length === 0) return;
		const num = parseInt(raw, 10);

		const shouldAdvance =
			raw.length >= 2 ||
			(col === 'hour' && num > 2) ||
			(col === 'minute' && num > 5) ||
			(col === 'second' && num > 5);

		if (shouldAdvance) {
			if (col === 'hour') {
				editH = Math.min(23, num);
				scrollToItemBehavior(hourListEl, editH, 'smooth');
				advanceSeg('minute');
			} else if (col === 'minute') {
				editM = Math.min(59, num);
				scrollToItemBehavior(minuteListEl, editM, 'smooth');
				if (seconds) advanceSeg('second');
			} else {
				editS = Math.min(59, num);
				scrollToItemBehavior(secondListEl, editS, 'smooth');
			}
			commitValue();
		}
	}

	function handleSegBlur(e: FocusEvent, col: Col) {
		const input = e.currentTarget as HTMLInputElement;
		const raw = input.value.replace(/\D/g, '');
		if (raw.length === 0) return;
		const num = parseInt(raw, 10);
		commitColFromInput(col, num);
		input.value = String(getVal(col)).padStart(2, '0');
	}

	function handleSegKeydown(e: KeyboardEvent, col: Col) {
		const lastCol: Col = seconds ? 'second' : 'minute';
		switch (e.key) {
			case 'ArrowUp':
				e.preventDefault();
				stepCol(col, 1);
				break;
			case 'ArrowDown':
				e.preventDefault();
				stepCol(col, -1);
				break;
			case 'Tab':
				if (!e.shiftKey && col === lastCol) closePanel();
				else if (e.shiftKey && col === 'hour') closePanel();
				break;
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
	class="timepicker"
	class:timepicker--full-width={fullWidth}
	class:timepicker--disabled={isDisabled}
	{...restProps}
>
	<div
		bind:this={triggerEl}
		id={timepickerId}
		class="timepicker__trigger"
		class:timepicker__trigger--error={hasError}
		class:timepicker__trigger--open={open}
		class:timepicker__trigger--disabled={isDisabled}
		role="group"
		aria-label="Time picker"
		aria-describedby={describedBy}
	>
		<div class="timepicker__segments">
			<input
				bind:this={hourInputEl}
				class="timepicker__seg-input"
				type="text"
				inputmode="numeric"
				value={showValues ? String(editH).padStart(2, '0') : ''}
				placeholder={segPlaceholders.hour}
				aria-label="Hour"
				disabled={isDisabled}
				onfocus={() => openPanel()}
				onblur={(e) => handleSegBlur(e, 'hour')}
				onkeydown={(e) => handleSegKeydown(e, 'hour')}
				oninput={(e) => handleSegInput(e, 'hour')}
				onclick={(e) => (e.currentTarget as HTMLInputElement).select()}
			/>
			<span class="timepicker__seg-sep" aria-hidden="true">:</span>
			<input
				bind:this={minuteInputEl}
				class="timepicker__seg-input"
				type="text"
				inputmode="numeric"
				value={showValues ? String(editM).padStart(2, '0') : ''}
				placeholder={segPlaceholders.minute}
				aria-label="Minute"
				disabled={isDisabled}
				onfocus={() => openPanel()}
				onblur={(e) => handleSegBlur(e, 'minute')}
				onkeydown={(e) => handleSegKeydown(e, 'minute')}
				oninput={(e) => handleSegInput(e, 'minute')}
				onclick={(e) => (e.currentTarget as HTMLInputElement).select()}
			/>
			{#if seconds}
				<span class="timepicker__seg-sep" aria-hidden="true">:</span>
				<input
					bind:this={secondInputEl}
					class="timepicker__seg-input"
					type="text"
					inputmode="numeric"
					value={showValues ? String(editS).padStart(2, '0') : ''}
					placeholder={segPlaceholders.second}
					aria-label="Second"
					disabled={isDisabled}
					onfocus={() => openPanel()}
					onblur={(e) => handleSegBlur(e, 'second')}
					onkeydown={(e) => handleSegKeydown(e, 'second')}
					oninput={(e) => handleSegInput(e, 'second')}
					onclick={(e) => (e.currentTarget as HTMLInputElement).select()}
				/>
			{/if}
		</div>

		<button
			class="timepicker__icon-btn"
			type="button"
			tabindex="-1"
			aria-label={open ? 'Close time picker' : 'Open time picker'}
			aria-expanded={open}
			aria-controls={open ? panelId : undefined}
			disabled={isDisabled}
			onmousedown={(e) => e.preventDefault()}
			onclick={() => (open ? closePanel() : openPanel())}
			onkeydown={handleIconBtnKeydown}
		>
			<ClockIcon class="timepicker__icon" size={iconSize} aria-hidden="true" />
		</button>
	</div>

	{#if name && value}
		<input type="hidden" {name} {value} />
	{/if}

	{#if open}
		<TimePickerPanel
			id={panelId}
			bind:panelEl
			bind:hourListEl
			bind:minuteListEl
			bind:secondListEl
			bind:editH
			bind:editM
			bind:editS
			{seconds}
			onCommit={commitValue}
		/>
	{/if}
</div>
