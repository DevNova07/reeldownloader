import os
import re

files_to_update = [
    ('src/app/[locale]/facebook/FacebookView.tsx', 'fbDict'),
    ('src/app/[locale]/tiktok/TikTokView.tsx', 'tiktokDict'),
    ('src/app/[locale]/youtube/YoutubeView.tsx', 'ytDict'),
    ('src/app/[locale]/snapchat/SnapchatView.tsx', 'snapDict'),
    ('src/app/[locale]/telegram/TelegramView.tsx', 'teleDict'),
    ('src/app/[locale]/twitter/TwitterView.tsx', 'twDict'),
    ('src/app/[locale]/HomeView.tsx', 'instaDict')
]

for filepath, dict_name in files_to_update:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} as it does not exist.")
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Add SoftwareApplication and FAQPage if not already present
    if 'type="SoftwareApplication"' not in content:
        # Find the HowTo StructuredData
        howto_pattern = r'(<StructuredData\s+type="HowTo".*?data={{.*?}}.*?\s+/>)'
        
        replacement = r'\1\n      <StructuredData\n        type="SoftwareApplication"\n        data={{\n          title: ' + dict_name + r'.seo?.title || ' + dict_name + r'.title,\n          description: ' + dict_name + r'.seo?.desc || ' + dict_name + r'.subtitle\n        }}\n      />\n      <StructuredData\n        type="FAQPage"\n        data={' + dict_name + r'.faq || dict.faq}\n      />'
        
        new_content = re.sub(howto_pattern, replacement, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
        else:
            print(f"Could not find HowTo pattern in {filepath}")
    else:
        print(f"Skipping {filepath} as it already has SoftwareApplication schema.")

