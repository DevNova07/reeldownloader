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
    
    # Standardize Container Gap to be very tight on mobile
    content = content.replace('gap-2 sm:gap-6', 'gap-1 sm:gap-6')
    
    # Reduce H1 bottom margin on mobile
    content = content.replace('mb-2 text-3xl', 'mb-0 text-3xl')
    content = content.replace('mb-2 text-4xl', 'mb-0 text-4xl')
    
    # Also check for mb-2 on motion.div containing H1
    content = content.replace('mb-2 sm:block', 'mb-0 sm:block')
    
    with open(filepath, 'w') as f: f.write(content)
    print(f"Aggressive gap fix in {filepath}")

