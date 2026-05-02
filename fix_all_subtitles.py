import os
import re

# Targets: Templates and Platform View pages
targets = []
# src/components/templates
template_dir = 'src/components/templates'
if os.path.exists(template_dir):
    for f in os.listdir(template_dir):
        if f.endswith('.tsx'):
            targets.append(os.path.join(template_dir, f))

# src/app/[locale]/[platform]/...
app_dir = 'src/app/[locale]'
if os.path.exists(app_dir):
    for root, dirs, files in os.walk(app_dir):
        for f in files:
            if f == 'page.tsx' or f.endswith('View.tsx'):
                targets.append(os.path.join(root, f))

for filepath in targets:
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Hero Subtitle (Top)
    # Pattern: Look for <h1>...</h1> followed by <p>...</p>
    # We want to add 'hidden sm:block' if not already present
    h1_end = content.find('</h1>')
    if h1_end != -1:
        # Find the next <p tag after </h1>
        p_start = content.find('<p', h1_end)
        if p_start != -1 and p_start < h1_end + 100: # Ensure it's the subtitle right after h1
            p_tag_end = content.find('>', p_start)
            p_full_tag = content[p_start:p_tag_end+1]
            
            # Check if it contains dictionary content like .subtitle, .desc, or pageSeo
            p_content_end = content.find('</p>', p_tag_end)
            p_inner = content[p_tag_end+1:p_content_end]
            
            if ('.subtitle' in p_inner or '.desc' in p_inner or 'pageSeo' in p_inner or 'content.title' in p_inner):
                if 'hidden sm:block' not in p_full_tag:
                    if 'className="' in p_full_tag:
                        new_tag = p_full_tag.replace('className="', 'className="hidden sm:block ')
                        content = content[:p_start] + new_tag + content[p_tag_end+1:]
                    else:
                        new_tag = p_full_tag.replace('<p', '<p className="hidden sm:block"')
                        content = content[:p_start] + new_tag + content[p_tag_end+1:]
                    print(f"Fixed Top Subtitle in {filepath}")

    # 2. SEO Subtitle (Bottom)
    # Look for the Info Section heading (Usually Info icon or SEO title)
    # Or just add it at the bottom of the Hero if no info section found
    
    # Check if already has sm:hidden subtitle at bottom
    if 'sm:hidden' in content and ('.subtitle' in content or '.desc' in content):
        pass # Already fixed or handled
    else:
        # Try to find a place to insert it at the bottom
        # Look for Info section heading
        info_pattern = r'(<h2[^>]*?>.*?Info.*?</h2>|<h2[^>]*?>.*?About.*?</h2>|<h2[^>]*?>.*?{.*?\.seo\.title.*?}.*?</h2>)'
        match = re.search(info_pattern, content)
        if match:
            insert_pos = match.end()
            # Determine subtitle variable
            sub_var = None
            if '.subtitle}' in content:
                sub_match = re.search(r'\{(.*?\.subtitle)\}', content)
                if sub_match: sub_var = sub_match.group(1)
            elif '.desc}' in content:
                sub_match = re.search(r'\{(.*?\.desc)\}', content)
                if sub_match: sub_var = sub_match.group(1)
            
            if sub_var:
                insertion = f'\n            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium italic opacity-80 sm:hidden">{{{sub_var}}}</p>'
                content = content[:insert_pos] + insertion + content[insert_pos:]
                print(f"Fixed Bottom Subtitle in {filepath}")

    with open(filepath, 'w') as f:
        f.write(content)

