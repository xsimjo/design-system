<script lang="ts">
	import './file-input.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import CloudUploadIcon from '$lib/icons/CloudUploadIcon.svelte';
	import FileUpIcon from '$lib/icons/FileUpIcon.svelte';
	import XIcon from '$lib/icons/XIcon.svelte';

	interface Props {
		files?: FileList | null;
		placeholder?: string;
		hint?: string;
		accept?: string;
		multiple?: boolean;
		maxSize?: number;
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		success?: boolean;
		id?: string;
		name?: string;
		onchange?: (files: FileList | null) => void;
	}

	let {
		files = $bindable(null),
		placeholder = 'Drop files here or click to browse',
		hint,
		accept,
		multiple = false,
		maxSize,
		size = 'md',
		fullWidth = false,
		disabled = false,
		success = false,
		id,
		name,
		onchange
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `file-input-${Math.random().toString(36).slice(2, 9)}`;
	const inputId = $derived(id ?? field?.id ?? uid);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	let inputEl = $state<HTMLInputElement | null>(null);
	let isDragOver = $state(false);

	const fileList = $derived(files ? Array.from(files) : []);

	const iconSize = $derived(size === 'sm' ? 24 : size === 'lg' ? 40 : 32);

	function handleClick() {
		if (isDisabled) return;
		inputEl?.click();
	}

	function handleChange(e: Event) {
		const input = e.target as HTMLInputElement;
		files = input.files;
		onchange?.(files);
	}

	function handleDragover(e: DragEvent) {
		if (isDisabled) return;
		e.preventDefault();
		isDragOver = true;
	}

	function handleDragleave(e: DragEvent) {
		const zone = e.currentTarget as HTMLElement;
		if (!zone.contains(e.relatedTarget as Node)) {
			isDragOver = false;
		}
	}

	function handleDrop(e: DragEvent) {
		if (isDisabled) return;
		e.preventDefault();
		isDragOver = false;
		const dt = e.dataTransfer;
		if (dt?.files.length) {
			files = dt.files;
			if (inputEl) inputEl.files = files;
			onchange?.(files);
		}
	}

	function removeFile(index: number) {
		if (isDisabled || !files) return;
		const arr = Array.from(files);
		arr.splice(index, 1);
		const dt = new DataTransfer();
		arr.forEach((f) => dt.items.add(f));
		files = dt.files;
		if (inputEl) inputEl.files = files;
		onchange?.(files.length ? files : null);
	}

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	}
</script>

<div class="file-input" class:file-input--full-width={fullWidth}>
	<input
		bind:this={inputEl}
		id={inputId}
		type="file"
		class="file-input__native"
		{accept}
		{multiple}
		disabled={isDisabled}
		aria-describedby={describedBy}
		aria-required={field?.required || undefined}
		aria-invalid={hasError || undefined}
		onchange={handleChange}
	/>

	<div
		role="button"
		tabindex={isDisabled ? -1 : 0}
		class="file-input__zone file-input__zone--{size}"
		class:file-input__zone--drag-over={isDragOver}
		class:file-input__zone--error={hasError}
		class:file-input__zone--success={success && !hasError}
		class:file-input__zone--disabled={isDisabled}
		aria-label={placeholder}
		aria-disabled={isDisabled || undefined}
		ondragover={handleDragover}
		ondragleave={handleDragleave}
		ondrop={handleDrop}
		onclick={handleClick}
		onkeydown={handleKeydown}
	>
		<CloudUploadIcon size={iconSize} class="file-input__icon" aria-hidden="true" />
		<span class="file-input__placeholder">{placeholder}</span>
		{#if hint}
			<span class="file-input__hint">{hint}</span>
		{/if}
		{#if accept && !hint}
			<span class="file-input__hint">Accepted formats: {accept}</span>
		{/if}
		{#if maxSize}
			<span class="file-input__hint">Max size: {formatSize(maxSize)}</span>
		{/if}
	</div>

	{#if fileList.length > 0}
		<ul class="file-input__file-list" role="list" aria-label="Selected files">
			{#each fileList as file, i (i)}
				<li class="file-input__file-item">
					<FileUpIcon size={16} class="file-input__file-icon" aria-hidden="true" />
					<span class="file-input__file-name" title={file.name}>{file.name}</span>
					<span class="file-input__file-size">{formatSize(file.size)}</span>
					{#if !isDisabled}
						<button
							type="button"
							class="file-input__file-remove"
							aria-label="Remove {file.name}"
							onclick={() => removeFile(i)}
						>
							<XIcon size={14} aria-hidden="true" />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}

	{#if name && files}
		{#each fileList as file (file.name)}
			<input type="hidden" {name} value={file.name} />
		{/each}
	{/if}
</div>
