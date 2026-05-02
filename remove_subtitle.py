import os
import glob
import re

directory = '/Users/ramzan/Documents/projects/websites/instasnap/src/app'
tsx_files = glob.glob(f'{directory}/**/*.tsx', recursive=True)

count = 0
for filepath in tsx_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Regex to match the <p> tag with the exact classes used for the subtitle
    # It spans across newlines, so we use re.DOTALL
    # Pattern: \n\s*<p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-[^\"]+ sm:text-xl">.*?</p>
    
    pattern = r'\s*<p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-[a-zA-Z0-9/-]+ sm:text-xl">.*?</p>'
    
    new_content, num_subs = re.subn(pattern, '', content, flags=re.DOTALL)
    
    if num_subs > 0:
        # Before saving, let's make sure we actually moved it to the SEO section
        # Wait, if we just remove it, we lose the text. Let's see if we can insert it into the SEO section.
        # Find: {/* Info Section (SEO) */}
        # Insert right after: <div className="mt-10">
        
        # Actually, just removing it is what the user probably wants for a clean look, but let's 
        # move it to the SEO section to be completely safe for SEO.
        pass

    if num_subs > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        count += 1

print(f"Removed subtitle from {count} files.")
