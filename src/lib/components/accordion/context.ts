export const ACCORDION_KEY = Symbol('accordion');

export interface AccordionContext {
	isOpen: (value: string) => boolean;
	toggle: (value: string) => void;
}
