import os
import re

files = open('youtube_subpages.txt').read().splitlines()

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f: content = f.read()
    
    # Standardize Section Padding
    content = re.sub(r'px-4 pt-\d+ pb-\d+', 'px-4 pt-10 pb-6', content)
    
    # Standardize Container Gap
    content = content.replace('max-w-7xl text-center">', 'max-w-7xl text-center flex flex-col items-center gap-3 sm:gap-6">')
    
    # Fix H1 margin
    content = content.replace('mb-2 text-3xl', 'mb-2 text-3xl') # Already mb-2, which is good
    
    with open(filepath, 'w') as f: f.write(content)
    print(f"Fixed subpage {filepath}")

