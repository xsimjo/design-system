export const ACCORDION_KEY = Symbol('accordion');

export interface AccordionContext {
	readonly isOpen: (value: string) => boolean;
	readonly toggle: (value: string) => void;
}
