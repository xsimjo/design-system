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

	const themes = ['light', 'dark', 'dev'];
	const semantic = {};

	for (const theme of themes) {
		const themePath = join(stylesDir, 'themes', `${theme}.css`);
		if (existsSync(themePath)) {
			const themeContent = readFileSync(themePath, 'utf-8');
			semantic[theme] = parseSemanticTokens(themeContent);
		}
	}

	return { primitives, semantic };
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
	const tokens = [];
	const matches = content.matchAll(/--([^:]+):\s*([^;]+);/g);

	for (const match of matches) {
		tokens.push(`--${match[1].trim()}`);
	}

	return tokens;
}

function main() {
	console.log('Extracting design system data...');

	const components = extractComponents();
	console.log(`  Found ${components.length} documented components`);
	writeFileSync(join(DATA_DIR, 'components.json'), JSON.stringify(components, null, 2));

	const tokens = extractTokens();
	console.log(`  Found ${Object.values(tokens.primitives).flat().length} primitive tokens`);
	console.log(`  Found ${Object.keys(tokens.semantic).length} themes`);
	writeFileSync(join(DATA_DIR, 'tokens.json'), JSON.stringify(tokens, null, 2));

	console.log('Done!');
}

main();
