import os
import re

components_dir = "/Users/ramzan/Documents/projects/websites/instasnap/src/components"

def fix_opacity_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Improved regex to find any initial={{ ... opacity: 0 ... }}
    # This matches: initial={{ anything opacity: 0 anything }}
    # But specifically targeting framer-motion props
    pattern = re.compile(r'initial=\{\{[^}]*opacity:\s*0[^}]*\}\}')
    
    new_content, count = pattern.subn('initial={false}', content)
    
    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Replaced {count} instances in {os.path.basename(filepath)}")

for root, _, files in os.walk(components_dir):
    for file in files:
        if file.endswith(('.tsx', '.jsx')):
            fix_opacity_in_file(os.path.join(root, file))
