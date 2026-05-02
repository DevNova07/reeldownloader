import os
import re

files_to_fix = [
    'src/app/[locale]/facebook/FacebookView.tsx',
    'src/app/[locale]/tiktok/TikTokView.tsx',
    'src/app/[locale]/youtube/YoutubeView.tsx',
    'src/app/[locale]/snapchat/SnapchatView.tsx',
    'src/app/[locale]/telegram/TelegramView.tsx',
    'src/app/[locale]/twitter/TwitterView.tsx'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 1. Capture the corrupted h1 block and the surrounding messed up lines
    # This matches the specific corruption pattern found
    bad_pattern = r'({ id: "video", label:.*?, icon: <[^>]*? />\s*)(<motion\.div[^>]*?>\s*<h1[^>]*?>.*?</h1>.*?</motion\.div>)\s*},'
    
    match = re.search(bad_pattern, content, flags=re.DOTALL)
    if match:
        video_item_start = match.group(1)
        h1_block = match.group(2)
        
        # Corrected video item
        fixed_video_item = video_item_start.strip() + " },"
        
        # Remove the corruption and replace with fixed item
        new_content = content.replace(match.group(0), fixed_video_item)
        
        # 2. Put the h1 block AFTER PlatformTabs
        tabs_end_pattern = r'(<PlatformTabs.*?/>)'
        new_content = re.sub(tabs_end_pattern, r'\1\n\n          ' + h1_block, new_content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Fixed corruption and moved H1 in {filepath}")
        else:
            print(f"No changes made to {filepath}")
    else:
        print(f"Could not find corruption pattern in {filepath}")

