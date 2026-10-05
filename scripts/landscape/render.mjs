// Pre-renders the hero ink landscape once. Never runs in CI or in the visitor's browser.
// Generator: shan-shui-inf by Lingdong Huang, MIT (see THIRD_PARTY.md). Fetched at a pinned commit, not vendored.
// Needs Google Chrome and cwebp (Homebrew `webp`) on this machine.
// Usage: node scripts/landscape/render.mjs [seed] [out.webp]
// ponytail: local tools, not npm deps. Re-run by hand if the art changes; move to Playwright only if it needs CI.
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const COMMIT = '9f754d2b2e73495db7883d4d4055a7b0903b0454';
const SRC = `https://raw.githubusercontent.com/LingDong-/shan-shui-inf/${COMMIT}/index.html`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const seed = process.argv[2] ?? '1018';
const out = process.argv[3] ?? 'public/img/landscape.webp';

const W = 4000; // generator units
const H = 800;
const SCALE = 0.8; // output px per unit: 3200 x 640
const FADE = 0.18; // share of width faded into mist at each end, so the loop seam disappears

const upstream = await (await fetch(SRC)).text();
const generator = upstream.slice(0, upstream.indexOf('<script id="downloader">'));

const page = `<!doctype html><meta charset="utf-8"><body>${generator}
<script>
  // Himalayan read: drop every building, tower and boat. Mountains, trees, rocks and water stay.
  for (const k of ['arch01', 'arch02', 'arch03', 'arch04', 'boat01', 'transmissionTower01']) Arch[k] = () => '';
  MEM.cursx = 0;
  chunkloader(0, ${W});
  chunkrender(0, ${W});
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>" + MEM.canv + '</svg>';
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = ${W * SCALE}; c.height = ${H * SCALE};
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0, c.width, c.height);
    // Mist: fade both ends and the top edge to transparent.
    g.globalCompositeOperation = 'destination-in';
    const x = g.createLinearGradient(0, 0, c.width, 0);
    x.addColorStop(0, 'rgba(0,0,0,0)'); x.addColorStop(${FADE}, '#000');
    x.addColorStop(${1 - FADE}, '#000'); x.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = x; g.fillRect(0, 0, c.width, c.height);
    const y = g.createLinearGradient(0, 0, 0, c.height);
    y.addColorStop(0, 'rgba(0,0,0,0)'); y.addColorStop(0.3, '#000');
    g.fillStyle = y; g.fillRect(0, 0, c.width, c.height);
    document.body.innerHTML = '<pre id=out>' + c.toDataURL('image/png') + '</pre>';
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
</script>`;

const dir = mkdtempSync(join(tmpdir(), 'landscape-'));
writeFileSync(join(dir, 'page.html'), page);
const dom = execFileSync(
	CHROME,
	['--headless=new', '--disable-gpu', '--virtual-time-budget=60000', '--dump-dom', `file://${dir}/page.html?seed=${seed}`],
	{ maxBuffer: 1 << 28 },
).toString();
const b64 = dom.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/)?.[1];
if (!b64) throw new Error('Chrome produced no image');
writeFileSync(join(dir, 'strip.png'), Buffer.from(b64, 'base64'));
execFileSync('cwebp', ['-quiet', '-q', '72', '-alpha_q', '80', '-m', '6', join(dir, 'strip.png'), '-o', out]);
console.log(`landscape: seed ${seed} -> ${out} (${Math.round(readFileSync(out).length / 1024)} KB)`);
