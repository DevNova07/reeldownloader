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
    
    # Find the motion.div containing h1 at the top
    container_start = r'<div className="relative z-10 mx-auto max-w-7xl text-center">'
    motion_h1_pattern = r'(' + re.escape(container_start) + r')\s*(<motion\.div[^>]*?>\s*<h1[^>]*?>.*?</h1>.*?</motion\.div>)'
    
    match = re.search(motion_h1_pattern, content, flags=re.DOTALL)
    if match:
        h1_block = match.group(2)
        # Remove it from the top
        content_no_h1 = content.replace(h1_block, '', 1) # Only replace the first occurrence
        
        # Find where to put it back (usually after PlatformTabs or SocialPlatformBar)
        # In most views, it was after PlatformTabs
        tabs_pattern = r'(<PlatformTabs[^>]*?/>)'
        
        if re.search(tabs_pattern, content_no_h1):
            new_content = re.sub(tabs_pattern, r'\1\n\n          ' + h1_block, content_no_h1)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Reverted H1 position in {filepath}")
        else:
            print(f"Could not find PlatformTabs in {filepath}")
    else:
        print(f"Could not find H1 at top in {filepath}")

