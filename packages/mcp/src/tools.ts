import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import components from './data/components.json' with { type: 'json' };
import tokens from './data/tokens.json' with { type: 'json' };
import { z } from 'zod';

export function registerTools(server: McpServer) {
	server.tool('list_components', 'List all available design system components', async () => {
		if (components.length === 0) {
			return {
				content: [
					{
						type: 'text' as const,
						text: 'No documented components found. Components need a SPEC.md file.'
					}
				]
			};
		}

		const list = components.map((c) => `- **${c.name}**: ${c.description}`);
		return {
			content: [
				{
					type: 'text' as const,
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
							type: 'text' as const,
							text: `Component "${name}" not found. Use list_components to see available components.`
						}
					]
				};
			}

			return {
				content: [{ type: 'text' as const, text: component.spec }]
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
					.map(
						([cat, toks]) =>
							`## ${cat}\n\n${(toks as string[]).map((t) => `- \`${t}\``).join('\n')}`
					)
					.join('\n\n');
				return {
					content: [
						{
							type: 'text' as const,
							text: `# All Primitive Tokens\n\n${allTokens}`
						}
					]
				};
			}

			const categoryTokens = tokens.primitives[category as keyof typeof tokens.primitives];
			if (!categoryTokens) {
				return {
					content: [
						{
							type: 'text' as const,
							text: `Category "${category}" not found. Available: colors, spacing, typography, radii, shadows, all`
						}
					]
				};
			}

			return {
				content: [
					{
						type: 'text' as const,
						text: `# ${category} Tokens\n\n${categoryTokens.map((t: string) => `- \`${t}\``).join('\n')}`
					}
				]
			};
		}
	);

	server.tool(
		'list_semantic_tokens',
		{
			component: z
				.string()
				.optional()
				.describe('Optional: filter by component prefix (e.g., button, card, sidebar)')
		},
		async ({ component }) => {
			let filteredTokens = tokens.semantic as string[];

			if (component) {
				filteredTokens = filteredTokens.filter((t: string) =>
					t.toLowerCase().includes(`--${component.toLowerCase()}`)
				);
			}

			if (filteredTokens.length === 0) {
				return {
					content: [
						{
							type: 'text' as const,
							text: component
								? `No semantic tokens found for "${component}".`
								: 'No semantic tokens found.'
						}
					]
				};
			}

			return {
				content: [
					{
						type: 'text' as const,
						text: `# Semantic Tokens${component ? ` (${component})` : ''}\n\nThese tokens are computed from theme variables in \`theme-base.css\`.\n\n${filteredTokens.map((t: string) => `- \`${t}\``).join('\n')}`
					}
				]
			};
		}
	);

	server.tool(
		'get_theme_variables',
		{
			theme: z.enum(['light', 'dark', 'dev']).describe('Theme name'),
			category: z
				.enum([
					'fonts',
					'colors',
					'shadows',
					'radii',
					'sizes',
					'borders',
					'focus',
					'backdrop',
					'transitions',
					'spacing',
					'all'
				])
				.optional()
				.describe('Optional: filter by category')
		},
		async ({ theme, category }) => {
			const themeVars = tokens.themeVariables[theme as keyof typeof tokens.themeVariables];
			if (!themeVars) {
				return {
					content: [
						{
							type: 'text' as const,
							text: `Theme "${theme}" not found. Available: light, dark, dev`
						}
					]
				};
			}

			type ThemeVars = typeof themeVars;
			type CategoryKey = keyof ThemeVars;

			if (category && category !== 'all') {
				const categoryVars = themeVars[category as CategoryKey] as Array<{
					name: string;
					value: string;
				}>;
				if (!categoryVars || categoryVars.length === 0) {
					return {
						content: [
							{
								type: 'text' as const,
								text: `No ${category} variables found in ${theme} theme.`
							}
						]
					};
				}

				return {
					content: [
						{
							type: 'text' as const,
							text: `# ${theme} Theme - ${category}\n\n${categoryVars.map((v) => `- \`${v.name}\`: \`${v.value}\``).join('\n')}`
						}
					]
				};
			}

			const allVars = Object.entries(themeVars)
				.filter(([, vars]) => (vars as Array<{ name: string; value: string }>).length > 0)
				.map(
					([cat, vars]) =>
						`## ${cat}\n\n${(vars as Array<{ name: string; value: string }>).map((v) => `- \`${v.name}\`: \`${v.value}\``).join('\n')}`
				)
				.join('\n\n');

			return {
				content: [
					{
						type: 'text' as const,
						text: `# ${theme} Theme Variables\n\nThese ~45 variables are the only ones you need to customize a theme.\n\n${allVars}`
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
						type: 'text' as const,
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
\`\`\`

## Creating a Custom Theme

Themes only need ~45 CSS variables. Create a new file and override what you need:

\`\`\`css
[data-theme='my-brand'] {
  --color-primary: #8b5cf6;
  --color-bg: #faf5ff;
  --radius-button: 9999px;
  --shadow-sm: none;
}
\`\`\`

See \`get_theme_variables\` tool for all available variables.`
					}
				]
			};
		}
	);
}
