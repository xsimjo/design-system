<script lang="ts">
	import './timepicker.css';
	import { getContext } from 'svelte';
	import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import ClockIcon from '$lib/icons/ClockIcon.svelte';

	interface Props {
		value?: string; // "HH:MM" or "HH:MM:SS" in 24-hour
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		seconds?: boolean; // show seconds column
	}

	let {
		value = $bindable(undefined),
		size = 'md',
		fullWidth = false,
		disabled = false,
		id,
		name,
		seconds = false
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

	const hourValues = Array.from({ length: 24 }, (_, i) => i);
	const minuteValues = Array.from({ length: 60 }, (_, i) => i);
	const secondValues = Array.from({ length: 60 }, (_, i) => i);

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

	// Whether to show numeric values vs empty placeholders
	const showValues = $derived(hasValue || open);
	let triggerEl = $state<HTMLDivElement | null>(null);
	let panelEl = $state<HTMLDivElement | null>(null);

	let hourListEl = $state<HTMLUListElement | null>(null);
	let minuteListEl = $state<HTMLUListElement | null>(null);
	let secondListEl = $state<HTMLUListElement | null>(null);

	let hourInputEl = $state<HTMLInputElement | null>(null);
	let minuteInputEl = $state<HTMLInputElement | null>(null);
	let secondInputEl = $state<HTMLInputElement | null>(null);

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

	async function updatePosition() {
		if (!triggerEl || !panelEl) return;
		const { x, y } = await computePosition(triggerEl, panelEl, {
			placement: 'bottom-start',
			strategy: 'fixed',
			middleware: [offset(4), flip({ padding: 8 }), shift({ padding: 8 })]
		});
		panelEl.style.left = `${x}px`;
		panelEl.style.top = `${y}px`;
	}

	$effect(() => {
		if (open && triggerEl && panelEl) {
			return autoUpdate(triggerEl, panelEl, updatePosition);
		}
	});

	$effect(() => {
		if (!open) return;
		function handleClickOutside(e: MouseEvent) {
			if (!triggerEl?.contains(e.target as Node) && !panelEl?.contains(e.target as Node)) {
				closePanel();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	// Scroll columns to selected items when panel opens
	$effect(() => {
		if (!open) return;
		setTimeout(() => {
			scrollToItemBehavior(hourListEl, editH, 'instant');
			scrollToItemBehavior(minuteListEl, editM, 'instant');
			if (seconds) scrollToItemBehavior(secondListEl, editS, 'instant');
		}, 0);
	});

	// Keep segment inputs in sync with state
	$effect(() => {
		if (hourInputEl) hourInputEl.value = showValues ? String(editH).padStart(2, '0') : '';
	});
	$effect(() => {
		if (minuteInputEl) minuteInputEl.value = showValues ? String(editM).padStart(2, '0') : '';
	});
	$effect(() => {
		if (secondInputEl) secondInputEl.value = showValues ? String(editS).padStart(2, '0') : '';
	});

	function syncFromValue() {
		const p = parseTimeString(value);
		editH = p.h;
		editM = p.m;
		editS = p.s;
	}

	function openPanel() {
		if (isDisabled) return;
		syncFromValue();
		open = true;
		setTimeout(() => {
			hourInputEl?.focus();
			hourInputEl?.select();
		}, 0);
	}

	function closePanel() {
		open = false;
	}

	function commitValue() {
		value = buildTimeString(editH, editM, editS);
	}

	type Col = 'hour' | 'minute' | 'second';
	const colMax: Record<Col, number> = { hour: 24, minute: 60, second: 60 };

	function getListEl(col: Col) {
		if (col === 'hour') return hourListEl;
		if (col === 'minute') return minuteListEl;
		return secondListEl;
	}

	function getVal(col: Col) {
		if (col === 'hour') return editH;
		if (col === 'minute') return editM;
		return editS;
	}

	function setVal(col: Col, val: number) {
		if (col === 'hour') editH = val;
		else if (col === 'minute') editM = val;
		else editS = val;
	}

	function commitCol(col: Col, num: number) {
		setVal(col, Math.min(colMax[col] - 1, Math.max(0, num)));
		commitValue();
		scrollToItemBehavior(getListEl(col), getVal(col), 'smooth');
	}

	function stepCol(col: Col, delta: number) {
		const max = colMax[col];
		setVal(col, (((getVal(col) + delta) % max) + max) % max);
		commitValue();
		scrollToItemBehavior(getListEl(col), getVal(col), 'smooth');
	}

	function selectCol(col: Col, val: number) {
		setVal(col, val);
		commitValue();
		scrollToItemBehavior(getListEl(col), val, 'smooth');
	}

	function handleSegInput(e: Event, col: 'hour' | 'minute' | 'second') {
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
				minuteInputEl?.focus();
				setTimeout(() => minuteInputEl?.select(), 0);
			} else if (col === 'minute' && seconds) {
				secondInputEl?.focus();
				setTimeout(() => secondInputEl?.select(), 0);
			}
		}
	}

	function handleSegBlur(e: FocusEvent, col: 'hour' | 'minute' | 'second') {
		const input = e.currentTarget as HTMLInputElement;
		const raw = input.value.replace(/\D/g, '');
		if (raw.length === 0) return;
		const num = parseInt(raw, 10);
		commitCol(col, num);
		input.value = String(getVal(col)).padStart(2, '0');
	}

	function handleSegKeydown(e: KeyboardEvent, col: 'hour' | 'minute' | 'second') {
		const lastCol = seconds ? 'second' : 'minute';
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
>
	<div
		bind:this={triggerEl}
		id={timepickerId}
		class="timepicker__trigger timepicker__trigger--{size}"
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
				placeholder="HH"
				aria-label="Hour"
				disabled={isDisabled}
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
				placeholder="MM"
				aria-label="Minute"
				disabled={isDisabled}
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
					placeholder="SS"
					aria-label="Second"
					disabled={isDisabled}
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
			<ClockIcon class="timepicker__icon" size={16} aria-hidden="true" />
		</button>
	</div>

	{#if name && value}
		<input type="hidden" {name} {value} />
	{/if}

	{#if open}
		<div
			bind:this={panelEl}
			id={panelId}
			class="timepicker__panel"
			role="dialog"
			aria-modal="true"
			aria-label="Choose time"
		>
			<div class="timepicker__columns">
				<ul
					bind:this={hourListEl}
					class="timepicker__col-list"
					tabindex="-1"
					role="listbox"
					aria-label="Hour"
				>
					{#each hourValues as h (h)}
						<li
							class="timepicker__col-item"
							class:timepicker__col-item--selected={h === editH}
							role="option"
							aria-selected={h === editH}
							onclick={() => selectCol('hour', h)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									selectCol('hour', h);
								}
							}}
						>
							{String(h).padStart(2, '0')}
						</li>
					{/each}
				</ul>

				<div class="timepicker__col-sep" aria-hidden="true"></div>

				<ul
					bind:this={minuteListEl}
					class="timepicker__col-list"
					tabindex="-1"
					role="listbox"
					aria-label="Minute"
				>
					{#each minuteValues as m (m)}
						<li
							class="timepicker__col-item"
							class:timepicker__col-item--selected={m === editM}
							role="option"
							aria-selected={m === editM}
							onclick={() => selectCol('minute', m)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									selectCol('minute', m);
								}
							}}
						>
							{String(m).padStart(2, '0')}
						</li>
					{/each}
				</ul>

				{#if seconds}
					<div class="timepicker__col-sep" aria-hidden="true"></div>

					<ul
						bind:this={secondListEl}
						class="timepicker__col-list"
						tabindex="-1"
						role="listbox"
						aria-label="Second"
					>
						{#each secondValues as s (s)}
							<li
								class="timepicker__col-item"
								class:timepicker__col-item--selected={s === editS}
								role="option"
								aria-selected={s === editS}
								onclick={() => selectCol('second', s)}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										selectCol('second', s);
									}
								}}
							>
								{String(s).padStart(2, '0')}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if}
</div>
