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
    
    # Increase Container Gap
    content = content.replace('gap-3 sm:gap-6', 'gap-4 sm:gap-6')
    
    # Increase H1 bottom margin
    content = content.replace('mb-2 text-3xl', 'mb-3 text-3xl')
    content = content.replace('mb-2 text-4xl', 'mb-3 text-4xl')
    content = content.replace('mb-2 sm:block', 'mb-3 sm:block')
    
    with open(filepath, 'w') as f: f.write(content)
    print(f"More gap fix in {filepath}")

# Fix PlatformTabs separately
with open('src/components/shared/PlatformTabs.tsx', 'r') as f: content = f.read()
content = content.replace('mb-4 sm:mb-10', 'mb-6 sm:mb-10')
with open('src/components/shared/PlatformTabs.tsx', 'w') as f: f.write(content)

