import os
import re

files_to_revert = [
    'src/app/[locale]/facebook/FacebookView.tsx',
    'src/app/[locale]/tiktok/TikTokView.tsx',
    'src/app/[locale]/youtube/YoutubeView.tsx',
    'src/app/[locale]/snapchat/SnapchatView.tsx',
    'src/app/[locale]/telegram/TelegramView.tsx',
    'src/app/[locale]/twitter/TwitterView.tsx',
    'src/app/[locale]/HomeView.tsx'
]

for filepath in files_to_revert:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f: content = f.read()
    
    # Remove the added component line
    content = re.sub(r'\n\s*<InternalToolLinks currentPlatform="[^"]+" dict=\{dict\} />', '', content)
    # Remove the import line
    content = re.sub(r'import \{ InternalToolLinks \} from "@\/components\/shared\/InternalToolLinks"\n', '', content)
    
    with open(filepath, 'w') as f: f.write(content)
    print(f"Reverted {filepath}")
