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
    
    # 1. Add subtitle back to Hero (hidden on mobile, visible on sm+)
    # We need to find the h1 block and the dictionary name used
    
    # Extract dict name (e.g., fbDict, tiktokDict, instaDict)
    dict_match = re.search(r'const (\w+Dict) = dict\.platforms\.', content)
    if not dict_match:
        # For HomeView it might be different
        if 'HomeView.tsx' in filepath:
            dict_name = 'instaDict'
        else:
            print(f"Could not find dict name in {filepath}")
            continue
    else:
        dict_name = dict_match.group(1)

    # Find the h1 block
    h1_pattern = r'(<h1.*?>.*?</h1>)'
    h1_match = re.search(h1_pattern, content, flags=re.DOTALL)
    
    if h1_match:
        h1_block = h1_match.group(1)
        # Check if subtitle is already there (unlikely given previous changes)
        if f'{dict_name}.subtitle' not in content[content.find(h1_block):content.find(h1_block)+500]:
            subtitle_block = f'\n            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto hidden sm:block">\n              {{{dict_name}.subtitle}}\n            </p>'
            content = content.replace(h1_block, h1_block + subtitle_block)
    
    # 2. Hide subtitle in SEO section on PC (sm:hidden)
    # The subtitle at the bottom usually looks like:
    # <p className="mt-6 text-lg ..."> {dict_name}.subtitle </p>
    
    seo_subtitle_pattern = r'(<p className="mt-6 text-lg [^>]*?text-neutral-600[^>]*?">\s*{' + dict_name + r'\.subtitle}\s*</p>)'
    
    seo_match = re.search(seo_subtitle_pattern, content, flags=re.DOTALL)
    if seo_match:
        old_seo_block = seo_match.group(1)
        # Add sm:hidden to the class
        new_seo_block = old_seo_block.replace('className="mt-6 text-lg', 'className="mt-6 text-lg sm:hidden')
        content = content.replace(old_seo_block, new_seo_block)
    else:
        # Try another common pattern if it was changed
        seo_subtitle_pattern_2 = r'(<p className="mt-6 text-lg [^>]*?border-l-4[^>]*?">\s*{' + dict_name + r'\.subtitle}\s*</p>)'
        seo_match_2 = re.search(seo_subtitle_pattern_2, content, flags=re.DOTALL)
        if seo_match_2:
            old_seo_block = seo_match_2.group(1)
            new_seo_block = old_seo_block.replace('className="mt-6 text-lg', 'className="mt-6 text-lg sm:hidden')
            content = content.replace(old_seo_block, new_seo_block)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath} for split subtitle display.")

