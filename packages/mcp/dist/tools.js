import components from './data/components.json' with { type: 'json' };
import tokens from './data/tokens.json' with { type: 'json' };
import { z } from 'zod';
export function registerTools(server) {
	server.tool('list_components', 'List all available design system components', async () => {
		if (components.length === 0) {
			return {
				content: [
					{
						type: 'text',
						text: 'No documented components found. Components need a SPEC.md file.'
					}
				]
			};
		}
		const list = components.map((c) => `- **${c.name}**: ${c.description}`);
		return {
			content: [
				{
					type: 'text',
					text: `# Available Components\n\n${list.join('\n')}`
				}
			]
		};
	});
	server.tool(
		'get_component_docs',
		{
			name: z.string().describe('Component name (e.g., Button, Card, Avatar)')
		},
		async ({ name }) => {
			const component = components.find((c) => c.name.toLowerCase() === name.toLowerCase());
			if (!component) {
				return {
					content: [
						{
							type: 'text',
							text: `Component "${name}" not found. Use list_components to see available components.`
						}
					]
				};
			}
			return {
				content: [{ type: 'text', text: component.spec }]
			};
		}
	);
	server.tool(
		'list_tokens',
		{
			category: z
				.enum(['colors', 'spacing', 'typography', 'radii', 'shadows', 'all'])
				.describe('Token category to list')
		},
		async ({ category }) => {
			if (category === 'all') {
				const allTokens = Object.entries(tokens.primitives)
					.map(([cat, toks]) => `## ${cat}\n\n${toks.map((t) => `- \`${t}\``).join('\n')}`)
					.join('\n\n');
				return {
					content: [
						{
							type: 'text',
							text: `# All Primitive Tokens\n\n${allTokens}`
						}
					]
				};
			}
			const categoryTokens = tokens.primitives[category];
			if (!categoryTokens) {
				return {
					content: [
						{
							type: 'text',
							text: `Category "${category}" not found. Available: colors, spacing, typography, radii, shadows, all`
						}
					]
				};
			}
			return {
				content: [
					{
						type: 'text',
						text: `# ${category} Tokens\n\n${categoryTokens.map((t) => `- \`${t}\``).join('\n')}`
					}
				]
			};
		}
	);
	server.tool(
		'get_theme_tokens',
		{
			theme: z.enum(['light', 'dark', 'dev']).describe('Theme name'),
			component: z
				.string()
				.optional()
				.describe('Optional: filter by component (e.g., button, card)')
		},
		async ({ theme, component }) => {
			const themeTokens = tokens.semantic[theme];
			if (!themeTokens) {
				return {
					content: [
						{
							type: 'text',
							text: `Theme "${theme}" not found. Available: light, dark, dev`
						}
					]
				};
			}
			let filteredTokens = themeTokens;
			if (component) {
				filteredTokens = themeTokens.filter((t) =>
					t.toLowerCase().includes(`--${component.toLowerCase()}`)
				);
			}
			return {
				content: [
					{
						type: 'text',
						text: `# ${theme} Theme Tokens${component ? ` (${component})` : ''}\n\n${filteredTokens.map((t) => `- \`${t}\``).join('\n')}`
					}
				]
			};
		}
	);
	server.tool(
		'get_import_examples',
		'Show how to import and use the design system in a project',
		async () => {
			return {
				content: [
					{
						type: 'text',
						text: `# Importing @xsimjo/design-system

## Install

\`\`\`bash
npm install @xsimjo/design-system
\`\`\`

## Import Components

\`\`\`svelte
<script>
  import { Button, Card, Avatar, Dialog } from '@xsimjo/design-system';
</script>

<Button variant="filled" color="primary">Click me</Button>
\`\`\`

## Import Styles

\`\`\`js
import '@xsimjo/design-system/styles';              // All styles
import '@xsimjo/design-system/styles/themes/light'; // Light theme only
import '@xsimjo/design-system/styles/themes/dark';  // Dark theme only
\`\`\`

## Theme Switching

\`\`\`html
<html data-theme="light">
\`\`\`

\`\`\`svelte
<script>
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
  }
</script>
\`\`\``
					}
				]
			};
		}
	);
}
