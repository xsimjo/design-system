import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';

const TABS_CONTEXT = Symbol('tabs-context');

export interface TabsContext {
	value: string;
	setValue: (id: string) => void;
	disabled: boolean;
	tabs: SvelteSet<string>;
}

export function createTabsContext(
	getValue: () => string,
	setValue: (id: string) => void,
	disabled: boolean
): TabsContext {
	const tabs = new SvelteSet<string>();

	const context: TabsContext = {
		get value() {
			return getValue();
		},
		setValue,
		disabled,
		tabs
	};

	setContext(TABS_CONTEXT, context);
	return context;
}

export function getTabsContext(): TabsContext {
	const context = getContext<TabsContext>(TABS_CONTEXT);
	if (!context) {
		throw new Error('TabList and TabPanel must be used inside a Tabs component');
	}
	return context;
}
