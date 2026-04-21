const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/*.tsx');
let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('generateMetadata') || content.includes('export const metadata')) {
    if (!content.includes('metadataBase')) {
      // Find return { ... } in generateMetadata or export const metadata = { ... }
      if (content.includes('return {')) {
        content = content.replace('return {', 'return {\n    metadataBase: new URL("https://savclip.net"),');
      } else if (content.includes('export const metadata: Metadata = {')) {
        content = content.replace('export const metadata: Metadata = {', 'export const metadata: Metadata = {\n  metadataBase: new URL("https://savclip.net"),');
      } else if (content.includes('export const metadata = {')) {
        content = content.replace('export const metadata = {', 'export const metadata = {\n  metadataBase: new URL("https://savclip.net"),');
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed', file);
      modifiedCount++;
    }
  }
}
console.log('Fixed', modifiedCount, 'files');
