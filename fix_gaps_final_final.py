import os
import re

files = [
    'src/components/templates/FacebookPage.tsx',
    'src/components/templates/SnapchatPage.tsx',
    'src/components/templates/TiktokPage.tsx',
    'src/components/templates/TwitterPage.tsx',
    'src/components/templates/YoutubePage.tsx',
    'src/components/templates/TelegramPage.tsx',
    'src/components/templates/InstagramPage.tsx',
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
    
    # Slightly bring them closer
    content = content.replace('gap-4 sm:gap-6', 'gap-3 sm:gap-6')
    content = content.replace('gap-5 sm:gap-6', 'gap-3 sm:gap-6')
    
    with open(filepath, 'w') as f: f.write(content)
    print(f"Final gap adjustment in {filepath}")

# Fix PlatformTabs separately
with open('src/components/shared/PlatformTabs.tsx', 'r') as f: content = f.read()
content = content.replace('mt-4 mb-6 sm:mb-10', 'mt-3 mb-6 sm:mb-10')
with open('src/components/shared/PlatformTabs.tsx', 'w') as f: f.write(content)

