const fs = require('fs');

const filesToFix = [
  'src/app/[locale]/captions/layout.tsx',
  'src/app/[locale]/facebook/layout.tsx',
  'src/app/[locale]/hashtags/layout.tsx',
  'src/app/[locale]/hashtags/page.tsx',
  'src/app/[locale]/snapchat/page.tsx',
  'src/app/[locale]/telegram/page.tsx',
  'src/app/[locale]/tiktok/page.tsx',
  'src/app/[locale]/twitter/page.tsx',
  'src/app/[locale]/youtube/page.tsx'
];

filesToFix.forEach(relPath => {
  const filePath = require('path').join(__dirname, '../', relPath);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // The issue:
  // alternates: getSeoAlternates("...", locale),
  // }
  
  const brokenRegex = /(alternates:\s*getSeoAlternates\("[^"]+",\s*locale\),?)\n\}/g;
  if (content.match(brokenRegex)) {
    content = content.replace(brokenRegex, `$1\n  };\n}`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed missing }; in ${relPath}`);
  }
});
