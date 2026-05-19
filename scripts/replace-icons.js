const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/new-logo.svg');
const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../src/app');

async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);

    // public/icon.png (512x512)
    await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon.png'));
    
    // public/icon-512x512.png
    await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512x512.png'));
    
    // public/icon-192x192.png
    await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192x192.png'));
    
    // public/apple-touch-icon.png (180x180)
    await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    // public/favicon.ico (we'll just use a 64x64 png as it's often acceptable, or just replace app/favicon.ico)
    
    // src/app/icon.png
    await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(appDir, 'icon.png'));
    
    // src/app/apple-icon.png
    await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));
    
    // src/app/opengraph-image.png (1200x630) - we'll create a centered version
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 11, g: 16, b: 33, alpha: 1 } // #0b1021
      }
    }).composite([
      { input: await sharp(svgBuffer).resize(400, 400).toBuffer(), gravity: 'center' }
    ]).png().toFile(path.join(appDir, 'opengraph-image.png'));

    // src/app/favicon.ico -> copy a small png over it (Next.js supports png named as ico sometimes, or we can just leave favicon to Next.js if we provide icon.png)
    // Actually, let's just make a 32x32 png and save as favicon.ico
    await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(appDir, 'favicon.ico'));

    console.log("All icons generated successfully!");
  } catch (err) {
    console.error("Error generating icons:", err);
  }
}

generateIcons();
