import os
import glob
import re

directories = ['src/app', 'src/components/templates']
tsx_files = []
for d in directories:
    tsx_files.extend(glob.glob(f'{d}/**/*.tsx', recursive=True))

count = 0
for filepath in tsx_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False
    
    # Replace <h4 ...>...</h4> with <h3 ...>...</h3> if it follows an h2 structure
    # Common patterns in this codebase:
    # 1. FAQ questions
    # 2. SEO feature titles
    
    # Match <h4 className="..."> and replace with <h3 className="...">
    # and match </h4> and replace with </h3>
    
    # Specifically targeting the ones that should be h3
    h4_pattern = r'<h4([^>]*)>(.*?)</h4>'
    
    if re.search(h4_pattern, content):
        # Using a simple replacement for all h4 to h3 in these views, 
        # as they are consistently used where h3 should be.
        new_content = re.sub(r'<h4([^>]*)>', r'<h3\1>', content)
        new_content = new_content.replace('</h4>', '</h3>')
        
        if new_content != content:
            content = new_content
            modified = True

    if modified:
        with open(filepath, 'w') as f:
            f.write(content)
        count += 1

print(f"Fixed heading hierarchy in {count} files.")
