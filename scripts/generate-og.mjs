import sharp from '/Users/franciscocucullu/Desktop/franciscocucullu.com/node_modules/sharp/lib/index.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const W = 1200;
const H = 630;

// Right-hand portrait panel (full-bleed right edge), slight gray panel behind
const panelX = 770;
const panelW = W - panelX; // 430
const portraitW = panelW;
const portraitH = H;

const portrait = await sharp(join(root, 'public/images/about-portrait.jpg'))
	.resize(portraitW, portraitH, { fit: 'cover', position: 'top' })
	.toBuffer();

const bg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="${panelX}" y="0" width="${panelW}" height="${H}" fill="#f5f5f5"/>

  <!-- top accent rule -->
  <rect x="80" y="150" width="56" height="4" fill="#000000"/>

  <text x="80" y="270" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="76" font-weight="600" letter-spacing="2" fill="#000000">MICHALINA</text>
  <text x="80" y="348" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="76" font-weight="600" letter-spacing="2" fill="#000000">SABLIK</text>

  <text x="82" y="412" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="30" font-weight="400" letter-spacing="1" fill="#2D3748">Art historian &amp; curator</text>
  <text x="82" y="452" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="24" font-weight="400" letter-spacing="1" fill="#718096">Exhibitions &amp; public programs</text>

  <text x="82" y="556" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="22" font-weight="400" letter-spacing="2" fill="#A0AEC0">michalinasablik.com</text>

  <!-- thin divider between text and portrait -->
  <rect x="${panelX}" y="0" width="1" height="${H}" fill="#e2e2e2"/>
</svg>`;

await sharp(Buffer.from(bg))
	.composite([{ input: portrait, left: panelX, top: 0 }])
	.jpeg({ quality: 90 })
	.toFile(join(root, 'public/images/og-image.jpg'));

console.log('Wrote public/images/og-image.jpg');
