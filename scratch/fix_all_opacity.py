import os
import re

components_dir = "/Users/ramzan/Documents/projects/websites/instasnap/src/components"

def fix_opacity_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We want to replace `initial={{ opacity: 0... }}` with `initial={false}`
    # But only if it's not inside AnimatePresence? Actually, setting initial={false} 
    # even inside AnimatePresence just skips the ENTRANCE animation on mount, 
    # which is perfectly fine to ensure visibility.
    # The regex looks for `initial={{ opacity: 0[anything but }]*}}` 
    # and replaces it with `initial={false}`
    
    # Regex to match: initial={{ opacity: 0, ... }}
    # We need to handle nested braces carefully, but usually it's just one level.
    # Pattern: initial=\{\{\s*opacity:\s*0[^}]*\}\}
    
    pattern = re.compile(r'initial=\{\{\s*opacity:\s*0[^}]*\}\}')
    
    new_content, count = pattern.subn('initial={false}', content)
    
    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Replaced {count} instances in {os.path.basename(filepath)}")

for root, _, files in os.walk(components_dir):
    for file in files:
        if file.endswith(('.tsx', '.jsx')):
            fix_opacity_in_file(os.path.join(root, file))
