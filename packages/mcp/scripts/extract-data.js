import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
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

		components.push({ name, description, spec });
	}

	return components;
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

function main() {
	console.log('Extracting design system data...');

	const components = extractComponents();
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
