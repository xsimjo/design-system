# Contributing to @xsimjo/design-system

Thank you for your interest in contributing to the design system! This document provides guidelines and instructions for contributing.

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/xsimjo/design-system.git
cd design-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The showcase app runs on port 5175.

## Project Structure

```
src/
├── lib/
│   ├── components/     # Component source files
│   │   └── {name}/     # Each component in its own folder
│   │       └── {Name}.svelte
│   ├── icons/          # Icon components
│   │   └── {Name}Icon.svelte
│   └── styles/
│       ├── primitives.css    # Raw design values
│       ├── theme-base.css    # Semantic tokens computed from themes
│       ├── themes/           # Theme definitions
│       │   ├── light.css
│       │   ├── dark.css
│       │   └── dev.css
│       └── global.css        # Imports and base styles
├── routes/             # Showcase/demo pages
└── index.ts            # Library exports
```

## Code Style

### General

- Write self-documenting code (no comments needed)
- Keep it simple - avoid over-engineering
- Run `npm run lint` and `npm run format` before committing

### Components

- Each component lives in `src/lib/components/{component-name}/`
- Use Svelte 5 runes (`$props`, `$state`, `$derived`, `$effect`)
- Extend native HTML attributes where applicable
- Use semantic tokens only (never reference primitives directly)

### Styling

- Pure CSS only (no CSS-in-JS)
- Use the three-layer token system:
  - Components use semantic tokens from `theme-base.css`
  - Themes override ~45 simple variables
  - Primitives provide raw values
- Use `color-mix(in oklch, ...)` for color calculations

### Icons

- Icons go in `src/lib/icons/`
- Name format: `{IconName}Icon.svelte`
- Use Lucide icons as the source
- Accept `size` prop with default of 24

## Adding a New Component

1. Create the component folder:

```bash
mkdir src/lib/components/my-component
```

2. Create the component file following existing patterns:

```svelte
<!-- src/lib/components/my-component/MyComponent.svelte -->
<script lang="ts">
	interface Props {
		// Define props
	}

	let { ...props }: Props = $props();
</script>

<!-- Template using semantic tokens -->

<style>
	/* Styles using semantic tokens */
</style>
```

3. Add semantic tokens to `theme-base.css`:

```css
[data-theme] {
	--my-component-bg: var(--color-bg-elevated);
	--my-component-text: var(--color-text);
	/* ... */
}
```

4. Export the component in `src/lib/index.ts`:

```typescript
export { default as MyComponent } from './components/my-component/MyComponent.svelte';
```

5. Create a showcase page in `src/routes/`

## Adding Theme Variables

When adding new theme variables:

1. Add to all theme files (`light.css`, `dark.css`, `dev.css`)
2. Add the computed semantic tokens to `theme-base.css`
3. Document in `docs/design_system.md`

## Commit Messages

Follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `docs:` - Documentation updates

Examples:

```
feat: add Pagination component
fix: resolve focus trap in Dialog
chore: update dependencies
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the guidelines above
3. Run linting and formatting: `npm run lint && npm run format`
4. Test your changes in the showcase app
5. Submit a pull request with a clear description

## Accessibility Guidelines

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain visible focus indicators
- Support screen readers

## Questions?

Open an issue for questions or discussions about contributing.
