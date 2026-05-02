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
    
    # 1. Add Import if missing
    if 'InternalToolLinks' not in content:
        import_stmt = 'import { InternalToolLinks } from "@/components/shared/InternalToolLinks"\n'
        content = re.sub(r'import { RelatedTools }', r'import { InternalToolLinks } from "@/components/shared/InternalToolLinks"\nimport { RelatedTools }', content)

    # 2. Add Component after CategoryCards
    if '<InternalToolLinks' not in content:
        platform = "instagram" if "HomeView" in filepath else filepath.split('/')[-2]
        # Get accent color if possible
        accent_match = re.search(r'accentColor="([^"]+)"', content)
        accent = accent_match.group(1) if accent_match else "text-pink-600"
        
        # Determine platform for the component call
        comp_platform = platform
        
        insertion_point = r'(<CategoryCards />)'
        replacement = r'\1\n      <InternalToolLinks currentPlatform="' + comp_platform + r'" dict={dict} />'
        content = re.sub(insertion_point, replacement, content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Added Platform Explorer to {filepath}")

