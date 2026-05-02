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
    
    # Target <p> tags that are likely Hero descriptions
    # These usually follow an <h1> or are inside the Hero motion.div
    
    # Regex to find <p> within the Hero area (near <h1> or in a motion.div with y: 10/15)
    # We'll just target ALL <p> tags that look like subtitles
    
    new_content = content
    
    # 1. Any <p> that uses subtitle, seo.desc, or dict.subtitle
    patterns = [
        (r'<p className="([^"]*)">({(.*?)(subtitle|seo\?.desc|seo.desc|desc)(.*?)})</p>', r'<p className="\1 hidden sm:block">\2</p>'),
        (r'<p className={cn\(([^,]*), "([^"]*)"\)}>({(.*?)(subtitle|seo\?.desc|seo.desc|desc)(.*?)})</p>', r'<p className={cn(\1, "\2 hidden sm:block")}>\3</p>')
    ]
    
    for pattern, replacement in patterns:
        new_content = re.sub(pattern, replacement, new_content, flags=re.DOTALL)
        
    # 2. Specific fix for the pattern: <p className="...">{...}</p> where it follows an <h1>
    h1_p_pattern = r'(<h1[^>]*>.*?</h1>\s*)<p className="([^"]*)"'
    new_content = re.sub(h1_p_pattern, r'\1<p className="\2 hidden sm:block"', new_content, flags=re.DOTALL)

    # Clean up double classes
    new_content = new_content.replace('hidden sm:block hidden sm:block', 'hidden sm:block')
    
    if new_content != content:
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Applied mobile hide to {filepath}")

