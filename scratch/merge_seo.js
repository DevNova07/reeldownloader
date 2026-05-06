
const fs = require('fs');
const path = require('path');

const enPath = path.join(process.cwd(), 'src/dictionaries/en.json');
const instaPath = path.join(process.cwd(), 'scratch/instagram_seo.json');
const fbPath = path.join(process.cwd(), 'scratch/facebook_seo.json');

const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));

if (!enDict.platforms) enDict.platforms = {};
if (!enDict.platforms.seo_pages) enDict.platforms.seo_pages = {};

// Merge Instagram
if (fs.existsSync(instaPath)) {
  const instaSeo = JSON.parse(fs.readFileSync(instaPath, 'utf8'));
  Object.assign(enDict.platforms.seo_pages, instaSeo);
  console.log('Merged Instagram SEO pages.');
}

// Merge Facebook
if (fs.existsSync(fbPath)) {
  const fbSeo = JSON.parse(fs.readFileSync(fbPath, 'utf8'));
  Object.assign(enDict.platforms.seo_pages, fbSeo);
  console.log('Merged Facebook SEO pages.');
}

fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2));
console.log('Successfully updated en.json');
