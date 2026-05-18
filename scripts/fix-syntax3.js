const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app/[locale]');

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
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix 1: Semicolon inside object literal
  // alternates: getSeoAlternates("...", locale); -> alternates: getSeoAlternates("...", locale),
  const brokenRegex1 = /(alternates:\s*getSeoAlternates\("[^"]+",\s*locale\));/g;
  if (content.match(brokenRegex1)) {
    content = content.replace(brokenRegex1, `$1,`);
    changed = true;
  }

  // Fix 2: Missing closing brackets for generateMetadata.
  // We need to look for alternates: getSeoAlternates(..., locale),
  // followed by an export or empty space at end of file, missing the `  };\n}`
  // Let's specifically target the files that tsc complained about:
  // src/app/[locale]/captions/layout.tsx
  // src/app/[locale]/facebook/layout.tsx
  // src/app/[locale]/hashtags/layout.tsx
  // src/app/[locale]/hashtags/page.tsx
  // src/app/[locale]/snapchat/page.tsx
  // src/app/[locale]/telegram/page.tsx
  // src/app/[locale]/tiktok/page.tsx
  // src/app/[locale]/twitter/page.tsx
  // src/app/[locale]/youtube/page.tsx

  // A safer way is to just do `npm run lint -- --fix` but we can't because it's a syntax error.
  
  // Let's replace the block if it matches the broken pattern without closing bracket.
  // The broken pattern is usually:
  //   return {
  //     title: ...,
  //     description: ...,
  //     alternates: getSeoAlternates("...", locale),
  // 
  // export default function...
  
  const brokenRegex2 = /(alternates:\s*getSeoAlternates\("[^"]+",\s*locale\),?)\s+(export (?:default|async|function))/g;
  if (content.match(brokenRegex2)) {
    content = content.replace(brokenRegex2, `$1\n  };\n}\n\n$2`);
    changed = true;
  }

  // If there's EOF immediately after alternates
  const brokenRegex3 = /(alternates:\s*getSeoAlternates\("[^"]+",\s*locale\),?)\s*$/g;
  if (content.match(brokenRegex3)) {
    content = content.replace(brokenRegex3, `$1\n  };\n}`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Fixed syntax 3 in ${file}`);
  }
});
