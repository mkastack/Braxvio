const sharp = require('sharp');
const fs = require('fs');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Prepare resized high-res mark
  const markBuffer = await sharp('public/braxvio-mark.png')
    .resize(130, 165, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // SVG overlay with typography and design elements
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow1" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stop-color="#11AFC1" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#001326" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="20%" cy="80%" r="50%">
          <stop offset="0%" stop-color="#003E72" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#001326" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="60%" stop-color="#E0F7FA" />
          <stop offset="100%" stop-color="#42D6C5" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="#001224" />
      <rect width="100%" height="100%" fill="url(#glow1)" />
      <rect width="100%" height="100%" fill="url(#glow2)" />

      <!-- Subtle Grid Lines -->
      <g stroke="rgba(17, 175, 193, 0.08)" stroke-width="1">
        <line x1="80" y1="0" x2="80" y2="630" />
        <line x1="1120" y1="0" x2="1120" y2="630" />
        <line x1="0" y1="80" x2="1200" y2="80" />
        <line x1="0" y1="550" x2="1200" y2="550" />
      </g>

      <!-- Card Frame Outline -->
      <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="rgba(221, 232, 236, 0.12)" stroke-width="1.5" />

      <!-- Top Badge -->
      <g transform="translate(80, 85)">
        <rect x="0" y="0" width="340" height="34" rx="17" fill="rgba(17, 175, 193, 0.12)" stroke="rgba(17, 175, 193, 0.3)" stroke-width="1" />
        <circle cx="18" cy="17" r="4" fill="#42D6C5" />
        <text x="32" y="22" font-family="monospace" font-size="11" font-weight="bold" fill="#42D6C5" letter-spacing="2">PARENT TECHNOLOGY COMPANY</text>
      </g>

      <!-- Main Headline -->
      <text x="240" y="215" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="900" fill="#FFFFFF" letter-spacing="-1">Braxvio</text>
      <text x="240" y="255" font-family="monospace" font-size="14" font-weight="bold" fill="#42D6C5" letter-spacing="4">BUILD. INNOVATE. ELEVATE.</text>

      <!-- Subtitle & Value Proposition -->
      <text x="80" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="url(#titleGrad)" letter-spacing="-0.5">Building Technology for Life.</text>
      <text x="80" y="385" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#94A3B8">Sovereign digital products &amp; infrastructure across Africa and global markets.</text>

      <!-- Subsidiaries Strip -->
      <g transform="translate(80, 445)">
        <!-- Kampus -->
        <rect x="0" y="0" width="240" height="52" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
        <text x="16" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">01 Kampus</text>
        <text x="16" y="42" font-family="monospace" font-size="9" fill="#11AFC1" letter-spacing="1">EDUCATION ECOSYSTEM</text>

        <!-- Pharmora -->
        <rect x="260" y="0" width="240" height="52" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
        <text x="276" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">02 Pharmora</text>
        <text x="276" y="42" font-family="monospace" font-size="9" fill="#008FC4" letter-spacing="1">HEALTHCARE &amp; RX MESH</text>

        <!-- Ecolift -->
        <rect x="520" y="0" width="240" height="52" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
        <text x="536" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">03 Ecolift</text>
        <text x="536" y="42" font-family="monospace" font-size="9" fill="#42D6C5" letter-spacing="1">CIRCULAR LOGISTICS</text>

        <!-- DevPay Africa -->
        <rect x="780" y="0" width="260" height="52" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
        <text x="796" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">04 DevPay Africa</text>
        <text x="796" y="42" font-family="monospace" font-size="9" fill="#006EAA" letter-spacing="1">CROSS-BORDER ESCROW</text>
      </g>

      <!-- Bottom Domain Meta -->
      <text x="80" y="535" font-family="monospace" font-size="12" font-weight="bold" fill="#64748B" letter-spacing="1">BRAXVIO.COM // ACCRA, GHANA</text>
      <text x="1120" y="535" text-anchor="end" font-family="monospace" font-size="12" font-weight="bold" fill="#11AFC1" letter-spacing="1">SOVEREIGN ECOSYSTEM ARCHITECTURE</text>
    </svg>
  `);

  // Composite the authentic logo mark on top of the background & typography
  await sharp(svgOverlay)
    .composite([
      {
        input: markBuffer,
        top: 140,
        left: 80
      }
    ])
    .png()
    .toFile('public/og-braxvio.png');

  console.log('Created public/og-braxvio.png (1200x630)');

  // Also create twitter-image.png and app/ counterparts
  fs.copyFileSync('public/og-braxvio.png', 'public/twitter-image.png');
  fs.copyFileSync('public/og-braxvio.png', 'app/opengraph-image.png');
  fs.copyFileSync('public/og-braxvio.png', 'app/twitter-image.png');
  console.log('Synchronized to public/twitter-image.png, app/opengraph-image.png, app/twitter-image.png');
}

createOgImage().catch(console.error);
