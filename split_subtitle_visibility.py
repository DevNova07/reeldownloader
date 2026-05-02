import os
import re

files_to_update = [
    'src/app/[locale]/HomeView.tsx',
    'src/app/[locale]/facebook/FacebookView.tsx',
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

    # 1. Add back to Hero (top) for PC ONLY
    # We find the </h1> and insert after it
    if f'{{{dict_name}.subtitle}}' not in content[:content.find('SearchBar')]:
         h1_pattern = r'(</h1>)'
         replacement = r'\1\n            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto hidden sm:block">{' + dict_name + r'.subtitle}</p>'
         content = re.sub(h1_pattern, replacement, content)

    # 2. Hide at bottom for PC (keep for Mobile)
    # Looking for: <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium italic opacity-80 ">{...subtitle}</p>
    bottom_pattern = r'(<p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 font-medium italic opacity-80\s*)(">\{' + dict_name + r'\.subtitle\}</p>)'
    content = re.sub(bottom_pattern, r'\1 sm:hidden\2', content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Split visibility in {filepath}")

# Handling InstagramPage.tsx
instagram_page = 'src/components/templates/InstagramPage.tsx'
if os.path.exists(instagram_page):
    with open(instagram_page, 'r') as f:
        content = f.read()
    
    # 1. Add back to Hero for PC ONLY
    if '{content?.subtitle' not in content[:content.find('SearchBar')]:
        h1_pattern = r'(</h1>)'
        replacement = r'\1\n            <p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl hidden sm:block">{content?.subtitle || pageSeo?.desc || "Fast and secure Instagram downloader."}</p>'
        content = re.sub(h1_pattern, replacement, content)
    
    # 2. Add to bottom for Mobile ONLY
    # We'll add it in the Info section (Expert Guide & Safety)
    if 'sm:hidden' not in content:
        info_pattern = r'(<p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">)'
        replacement = r'<p className="text-sm font-black text-neutral-500 dark:text-neutral-400 italic mb-4 sm:hidden">{content?.subtitle}</p>\n                 \1'
        content = re.sub(info_pattern, replacement, content)

    with open(instagram_page, 'w') as f:
        f.write(content)
    print(f"Split visibility in {instagram_page}")

