# FileInput

Drag-and-drop file upload zone with a styled drop area, selected file list, and native browser fallback. Supports single or multiple files, type restrictions, size display, and full Field context integration.

## Props

| Prop          | Type                                | Default                                | Description                                                                                              |
| ------------- | ----------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `files`       | `FileList \| null`                  | `null`                                 | Bindable selected files                                                                                  |
| `placeholder` | `string`                            | `'Drop files here or click to browse'` | Drop zone label text                                                                                     |
| `hint`        | `string`                            | `undefined`                            | Secondary help text inside the zone. Overrides auto-generated accept hint.                               |
| `accept`      | `string`                            | `undefined`                            | MIME types or file extensions forwarded to the native input. Displayed as a hint when `hint` is not set. |
| `multiple`    | `boolean`                           | `false`                                | Allows selecting more than one file                                                                      |
| `maxSize`     | `number`                            | `undefined`                            | Display-only max file size in bytes; shown as a hint inside the zone                                     |
| `size`        | `'sm' \| 'md' \| 'lg'`              | `'md'`                                 | Controls zone padding and font size                                                                      |
| `fullWidth`   | `boolean`                           | `false`                                | Stretches to 100% of container width                                                                     |
| `disabled`    | `boolean`                           | `false`                                | Disables interaction; also inherited from parent `Field` context                                         |
| `success`     | `boolean`                           | `false`                                | Applies success border state                                                                             |
| `id`          | `string`                            | `undefined`                            | Custom ID; auto-set from `Field` context if omitted                                                      |
| `name`        | `string`                            | `undefined`                            | Form field name; emits hidden inputs with selected file names for native form submission                 |
| `onchange`    | `(files: FileList \| null) => void` | `undefined`                            | Called when the file selection changes (via drop or browse)                                              |

## Context Integration

When placed inside a `<Field>`, `FileInput` automatically:

- Reads `id` from the `Field` context and applies it to the native `<input type="file">`
- Sets `aria-describedby` from any `FieldDescription` IDs registered in context
- Sets `aria-required` when the parent `Field` has `required`
- Sets `aria-invalid` when the parent `Field` has an `error`
- Inherits `disabled` state from the parent `Field`
- Applies error border styling when `Field` has an `error`

## Usage

### Basic

```svelte
<script>
	import { FileInput } from '@xsimjo/design-system';
	let files = $state(null);
</script>

<FileInput bind:files placeholder="Drop a file here or click to browse" />
```

### Multiple Files

```svelte
<FileInput bind:files multiple placeholder="Drop files here or click to browse" />
```

### File Type Restriction

```svelte
<FileInput
	bind:files
	accept="image/png,image/jpeg,image/webp"
	hint="PNG, JPEG, or WebP"
	maxSize={5 * 1024 * 1024}
	multiple
/>
```

### Inside a Field

```svelte
<script>
	import { Field, FieldLabel, FieldDescription, FileInput } from '@xsimjo/design-system';
	let files = $state(null);
</script>

<Field>
	<FieldLabel>Attachments</FieldLabel>
	<FileInput bind:files multiple />
	<FieldDescription>Attach any supporting documents.</FieldDescription>
</Field>
```

### With Error (via Field)

```svelte
<Field error="Please upload at least one file.">
	<FieldLabel>Resume</FieldLabel>
	<FileInput placeholder="Drop your resume here or click to browse" />
</Field>
```

### Disabled

```svelte
<FileInput disabled placeholder="Upload unavailable" />
```

### Success

```svelte
<FileInput success placeholder="Upload complete" />
```

## Accessibility

- The hidden `<input type="file">` receives the `id` linked by `FieldLabel`'s `for` attribute — no manual plumbing needed inside a `Field`
- The visible drop zone is a `role="button"` div with `tabindex="0"`, making it keyboard-focusable
- `aria-describedby` is composed from all `FieldDescription` IDs in context
- `aria-required` and `aria-invalid` are driven by `Field` context props
- `Enter` and `Space` open the native file browser from the drop zone
- Each file remove button has `aria-label="Remove {filename}"` for screen reader clarity
- The file list has `aria-label="Selected files"` and uses `role="list"` semantics

## Tokens

| Token                            | Description                              |
| -------------------------------- | ---------------------------------------- |
| `--file-input-bg`                | Drop zone background color               |
| `--file-input-fg`                | Drop zone text color                     |
| `--file-input-border`            | Drop zone border color                   |
| `--file-input-border-width`      | Drop zone border thickness               |
| `--file-input-border-style`      | Border style (dashed by default)         |
| `--file-input-border-radius`     | Drop zone corner radius                  |
| `--file-input-focus-color`       | Border and ring color on focus           |
| `--file-input-focus-ring-width`  | Focus ring width                         |
| `--file-input-focus-ring-offset` | Focus ring offset                        |
| `--file-input-hover-bg`          | Zone background on hover                 |
| `--file-input-hover-border`      | Zone border color on hover               |
| `--file-input-drag-bg`           | Zone background while dragging over      |
| `--file-input-drag-border`       | Zone border color while dragging over    |
| `--file-input-error-color`       | Border color in error state              |
| `--file-input-success-color`     | Border color in success state            |
| `--file-input-disabled-bg`       | Background when disabled                 |
| `--file-input-disabled-fg`       | Text color when disabled                 |
| `--file-input-disabled-border`   | Border color when disabled               |
| `--file-input-hint-fg`           | Hint text color                          |
| `--file-input-icon-fg`           | Upload icon color                        |
| `--file-input-file-bg`           | File list item background                |
| `--file-input-file-border`       | File list item border color              |
| `--file-input-file-name-fg`      | File name text color                     |
| `--file-input-file-size-fg`      | File size text color                     |
| `--file-input-remove-fg`         | Remove button icon color                 |
| `--file-input-remove-hover-fg`   | Remove button icon color on hover        |
| `--file-input-sm-padding-y`      | Vertical padding for small size          |
| `--file-input-sm-padding-x`      | Horizontal padding for small size        |
| `--file-input-sm-icon-size`      | Upload icon size for small zone          |
| `--file-input-sm-font-size`      | Font size for small zone                 |
| `--file-input-md-padding-y`      | Vertical padding for medium size         |
| `--file-input-md-padding-x`      | Horizontal padding for medium size       |
| `--file-input-md-icon-size`      | Upload icon size for medium zone         |
| `--file-input-md-font-size`      | Font size for medium zone                |
| `--file-input-lg-padding-y`      | Vertical padding for large size          |
| `--file-input-lg-padding-x`      | Horizontal padding for large size        |
| `--file-input-lg-icon-size`      | Upload icon size for large zone          |
| `--file-input-lg-font-size`      | Font size for large zone                 |
| `--file-input-font-family`       | Zone font family                         |
| `--file-input-font-weight`       | Zone font weight                         |
| `--file-input-transition`        | Transition timing for interactive states |
| `--file-input-gap`               | Gap between zone and file list           |
