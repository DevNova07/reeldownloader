const sharp = require('sharp');
const fs = require('fs');

const svgBuffer = Buffer.from(`
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <circle cx="256" cy="256" r="240" fill="url(#g)"/>
  <path d="M256 120 L256 320" stroke="#ffffff" stroke-width="48" stroke-linecap="round" />
  <path d="M166 230 L256 340 L346 230" stroke="#ffffff" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M146 400 L366 400" stroke="#ffffff" stroke-width="48" stroke-linecap="round" />
</svg>`);

async function generate() {
  try {
    const options = { density: 600 }; 
    
    await sharp(svgBuffer, options).resize(512, 512).png({ force: true }).toFile('public/icon.png');
    await sharp(svgBuffer, options).resize(512, 512).png().toFile('public/icon-512x512.png');
    await sharp(svgBuffer, options).resize(192, 192).png().toFile('public/icon-192x192.png');
    await sharp(svgBuffer, options).resize(180, 180).png().toFile('public/apple-touch-icon.png');
    
    await sharp(svgBuffer, options).resize(48, 48).png().toFile('public/favicon-48x48.png');
    await sharp(svgBuffer, options).resize(32, 32).png().toFile('public/favicon-32x32.png');
    await sharp(svgBuffer, options).resize(16, 16).png().toFile('public/favicon-16x16.png');
    await sharp(svgBuffer, options).resize(48, 48).png().toFile('public/favicon.ico');
    
    fs.writeFileSync('public/icon.svg', svgBuffer.toString());
    console.log("Cleaned all icons perfectly!");
  } catch(e) {
    console.error(e);
  }
}

generate();
