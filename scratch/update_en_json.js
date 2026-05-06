
const fs = require('fs');

const enJsonPath = 'src/dictionaries/en.json';
const newPagesPath = 'scratch/seo_pages.json';

const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const newPages = JSON.parse(fs.readFileSync(newPagesPath, 'utf8'));

// Ensure platforms and seo_pages exist
if (!enJson.platforms) enJson.platforms = {};
if (!enJson.platforms.seo_pages) enJson.platforms.seo_pages = {};

// Merge new pages
Object.assign(enJson.platforms.seo_pages, newPages);

// Write back
fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf8');
console.log('Successfully updated en.json with 57 new SEO pages.');
