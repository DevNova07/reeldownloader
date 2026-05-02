import os
import re

files_to_update = [
    'src/app/[locale]/facebook/FacebookView.tsx',
    'src/app/[locale]/tiktok/TikTokView.tsx',
    'src/app/[locale]/youtube/YoutubeView.tsx',
    'src/app/[locale]/snapchat/SnapchatView.tsx',
    'src/app/[locale]/telegram/TelegramView.tsx',
    'src/app/[locale]/twitter/TwitterView.tsx',
    'src/app/[locale]/HomeView.tsx'
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find the motion.div containing h1
    motion_h1_pattern = r'(<motion\.div[^>]*?>\s*<h1[^>]*?>.*?</h1>.*?</motion\.div>)'
    
    match = re.search(motion_h1_pattern, content, flags=re.DOTALL)
    if match:
        h1_block = match.group(1)
        # Remove it from its current position
        content_no_h1 = content.replace(h1_block, '')
        
        # Find the start of the relative container
        container_pattern = r'(<div className="relative z-10 mx-auto max-w-7xl text-center">)'
        
        # Insert h1 block right after the container start
        new_content = re.sub(container_pattern, r'\1\n          ' + h1_block, content_no_h1)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Moved H1 to top in {filepath}")
        else:
            print(f"No change needed or could not insert in {filepath}")
    else:
        print(f"Could not find H1 block in {filepath}")

