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
    
    # 1. Remove from Hero (top)
    # Looking for: <p className="... hidden sm:block">{...subtitle}</p>
    top_pattern = r'<p className="[^"]*?hidden sm:block[^"]*?">{.*?\.subtitle}</p>'
    content = re.sub(top_pattern, '', content)
    
    # 2. Make visible at bottom (SEO section)
    # Looking for: <p className="... sm:hidden">{...subtitle}</p>
    # We want to remove 'sm:hidden' and 'opacity-80' maybe to make it more prominent?
    # No, user just said move it.
    bottom_pattern = r'(<p className="[^"]*?)sm:hidden([^"]*?">{.*?\.subtitle}</p>)'
    content = re.sub(bottom_pattern, r'\1\2', content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Moved subtitle in {filepath}")

# Special handling for InstagramPage.tsx
instagram_page = 'src/components/templates/InstagramPage.tsx'
if os.path.exists(instagram_page):
    with open(instagram_page, 'r') as f:
        content = f.read()
    
    # Remove from Hero
    pattern = r'(<p className="mx-auto mb-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">)\s*({content\?\.subtitle.*?})\s*(</p>)'
    content = re.sub(pattern, '', content)
    
    # Add to bottom if not exists (InstagramPage has an info section at the bottom too)
    # Usually it's in the Info section. Let's see where to put it.
    # For now, I'll just remove it from the top and see where the bottom is.
    
    with open(instagram_page, 'w') as f:
        f.write(content)
    print(f"Removed top subtitle from {instagram_page}")

