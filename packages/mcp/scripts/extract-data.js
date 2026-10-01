import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DESIGN_SYSTEM_ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(__dirname, '..', 'src', 'data');

function extractComponents() {
	const componentsDir = join(DESIGN_SYSTEM_ROOT, 'src', 'lib', 'components');
	const componentFolders = readdirSync(componentsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	const components = [];

	for (const folder of componentFolders) {
		const folderPath = join(componentsDir, folder);
		const specPath = join(folderPath, 'SPEC.md');

		if (!existsSync(specPath)) {
			continue;
		}

		const spec = readFileSync(specPath, 'utf-8');

		const nameMatch = spec.match(/^#\s+(\w+)/);
		const name = nameMatch ? nameMatch[1] : folder;

		const descMatch = spec.match(/^#[^\n]+\n\n([^\n]+)/);
		const description = descMatch ? descMatch[1] : '';

		components.push({ name, folder, description, spec });
	}

	return components;
}

// Returns the contents of the first `[data-theme] { ... }` block, which is where
// each component declares its own token defaults. Later blocks are variant
// overrides (e.g. `.button--outline`) and must not be treated as defaults.
function firstDataThemeBlock(css) {
	const start = css.search(/\[data-theme[^\]]*\]\s*\{/);
	if (start === -1) return null;
	const open = css.indexOf('{', start);
	let depth = 0;
	for (let i = open; i < css.length; i++) {
		if (css[i] === '{') depth++;
		else if (css[i] === '}') {
			depth--;
			if (depth === 0) return css.slice(open + 1, i);
		}
	}
	return null;
}

// component folder -> { '--token': 'value' }, read straight from the CSS so that
// docs pages and SPEC.md never restate a value that could drift.
function extractComponentTokens() {
	const componentsDir = join(DESIGN_SYSTEM_ROOT, 'src', 'lib', 'components');
	const folders = readdirSync(componentsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	const byComponent = {};

	for (const folder of folders) {
		const folderPath = join(componentsDir, folder);
		const cssFiles = readdirSync(folderPath).filter((f) => f.endsWith('.css'));
		if (cssFiles.length === 0) continue;

		// Read the folder's own stylesheet first so it wins on any name collision.
		cssFiles.sort((a, b) => (a === `${folder}.css` ? -1 : b === `${folder}.css` ? 1 : 0));

		const tokens = {};
		for (const file of cssFiles) {
			const block = firstDataThemeBlock(readFileSync(join(folderPath, file), 'utf-8'));
			if (!block) continue;
			for (const match of block.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)) {
				const name = match[1];
				if (name in tokens) continue;
				tokens[name] = match[2]
					.replace(/\s+/g, ' ')
					.replace(/\(\s+/g, '(')
					.replace(/\s+\)/g, ')')
					.trim();
			}
		}

		if (Object.keys(tokens).length > 0) byComponent[folder] = tokens;
	}

	return byComponent;
}

function extractTokens() {
	const stylesDir = join(DESIGN_SYSTEM_ROOT, 'src', 'lib', 'styles');

	const primitivesPath = join(stylesDir, 'primitives.css');
	const primitivesContent = readFileSync(primitivesPath, 'utf-8');
	const primitives = parseTokens(primitivesContent);

	const themeBasePath = join(stylesDir, 'themes', 'light.css');
	const themeBaseContent = readFileSync(themeBasePath, 'utf-8');
	const semantic = parseSemanticTokens(themeBaseContent);

	const themes = ['light', 'dark', 'dev'];
	const themeVariables = {};

	for (const theme of themes) {
		const themePath = join(stylesDir, 'themes', `${theme}.css`);
		if (existsSync(themePath)) {
			const themeContent = readFileSync(themePath, 'utf-8');
			themeVariables[theme] = parseThemeVariables(themeContent);
		}
	}

	return { primitives, semantic, themeVariables };
}

function parseTokens(content) {
	const tokens = {
		colors: [],
		spacing: [],
		typography: [],
		radii: [],
		shadows: [],
		other: []
	};

	const matches = content.matchAll(/--([^:]+):\s*([^;]+);/g);

	for (const match of matches) {
		const name = `--${match[1].trim()}`;

		if (
			name.includes('color') ||
			name.includes('blue') ||
			name.includes('slate') ||
			name.includes('gray') ||
			name.includes('green') ||
			name.includes('red') ||
			name.includes('amber') ||
			name.includes('opacity')
		) {
			tokens.colors.push(name);
		} else if (name.includes('space')) {
			tokens.spacing.push(name);
		} else if (name.includes('font') || name.includes('line-height') || name.includes('letter')) {
			tokens.typography.push(name);
		} else if (name.includes('radius')) {
			tokens.radii.push(name);
		} else if (name.includes('shadow')) {
			tokens.shadows.push(name);
		} else {
			tokens.other.push(name);
		}
	}

	return tokens;
}

function parseSemanticTokens(content) {
	const dataThemeMatch = content.match(/\[data-theme[^\]]*\]\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
	if (!dataThemeMatch) return [];

	const tokens = [];
	const matches = dataThemeMatch[1].matchAll(/--([^:]+):\s*([^;]+);/g);

	for (const match of matches) {
		tokens.push(`--${match[1].trim()}`);
	}

	return tokens;
}

function parseThemeVariables(content) {
	const variables = {
		fonts: [],
		colors: [],
		shadows: [],
		radii: [],
		sizes: [],
		borders: [],
		focus: [],
		backdrop: [],
		transitions: [],
		spacing: []
	};

	const matches = content.matchAll(/--([^:]+):\s*([^;]+);/g);

	for (const match of matches) {
		const name = `--${match[1].trim()}`;
		const value = match[2].trim();

		if (name.includes('font-')) {
			variables.fonts.push({ name, value });
		} else if (name.includes('color-') || name.includes('-link')) {
			variables.colors.push({ name, value });
		} else if (name.includes('shadow-')) {
			variables.shadows.push({ name, value });
		} else if (name.includes('radius-')) {
			variables.radii.push({ name, value });
		} else if (name.includes('field-height')) {
			variables.sizes.push({ name, value });
		} else if (name.includes('border-') || name.includes('focus-ring-width')) {
			variables.borders.push({ name, value });
		} else if (name.includes('focus-ring-color') || name.includes('hover-')) {
			variables.focus.push({ name, value });
		} else if (name.includes('backdrop-')) {
			variables.backdrop.push({ name, value });
		} else if (name.includes('transition-')) {
			variables.transitions.push({ name, value });
		} else if (name.includes('spacing-')) {
			variables.spacing.push({ name, value });
		}
	}

	return variables;
}

// Emitted for the docs site: token values live in CSS, so docs pages declare
// only `[token, description]` and read the value from here.
function writeGeneratedTokenModule(byComponent) {
	const outDir = join(DESIGN_SYSTEM_ROOT, 'src', 'internal', 'generated');
	mkdirSync(outDir, { recursive: true });

	const body = Object.keys(byComponent)
		.sort()
		.map((component) => {
			const rows = Object.entries(byComponent[component])
				.map(([name, value]) => `\t\t'${name}': ${JSON.stringify(value)}`)
				.join(',\n');
			return `\t'${component}': {\n${rows}\n\t}`;
		})
		.join(',\n');

	const file = `// GENERATED by packages/mcp/scripts/extract-data.js -- do not edit.
// Run \`npm run build:mcp\` to regenerate from the component CSS.

export const componentTokens: Record<string, Record<string, string>> = {
${body}
};
`;

	writeFileSync(join(outDir, 'component-tokens.ts'), file);
}

// SPEC.md token tables restate values that live in the component CSS, so rewrite
// the value column from the CSS on every extract. Descriptions and row order are
// hand-written and left untouched; a row naming an unknown token is reported.
function syncSpecTokenTables(byComponent) {
	const componentsDir = join(DESIGN_SYSTEM_ROOT, 'src', 'lib', 'components');
	let rewritten = 0;
	const unknown = [];

	for (const [folder, tokens] of Object.entries(byComponent)) {
		const specPath = join(componentsDir, folder, 'SPEC.md');
		if (!existsSync(specPath)) continue;

		const before = readFileSync(specPath, 'utf-8');
		const after = before.replace(
			/^(\|\s*`(--[a-z0-9-]+)`\s*\|\s*)`[^`]*`/gm,
			(match, prefix, name) => {
				if (!(name in tokens)) {
					unknown.push(`${folder}/${name}`);
					return match;
				}
				return `${prefix}\`${tokens[name]}\``;
			}
		);

		if (after !== before) {
			writeFileSync(specPath, after);
			rewritten++;
		}
	}

	console.log(`  Synced token values in ${rewritten} SPEC.md files`);
	if (unknown.length > 0) {
		console.warn(`  WARNING: ${unknown.length} SPEC.md rows name tokens absent from CSS:`);
		for (const u of unknown) console.warn(`    ${u}`);
	}
}

function main() {
	console.log('Extracting design system data...');

	const componentTokens = extractComponentTokens();
	const tokenCount = Object.values(componentTokens).reduce((n, t) => n + Object.keys(t).length, 0);
	console.log(
		`  Found ${tokenCount} component tokens across ${Object.keys(componentTokens).length} components`
	);
	writeGeneratedTokenModule(componentTokens);
	syncSpecTokenTables(componentTokens);

	const components = extractComponents().map((c) => ({
		...c,
		tokens: componentTokens[c.name.toLowerCase()] ?? componentTokens[c.folder] ?? {}
	}));
	console.log(`  Found ${components.length} documented components`);
	writeFileSync(join(DATA_DIR, 'components.json'), JSON.stringify(components, null, 2));

	const tokens = extractTokens();
	console.log(`  Found ${Object.values(tokens.primitives).flat().length} primitive tokens`);
	console.log(`  Found ${tokens.semantic.length} semantic tokens`);
	console.log(`  Found ${Object.keys(tokens.themeVariables).length} themes`);
	writeFileSync(join(DATA_DIR, 'tokens.json'), JSON.stringify(tokens, null, 2));

	console.log('Done!');
}

main();
