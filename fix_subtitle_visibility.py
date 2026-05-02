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
    
    # Extract dict name
    dict_match = re.search(r'const (\w+Dict) = dict\.platforms\.', content)
    if not dict_match:
        if 'HomeView.tsx' in filepath:
            dict_name = 'instaDict'
        else:
            print(f"Could not find dict name in {filepath}")
            continue
    else:
        dict_name = dict_match.group(1)

    # 1. Ensure Hero subtitle is hidden on mobile
    hero_pattern = r'(<p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto)(">\s*{' + dict_name + r'\.subtitle}\s*</p>)'
    if re.search(hero_pattern, content):
        content = re.sub(hero_pattern, r'\1 hidden sm:block\2', content)

    # 2. Ensure SEO subtitle is hidden on PC
    # Search for the subtitle paragraph in the Info Section
    seo_pattern = r'(<p className="mt-4 text-lg text-neutral-500[^>]*?)(">\s*{' + dict_name + r'\.subtitle}\s*</p>)'
    if re.search(seo_pattern, content):
        content = re.sub(seo_pattern, r'\1 sm:hidden\2', content)
    else:
        # Try a more generic pattern
        seo_pattern_generic = r'(<p className="[^"]*?text-neutral-500[^"]*?)(">\s*{' + dict_name + r'\.subtitle}\s*</p>)'
        if re.search(seo_pattern_generic, content):
             content = re.sub(seo_pattern_generic, r'\1 sm:hidden\2', content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Fixed visibility for {filepath}")

