export const TABS_KEY = Symbol('tabs');

export interface TabsContext {
	activeValue: () => string;
	select: (value: string) => void;
	variant: () => 'underline' | 'pills' | 'enclosed';
	size: () => 'sm' | 'md' | 'lg';
	fullWidth: () => boolean;
	getTabId: (value: string) => string;
	getPanelId: (value: string) => string;
}
