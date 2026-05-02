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
    
    # Target <p> tags following <h1>
    pattern = r'(<h1[^>]*>.*?</h1>\s*)<p className="([^"]*)"'
    
    # We only apply if it doesn't already have 'hidden'
    def replace_func(match):
        h1_part = match.group(1)
        classes = match.group(2)
        if 'hidden' in classes:
            return match.group(0)
        return f'{h1_part}<p className="{classes} hidden sm:block"'

    new_content = re.sub(pattern, replace_func, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Fixed p under h1 in {filepath}")

