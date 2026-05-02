import os
import re

directories = ['src/app/[locale]', 'src/components/templates']
files = []
for d in directories:
    for root, dirs, filenames in os.walk(d):
        for f in filenames:
            if f.endswith('.tsx'):
                files.append(os.path.join(root, f))

for filepath in files:
    with open(filepath, 'r') as f: content = f.read()
    
    new_content = content
    
    # Hero Section Description Fix (Hide on Mobile)
    # This targets the <p> immediately after an <h1>
    pattern = r'(<h1[^>]*>.*?</h1>\s*)<p className="([^"]*)"'
    def hero_replace(match):
        h1_part = match.group(1)
        classes = match.group(2)
        # Remove any existing hidden/sm:block/sm:hidden to start fresh
        cleaned_classes = classes.replace('hidden', '').replace('sm:block', '').replace('sm:hidden', '').strip()
        return f'{h1_part}<p className="{cleaned_classes} hidden sm:block"'
    
    new_content = re.sub(pattern, hero_replace, new_content, flags=re.DOTALL)
    
    # Secondary Fix: Some files use {cn(...)} or different quote styles
    # We want to make sure <p> tags under <h1> are hidden on mobile
    
    if new_content != content:
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Cleaned up Hero description in {filepath}")

