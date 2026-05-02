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
    
    # Revert to a balanced Gap
    content = content.replace('gap-1 sm:gap-6', 'gap-3 sm:gap-6')
    content = content.replace('gap-2 sm:gap-6', 'gap-3 sm:gap-6')
    
    # Revert H1 bottom margin
    content = content.replace('mb-0 text-3xl', 'mb-2 text-3xl')
    content = content.replace('mb-0 text-4xl', 'mb-2 text-4xl')
    content = content.replace('mb-0 sm:block', 'mb-2 sm:block')
    
    with open(filepath, 'w') as f: f.write(content)
    print(f"Balanced gap fix in {filepath}")

# Fix PlatformTabs separately
with open('src/components/shared/PlatformTabs.tsx', 'r') as f: content = f.read()
content = content.replace('mb-2 sm:mb-10', 'mb-4 sm:mb-10')
with open('src/components/shared/PlatformTabs.tsx', 'w') as f: f.write(content)

# Fix SearchBar separately
with open('src/components/layout/SearchBar.tsx', 'r') as f: content = f.read()
content = content.replace('py-1 sm:py-4', 'py-2 sm:py-4')
content = content.replace('mt-2 sm:mt-4', 'mt-3 sm:mt-4')
with open('src/components/layout/SearchBar.tsx', 'w') as f: f.write(content)

