export interface ListboxOption {
	disabled?: boolean;
}

/**
 * Move the active index in a direction, skipping disabled options.
 */
export function moveActiveIndex(
	options: ListboxOption[],
	activeIndex: number,
	direction: 1 | -1
): number {
	const total = options.length;
	if (total === 0) return -1;
	let next = activeIndex < 0 ? (direction === 1 ? 0 : total - 1) : activeIndex + direction;
	next = ((next % total) + total) % total;
	const start = next;
	while (options[next]?.disabled) {
		next = (next + direction + total) % total;
		if (next === start) return activeIndex;
	}
	return next;
}

/**
 * Find the last non-disabled option index.
 */
export function findLastEnabledIndex(options: ListboxOption[]): number {
	for (let i = options.length - 1; i >= 0; i--) {
		if (!options[i].disabled) return i;
	}
	return -1;
}

/**
 * Scroll the active option into view within a listbox element.
 */
export function scrollActiveIntoView(listboxEl: HTMLElement | null, activeIndex: number) {
	if (!listboxEl || activeIndex < 0) return;
	const el = listboxEl.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
	el?.scrollIntoView({ block: 'nearest' });
}
