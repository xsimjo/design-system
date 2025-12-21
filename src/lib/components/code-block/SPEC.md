# CodeBlock

A component for displaying syntax-highlighted code with optional line numbers and copy functionality.

## Props

| Prop              | Type      | Default  | Description                         |
| ----------------- | --------- | -------- | ----------------------------------- |
| `code`            | `string`  | required | The code to display                 |
| `language`        | `string`  | `'text'` | Programming language for highlighting |
| `showLineNumbers` | `boolean` | `false`  | Show line numbers                   |
| `showHeader`      | `boolean` | `true`   | Show header with language label     |

## Slots

This component does not use slots.

## Usage

### Basic

```svelte
<CodeBlock code="console.log('Hello, World!');" language="javascript" />
```

### With Line Numbers

```svelte
<CodeBlock
	code={`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
	language="javascript"
	showLineNumbers
/>
```

### Without Header

```svelte
<CodeBlock code="npm install package" language="bash" showHeader={false} />
```

### Multi-line Code

```svelte
<CodeBlock
	code={`import { Button } from '$lib/components';

function App() {
  return <Button>Click me</Button>;
}`}
	language="svelte"
	showLineNumbers
/>
```

## Accessibility

- Code is rendered in a scrollable container
- Copy button provides visual feedback on success
- Uses Shiki for syntax highlighting with accessible color themes

## Tokens

This component uses the following semantic tokens:

- `--codeblock-bg` - Background color
- `--codeblock-border` - Border color
- `--codeblock-border-width` - Border width
- `--codeblock-border-radius` - Border radius
- `--codeblock-shadow` - Box shadow
- `--codeblock-padding-x` - Horizontal padding
- `--codeblock-padding-y` - Vertical padding
- `--codeblock-max-height` - Maximum height before scrolling
- `--codeblock-font-family` - Monospace font family
- `--codeblock-font-size` - Font size
- `--codeblock-line-height` - Line height
- `--codeblock-header-bg` - Header background color
- `--codeblock-header-border` - Header border color
- `--codeblock-header-border-width` - Header border width
- `--codeblock-header-padding-x` - Header horizontal padding
- `--codeblock-header-padding-y` - Header vertical padding
- `--codeblock-language-color` - Language label color
- `--codeblock-language-font-size` - Language label font size
- `--codeblock-language-font-weight` - Language label font weight
- `--codeblock-line-number-color` - Line number color
- `--codeblock-line-number-width` - Line number column width
- `--codeblock-line-number-gap` - Gap between line numbers and code
- `--codeblock-scrollbar-width` - Scrollbar width
- `--codeblock-scrollbar-track` - Scrollbar track color
- `--codeblock-scrollbar-thumb` - Scrollbar thumb color
- `--codeblock-scrollbar-thumb-hover` - Scrollbar thumb hover color
