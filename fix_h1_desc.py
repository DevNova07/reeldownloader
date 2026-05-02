import os
import re

files = open('files_with_h1.txt').read().splitlines()

for filepath in files:
    if not os.path.exists(filepath): continue
    if 'node_modules' in filepath: continue
    
    with open(filepath, 'r') as f: content = f.read()
    
    # Pattern 1: <p> immediately after </h1>
    # We look for a <p> that doesn't have 'hidden' or 'sm:hidden' in its className
    # and is within the Hero section (near <h1>)
    
    new_content = content
    # Use regex to find <p> after <h1> and inject hidden sm:block
    # This is tricky with multiline. We'll try a simpler replacement for common patterns.
    
    # Common pattern in this project:
    # <h1 ...> ... </h1>
    # <p className="...">{...}</p>
    
    # Specifically targeting the subtitle/description pattern
    patterns = [
        (r'(<h1[^>]*>.*?</h1>\s*)<p className="([^"]*)"', r'\1<p className="\2 hidden sm:block"'),
        (r'(<h1[^>]*>.*?</h1>\s*)<p className={([^}]*)}', r'\1<p className={cn(\2, "hidden sm:block")}')
    ]
    
    for pattern, replacement in patterns:
        new_content = re.sub(pattern, replacement, new_content, flags=re.DOTALL)

    # Clean up if we accidentally added it twice
    new_content = new_content.replace('hidden sm:block hidden sm:block', 'hidden sm:block')
    
    if new_content != content:
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Hidden mobile description in {filepath}")

