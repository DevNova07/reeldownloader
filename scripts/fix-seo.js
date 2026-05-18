const fs = require('fs');
const path = require('path');
const glob = require('glob'); // package.json has glob

const appDir = path.join(__dirname, '../src/app/[locale]');

// Recursively find all files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = findFiles(appDir);

allFiles.forEach(file => {
  if (file.includes('layout.tsx') && file === path.join(appDir, 'layout.tsx')) {
    // Already manually fixed root layout
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('generateMetadata')) {
    return;
  }

  // Calculate path string
  let relPath = file.replace(appDir, '').replace(/\\/g, '/');
  // e.g. /instagram/reels/page.tsx
  relPath = relPath.replace('/page.tsx', '').replace('/layout.tsx', '');
  if (relPath.startsWith('/')) relPath = relPath.substring(1);
  // Remove dynamic parts like [slug] if any, wait, those need special handling, but let's just use the fixed path or leave [slug] as is?
  // If it's a dynamic route, we need the slug from params.
  
  let isDynamic = relPath.includes('[');

  // Let's modify the file
  let changed = false;

  // Add import if not present
  if (!content.includes('getSeoAlternates') && !content.includes('import { getSeoAlternates }')) {
    content = 'import { getSeoAlternates } from "@/lib/seo";\n' + content;
    changed = true;
  }

  // Regex to find alternates: { ... } or alternates: { canonical: ... }
  // Since parsing JS with Regex is hard, let's just do a simple replacement if alternates exists
  const alternatesRegex = /alternates:\s*\{[^}]+\}/g;
  
  if (content.match(alternatesRegex)) {
    if (isDynamic) {
       // e.g. path = `blog/${slug}`
       let dynamicPath = relPath.replace(/\[([^\]]+)\]/g, '${$1}');
       // Wait, params might be awaited or not. Let's just do `${params.slug}`. This is too complex for regex.
    } else {
       content = content.replace(alternatesRegex, `alternates: getSeoAlternates("${relPath}", locale)`);
       changed = true;
    }
  } else {
    // Inject alternates
    // We can look for `title:` or `description:` and inject before it.
    const titleRegex = /(title:\s*[^,]+,)/;
    if (content.match(titleRegex) && !isDynamic) {
       content = content.replace(titleRegex, `$1\n    alternates: getSeoAlternates("${relPath}", locale),`);
       changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${relPath}`);
  }
});

console.log("Done");
