import os
import re

dir_path = 'src/dictionaries'
files = [f for f in os.listdir(dir_path) if f.endswith('.json')]

for filename in files:
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Fix missing comma before tiktok_video_online
    # Pattern: "desc": "..."\n      }\n      "tiktok_video_online":
    # or just: }\n      "tiktok_video_online":
    content = re.sub(r'(\s+)\}\n(\s+)"tiktok_video_online":', r'\1},\n\2"tiktok_video_online":', content)

    # 2. Fix the broken junction at the end of TikTok tools
    # Pattern: 
    #       "desc": "..."
    #     },
    # 
    #   "title": "AI Hashtag Generator
    
    # We need to close seo_pages (one }) and platforms (another }) and then add "hashtag_seo": {
    
    pattern = r'("desc":\s*"[^"]*"\s*)\}\s*,\s*\n\s*\n\s*"title":\s*"AI Hashtag Generator'
    replacement = r'\1}\n    }\n  },\n  "hashtag_seo": {\n    "title": "AI Hashtag Generator'
    
    content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filename}")
    else:
        print(f"No changes needed for {filename}")

