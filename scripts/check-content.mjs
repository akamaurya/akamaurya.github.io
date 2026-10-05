// Scans every built HTML file in dist/ and exits non-zero on any failure.
// Run through `npm run check`, which builds first.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const BANNED = '.private/banned.txt'; // gitignored, so this check only runs locally

const files = readdirSync(DIST, { recursive: true }).filter((f) => f.endsWith('.html'));
const banned = existsSync(BANNED)
	? readFileSync(BANNED, 'utf8').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#'))
	: [];

const failures = [];
const fail = (file, html, index, msg) => {
	const line = html.slice(0, index).split('\n').length;
	const near = html.slice(Math.max(0, index - 40), index + 40).replace(/\s+/g, ' ');
	failures.push(`${file}:${line}  ${msg}  ...${near}...`);
};

// ponytail: Indian mobiles plus any "+<country code>" run of 9+ digits. Widen if other formats ever appear.
const PHONE = /(?:\+91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b|\+\d{1,3}[\s-]?\d[\d\s-]{7,}\d/g;
const EM_DASH = /—|&mdash;|&#8212;|&#x2014;/gi;

function pageExists(pathname) {
	const p = join(DIST, decodeURIComponent(pathname));
	if (pathname.endsWith('/')) return existsSync(join(p, 'index.html'));
	if (existsSync(p) && statSync(p).isFile()) return true;
	return existsSync(join(p, 'index.html')) || existsSync(`${p}.html`);
}

for (const file of files) {
	const html = readFileSync(join(DIST, file), 'utf8');
	const pagePath = '/' + file.replace(/index\.html$/, '');
	const text = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ');

	// 1. Em dashes
	for (const m of html.matchAll(EM_DASH)) fail(file, html, m.index, 'em dash');

	// 2. Phone numbers (visible text only, so CSS and script numbers cannot trip it)
	for (const m of text.matchAll(PHONE)) failures.push(`${file}  phone-number pattern: "${m[0]}"`);

	// 3. Internal links and assets that point at nothing built
	for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
		const url = new URL(m[1].replace(/&amp;/g, '&'), `https://site.invalid${pagePath}`);
		if (url.host !== 'site.invalid' || url.pathname === pagePath) continue;
		if (!pageExists(url.pathname)) fail(file, html, m.index, `broken internal link ${m[1]}`);
	}

	// 4. Images need width, height and alt (alt="" for decorative)
	for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
		const missing = ['width', 'height', 'alt'].filter((a) => !new RegExp(`\\s${a}=`, 'i').test(m[0]));
		if (missing.length) fail(file, html, m.index, `img missing ${missing.join(', ')}`);
	}

	// 5. Private banned list. A hit is a prompt to review, not always an error.
	const lower = html.toLowerCase();
	for (const word of banned) {
		let i = lower.indexOf(word.toLowerCase());
		while (i !== -1) {
			fail(file, html, i, `banned: "${word}"`);
			i = lower.indexOf(word.toLowerCase(), i + 1);
		}
	}
}

console.log(`check-content: ${files.length} pages, banned list ${banned.length ? `on (${banned.length} patterns)` : 'off'}`);
if (failures.length) {
	console.error(failures.join('\n'));
	console.error(`check-content: ${failures.length} failure(s)`);
	process.exit(1);
}
console.log('check-content: pass');
