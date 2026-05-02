import os
import re

with open('files_with_h1.txt', 'r') as f:
    files = [line.strip() for line in f.readlines()]

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f: content = f.read()
    
    # Target: The <p> tag immediately following the <h1> block
    # We look for something like <h1>...</h1> followed by <p className="...">...{...}</p>
    
    pattern = r'(<h1.*?>.*?</h1>\s*)(<p\s+className=")(?!.*?hidden sm:block)(.*?>.*?\{.*?\}.*?<\/p>)'
    
    new_content = re.sub(pattern, r'\1\2hidden sm:block \3', content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Fixed {filepath}")

