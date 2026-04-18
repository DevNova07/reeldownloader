import os
import json

def sync_master():
    dict_dir = 'src/dictionaries'
    en_path = os.path.join(dict_dir, 'en.json')
    
    if not os.path.exists(en_path):
        print(f"Error: {en_path} not found.")
        return

    # Load master English dictionary
    with open(en_path, 'r', encoding='utf-8') as f:
        master_en = json.load(f)

    # Consolidated Defaults logic (from all previous versions)
    category_defaults = {
        "insta": "Instagram",
        "fb": "Facebook",
        "snap": "Snapchat",
        "snapchat": "Snapchat", # v100 alias
        "tele": "Telegram",
        "tiktok": "TikTok",
        "yt": "YouTube",
        "tw": "Twitter",
        "bio": "Link-in-Bio",
        "music": "Music & MP3",
        "private": "Private Downloader",
        "insta_desc": "Download Instagram Reels, Stories, and Videos in high resolution.",
        "fb_desc": "Save Facebook videos and Reels directly to your device gallery.",
        "tiktok_desc": "Download TikTok videos without watermark in original HD quality.",
        "yt_desc": "Get YouTube Shorts and Music in high-bitrate MP3 or MP4 formats.",
        "tw_desc": "Download videos and GIFs from X (Twitter) safely and quickly.",
        "snap_desc": "Save Snapchat Spotlights and Stories in original source quality.",
        "bio_desc": "Create a beautiful, customizable Link-in-Bio page for your social profiles.",
        "tele_desc": "Download files and videos from any public Telegram channel.",
        "music_desc": "Extract high-quality audio and MP3 from TikTok and YouTube.",
        "private_desc": "Securely download content from your own saved and liked posts."
    }
    
    navbar_defaults = {
        "services": "Services",
        "reels_downloader": "Reels Downloader",
        "video_media": "Video & Media",
        "stories_highlights": "Stories & Highlights",
        "photo_profile": "Photo & Profile",
        "video_downloader": "Video Downloader",
        "reels_viral": "Reels & Viral",
        "private_tools": "Private Tools",
        "shorts_playlists": "Shorts & Playlists",
        "movies_clips": "Movies & Clips",
        "stories_spotlight": "Stories & Spotlight",
        "channels_private": "Channels & Private",
        "gif_downloader": "GIF Downloader"
    }
    
    footer_branding_default = {
        "title": "InstaSnap – Fast & Secure",
        "desc": "A trusted platform to save and manage social media content.",
        "platforms_title": "Supported Platforms",
        "features_title": "Features",
        "features": ["No Login", "Fast", "HD", "Multi-Platform"]
    }
    
    trending_default = {
        "label": "Trending Now",
        "template": "⚡ Someone from {country} saved a {type} {time}"
    }

    files = [f for f in os.listdir(dict_dir) if f.endswith('.json') and f != 'en.json']
    sync_count = 0

    def recursive_sync(master, target, locale=""):
        changed = False
        for key, value in master.items():
            if key not in target:
                # Basic auto-translate for common terms if locale is Hindi
                if isinstance(value, str) and locale == 'hi':
                    target[key] = value.replace("Download", "डाउनलोड").replace("Free", "मुफ्त").replace("Fast", "तेज़").replace("Safe", "सुरक्षित")
                else:
                    target[key] = value
                changed = True
            elif isinstance(value, dict) and isinstance(target[key], dict):
                if recursive_sync(value, target[key], locale):
                    changed = True
        return changed

    for filename in files:
        file_path = os.path.join(dict_dir, filename)
        locale = filename.replace('.json', '')
        
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception as e:
                print(f"Error loading {filename}: {e}")
                continue
        
        changed = False
        
        # 1. Recursive Sync from English master
        if recursive_sync(master_en, data, locale):
            changed = True
            
        # 2. Hardcoded Defaults Sync (Safety net for missing categories)
        if 'categories' not in data: data['categories'] = {}
        for key, default in category_defaults.items():
            if key not in data['categories']:
                data['categories'][key] = default
                changed = True
                
        if 'navbar' not in data: data['navbar'] = {}
        for key, default in navbar_defaults.items():
            if key not in data['navbar']:
                data['navbar'][key] = default
                changed = True
                
        if 'footer_branding' not in data:
            data['footer_branding'] = footer_branding_default
            changed = True
            
        if 'trending' not in data:
            data['trending'] = trending_default
            changed = True
            
        if 'tabs' not in data: data['tabs'] = {}
        if 'spotlight' not in data['tabs']:
            data['tabs']['spotlight'] = 'Spotlight'
            changed = True

        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            sync_count += 1

    print(f"Successfully consolidated and synchronized {sync_count} dictionary files from Master EN.")

if __name__ == "__main__":
    sync_master()
