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

  // The broken pattern is:
  // alternates: getSeoAlternates("...", locale)
  // 
  // export default
  
  const brokenRegex = /(alternates:\s*getSeoAlternates\("[^"]+",\s*locale\))\s+(export default)/g;
  if (content.match(brokenRegex)) {
    content = content.replace(brokenRegex, `$1,\n  };\n}\n\n$2`);
    changed = true;
  }
  
  const brokenRegex2 = /(alternates:\s*getSeoAlternates\("[^"]+",\s*locale\))\s+(export function)/g;
  if (content.match(brokenRegex2)) {
    content = content.replace(brokenRegex2, `$1,\n  };\n}\n\n$2`);
    changed = true;
  }

  // Sometimes there's no export default directly after but something else.
  // We need to look for alternates: getSeoAlternates("something", locale)
  // followed immediately by something that is missing the closing brackets.
  // Actually, let's just use typescript parser or be very careful.
  // The first regex should catch 99% of cases since `generateMetadata` is usually followed by `export default` or `export function`.

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Fixed syntax 2 in ${file}`);
  }
});
