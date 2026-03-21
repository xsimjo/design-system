export const POPOVER_KEY = Symbol('popover');

export interface PopoverContext {
	close: () => void;
}
