import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

/**
 * Registers floating-ui positioning and click-outside handling for a panel.
 * Call this during component initialization — the effects are owned by the
 * calling component's reactive context.
 */
export function useFloatingPanel(
	getTrigger: () => HTMLElement | null,
	getPanel: () => HTMLElement | null,
	isOpen: () => boolean,
	onClose: () => void
) {
	async function updatePosition() {
		const trigger = getTrigger();
		const panel = getPanel();
		if (!trigger || !panel) return;
		const { x, y } = await computePosition(trigger, panel, {
			placement: 'bottom-start',
			strategy: 'fixed',
			middleware: [offset(4), flip({ padding: 8 }), shift({ padding: 8 })]
		});
		panel.style.left = `${x}px`;
		panel.style.top = `${y}px`;
	}

	$effect(() => {
		const trigger = getTrigger();
		const panel = getPanel();
		if (isOpen() && trigger && panel) {
			return autoUpdate(trigger, panel, updatePosition);
		}
	});

	$effect(() => {
		if (!isOpen()) return;
		function handleClickOutside(e: MouseEvent) {
			if (!getTrigger()?.contains(e.target as Node) && !getPanel()?.contains(e.target as Node)) {
				onClose();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});
}
