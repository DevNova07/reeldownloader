import os
import re

targets = []
template_dir = 'src/components/templates'
if os.path.exists(template_dir):
    for f in os.listdir(template_dir):
        if f.endswith('.tsx'): targets.append(os.path.join(template_dir, f))

app_dir = 'src/app/[locale]'
if os.path.exists(app_dir):
    for root, dirs, files in os.walk(app_dir):
        for f in files:
            if f.endswith('.tsx'): targets.append(os.path.join(root, f))

for filepath in targets:
    with open(filepath, 'r') as f: content = f.read()
    orig_content = content

    # 1. Hide Top Subtitles
    # Look for any <p> after <h1> that contains dynamic content
    h1_matches = list(re.finditer(r'<(h1|motion\.h1).*?>(.*?)</\1>', content, re.DOTALL))
    for h1 in h1_matches:
        end_h1 = h1.end()
        # Find next <p> or <motion.p>
        p_match = re.search(r'<(p|motion\.p)(.*?)>(.*?)</\1>', content[end_h1:end_h1+500], re.DOTALL)
        if p_match:
            p_tag_full = p_match.group(0)
            p_attrs = p_match.group(2)
            p_inner = p_match.group(3)
            
            # Check if it looks like a subtitle (dynamic content)
            if '{' in p_inner and ('Dict' in p_inner or 'content' in p_inner or 'dict' in p_inner or 'page' in p_inner):
                if 'hidden sm:block' not in p_attrs:
                    if 'className="' in p_attrs:
                        new_attrs = p_attrs.replace('className="', 'className="hidden sm:block ')
                        content = content.replace(p_match.group(2), new_attrs)
                    else:
                        new_attrs = p_attrs + ' className="hidden sm:block"'
                        content = content.replace(p_match.group(2), new_attrs)
                    print(f"Hiding top subtitle in {filepath}")

    # 2. Add Mobile Subtitles at the bottom of Info Section
    # Look for Info Section or SEO Section
    info_matches = list(re.finditer(r'<(h2|motion\.h2).*?>(.*?(Info|About|Guide|FAQ|Description).*?)</\1>', content, re.DOTALL | re.IGNORECASE))
    if info_matches:
        last_info = info_matches[0] # Usually the first main info section
        insert_pos = last_info.end()
        
        # Determine subtitle variable from top (if we hidden one)
        sub_var_match = re.search(r'\{(.*?\.subtitle|.*?\.desc|pageSeo\.desc)\}', content)
        if sub_var_match:
            sub_var = sub_var_match.group(1)
            if f'sm:hidden' not in content:
                # Add it as a beautiful italic block
                insertion = f'\n            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium italic opacity-80 sm:hidden">{{{sub_var}}}</p>'
                content = content[:insert_pos] + insertion + content[insert_pos:]
                print(f"Added mobile subtitle to bottom of {filepath}")

    if content != orig_content:
        with open(filepath, 'w') as f: f.write(content)

