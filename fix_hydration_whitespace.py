import os
import re

files_to_update = [
    'src/app/[locale]/HomeView.tsx',
    'src/app/[locale]/tiktok/TikTokView.tsx',
    'src/app/[locale]/youtube/YoutubeView.tsx',
    'src/app/[locale]/snapchat/SnapchatView.tsx',
    'src/app/[locale]/telegram/TelegramView.tsx',
    'src/app/[locale]/twitter/TwitterView.tsx'
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Pattern to find the multiline subtitle paragraph in the Hero section
    # and convert it to a single line
    pattern = r'(<p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto hidden sm:block">)\s*({.*?\.subtitle})\s*(</p>)'
    
    new_content = re.sub(pattern, r'\1\2\3', content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed whitespace in {filepath}")
    else:
        print(f"No whitespace issue found in {filepath}")

