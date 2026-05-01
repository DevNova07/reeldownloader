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

  // Regex to fix the broken line: 
  // alternates: getSeoAlternates("instagram", locale)/instagram`,
  //     },
  
  // It replaced alternates: { canonical: ... } with alternates: getSeoAlternates(...) but left the remaining part of the object.
  // Wait, let's just fix the specific syntax.
  // Look for: alternates: getSeoAlternates([^)]+)[^,]+,
  // Let's just fix it properly by searching for:
  // alternates: getSeoAlternates(.*?),[\s\S]*?},
  
  const brokenRegex = /alternates:\s*getSeoAlternates\("([^"]+)",\s*locale\)[^,]*,\s*\}/g;
  if (content.match(brokenRegex)) {
    content = content.replace(brokenRegex, `alternates: getSeoAlternates("$1", locale)`);
    changed = true;
  }
  
  const brokenRegex2 = /alternates:\s*getSeoAlternates\("([^"]+)",\s*locale\)[^\n]*\n\s*\}/g;
  if (content.match(brokenRegex2)) {
      content = content.replace(brokenRegex2, `alternates: getSeoAlternates("$1", locale)`);
      changed = true;
  }

  // specifically fixing `alternates: getSeoAlternates("instagram", locale)/instagram`,\n    },`
  // the exact string left was likely what was matched in the regex.
  // Let's do a more robust fix:
  const brokenRegex3 = /alternates:\s*getSeoAlternates\("([^"]+)",\s*locale\)[^]*?\}/g;
  if (content.match(brokenRegex3)) {
      content = content.replace(brokenRegex3, `alternates: getSeoAlternates("$1", locale)`);
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Fixed syntax in ${file}`);
  }
});
