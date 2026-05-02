import os
import glob
import re

directory = '/Users/ramzan/Documents/projects/websites/instasnap/src/app'
tsx_files = glob.glob(f'{directory}/**/*.tsx', recursive=True)

count = 0
for filepath in tsx_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False
    
    # 1. Update H1 style
    h1_pattern = r'(<h1 className="mb-2 )text-4xl( font-black tracking-tight text-(?:white|black) sm:text-7xl drop-shadow-2xl uppercase italic)">'
    if re.search(h1_pattern, content):
        content = re.sub(h1_pattern, r'\1text-3xl min-[400px]:text-4xl\2 text-balance">', content)
        modified = True

    # 2. Extract and Remove Subtitle from Hero
    sub_pattern = r'\s*<p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-(?:white|black)/(?:80|90) sm:text-xl">\s*(\{.*?\})\s*</p>'
    match = re.search(sub_pattern, content, re.DOTALL)
    
    if match:
        sub_content = match.group(1)
        content = content.replace(match.group(0), "")
        
        # 3. Insert into SEO Section (ONLY ONCE)
        # We look for the FIRST h2 with Info icon or the first h2 in the SEO section
        seo_pattern = r'(<h2 className="flex items-center gap-3 text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-widest">.*?</h2>)'
        # Use re.sub with count=1 to only replace the first occurrence
        if re.search(seo_pattern, content, re.DOTALL):
            replacement = r'\1\n            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium italic opacity-80">' + sub_content + r'</p>'
            content = re.sub(seo_pattern, replacement, content, count=1, flags=re.DOTALL)
            modified = True

    if modified:
        with open(filepath, 'w') as f:
            f.write(content)
        count += 1

print(f"Processed {count} files.")
