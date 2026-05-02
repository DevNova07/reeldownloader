import os
import re

files = [
    'src/components/templates/FacebookPage.tsx',
    'src/components/templates/SnapchatPage.tsx',
    'src/components/templates/TiktokPage.tsx',
    'src/components/templates/TwitterPage.tsx',
    'src/components/templates/YoutubePage.tsx',
    'src/app/[locale]/facebook/FacebookView.tsx',
    'src/app/[locale]/snapchat/SnapchatView.tsx',
    'src/app/[locale]/tiktok/TikTokView.tsx',
    'src/app/[locale]/twitter/TwitterView.tsx',
    'src/app/[locale]/telegram/TelegramView.tsx',
    'src/app/[locale]/HomeView.tsx'
]

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f: content = f.read()
    
    # Standardize Section Padding
    # Match pt-14, pt-12, etc. and change to pt-10
    # Match pb-8, pb-12, etc. and change to pb-6
    content = re.sub(r'px-4 pt-\d+ pb-\d+', 'px-4 pt-10 pb-6', content)
    
    # Standardize Container Gap
    # Match gap-4 or gap-6 and change to gap-2
    content = re.sub(r'flex flex-col items-center gap-\d+', 'flex flex-col items-center gap-2', content)
    
    # Ensure sm:gap-6 and sm:pt/pb are preserved or added
    # (The above regex might replace them if they don't have sm: prefix)
    # Most pages already have sm: prefixes for larger screens.
    
    with open(filepath, 'w') as f: f.write(content)
    print(f"Fixed gaps in {filepath}")

