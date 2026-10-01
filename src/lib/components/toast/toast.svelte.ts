export type ToastVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type ToastPosition =
	'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastOptions {
	description?: string;
	variant?: ToastVariant;
	/** Duration in ms. Use 0 for persistent toasts. @default 4000 */
	duration?: number;
	dismissible?: boolean;
}

export interface ToastItem {
	id: string;
	message: string;
	description: string;
	variant: ToastVariant;
	duration: number;
	dismissible: boolean;
}

class ToastStore {
	items = $state<ToastItem[]>([]);

	add(message: string, options: ToastOptions = {}): string {
		const id = Math.random().toString(36).slice(2, 9);
		this.items.push({
			id,
			message,
			description: options.description ?? '',
			variant: options.variant ?? 'neutral',
			duration: options.duration ?? 4000,
			dismissible: options.dismissible ?? true
		});
		return id;
	}

	dismiss(id: string) {
		const idx = this.items.findIndex((t) => t.id === id);
		if (idx !== -1) this.items.splice(idx, 1);
	}

	clear() {
		this.items.splice(0, this.items.length);
	}

	success(message: string, options?: Omit<ToastOptions, 'variant'>): string {
		return this.add(message, { ...options, variant: 'success' });
	}

	danger(message: string, options?: Omit<ToastOptions, 'variant'>): string {
		return this.add(message, { ...options, variant: 'danger' });
	}

	warning(message: string, options?: Omit<ToastOptions, 'variant'>): string {
		return this.add(message, { ...options, variant: 'warning' });
	}

	info(message: string, options?: Omit<ToastOptions, 'variant'>): string {
		return this.add(message, { ...options, variant: 'info' });
	}
}

export const toast = new ToastStore();
