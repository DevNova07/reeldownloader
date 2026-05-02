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
    
    # Pattern to match the corrupted h1 inside PlatformTabs items
    # and move it after PlatformTabs
    
    # 1. Capture the h1 block
    h1_block_match = re.search(r'(<motion\.div[^>]*?>\s*<h1[^>]*?>.*?</h1>.*?</motion\.div>)', content, flags=re.DOTALL)
    if not h1_block_match:
        print(f"Could not find H1 block in {filepath}")
        continue
    
    h1_block = h1_block_match.group(1)
    
    # 2. Clean up the corrupted areas
    # Remove the captured h1 block and the trailing ' },' or similar corruption
    # Actually, let's just use a more surgical approach for each file if needed, 
    # but the pattern seems consistent.
    
    # Remove h1 block from where it is
    content = content.replace(h1_block, '')
    # Remove the ' },' or ' }' that was left behind
    content = content.replace(' },', '')
    
    # 3. Find PlatformTabs end and insert h1 block after it
    tabs_end_pattern = r'(<PlatformTabs[^>]*?items=\[.*?\]\s*/>)'
    
    if re.search(tabs_end_pattern, content, flags=re.DOTALL):
        new_content = re.sub(tabs_end_pattern, r'\1\n\n          ' + h1_block, content, flags=re.DOTALL)
        
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed H1 in {filepath}")
    else:
        print(f"Could not find PlatformTabs end in {filepath}")

