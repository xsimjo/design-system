export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
	id: string;
	variant: ToastVariant;
	title: string;
	description?: string;
	duration?: number;
	dismissible?: boolean;
}

export type ToastInput = Omit<Toast, 'id'>;

function createToastStore() {
	let toasts = $state<Toast[]>([]);

	function add(input: ToastInput): string {
		const id = crypto.randomUUID();
		const toast: Toast = {
			id,
			dismissible: true,
			...input
		};
		toasts = [...toasts, toast];
		return id;
	}

	function remove(id: string) {
		toasts = toasts.filter((t) => t.id !== id);
	}

	function clear() {
		toasts = [];
	}

	function success(title: string, description?: string, duration?: number) {
		return add({ variant: 'success', title, description, duration });
	}

	function error(title: string, description?: string, duration?: number) {
		return add({ variant: 'error', title, description, duration });
	}

	function warning(title: string, description?: string, duration?: number) {
		return add({ variant: 'warning', title, description, duration });
	}

	function info(title: string, description?: string, duration?: number) {
		return add({ variant: 'info', title, description, duration });
	}

	return {
		get toasts() {
			return toasts;
		},
		add,
		remove,
		clear,
		success,
		error,
		warning,
		info
	};
}

export const toastStore = createToastStore();
