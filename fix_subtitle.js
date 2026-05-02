const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/templates/*Page.tsx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Extract the paragraph
  const pMatch = content.match(/<p className="mx-auto mb-4 max-w-2xl[^>]*>\s*\{content\?\.subtitle \|\| pageSeo\?\.desc \|\| "[^"]*"\s*\}\s*<\/p>/);
  
  if (pMatch) {
    const pTag = pMatch[0];
    
    // Remove it from under h1
    content = content.replace(pTag, '');
    
    // Add it below SearchBar
    // SearchBar block usually ends with /> and then {error &&
    // Let's find the closing tag of SearchBar
    const searchBarEndMatch = content.match(/(<SearchBar[^>]*\/>)/);
    
    if (searchBarEndMatch) {
      const searchBar = searchBarEndMatch[1];
      const newPTag = pTag.replace('text-lg font-medium text-white/90 sm:text-xl', 'mt-8 mb-2 text-sm font-bold text-white/60 uppercase tracking-widest');
      content = content.replace(searchBar, searchBar + '\n\n            ' + newPTag);
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed', file);
    }
  }
}
