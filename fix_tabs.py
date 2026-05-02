import os
import re

files = open('pages_with_tabs.txt').read().splitlines()

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f: content = f.read()
    
    platform = ""
    if 'facebook' in filepath.lower(): platform = 'facebook'
    elif 'tiktok' in filepath.lower(): platform = 'tiktok'
    elif 'twitter' in filepath.lower(): platform = 'twitter'
    elif 'snapchat' in filepath.lower(): platform = 'snapchat'
    elif 'telegram' in filepath.lower(): platform = 'telegram'
    elif 'youtube' in filepath.lower(): platform = 'youtube'
    elif 'HomeView.tsx' in filepath: platform = 'instagram'
    
    if not platform: continue
    
    # Define items based on platform
    items_map = {
        'facebook': """[
              { id: "video", label: dict?.tabs?.video || "Video", href: "/facebook", icon: <Film className="h-4 w-4" /> },
              { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/facebook-reels-downloader", icon: <Film className="h-4 w-4" /> },
              { id: "story", label: dict?.tabs?.story || "Story", href: "/facebook-story-downloader", icon: <StopCircle className="h-4 w-4" /> },
              { id: "private", label: dict?.tabs?.private || "Private", href: "/facebook-private-video-downloader", icon: <ShieldCheck className="h-4 w-4" /> },
            ]""",
        'tiktok': """[
              { id: "video", label: dict.tabs?.video || "Video", href: "/tiktok", icon: <Film className="h-4 w-4" /> },
              { id: "story", label: dict.tabs?.story || "Story", href: "/tiktok/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "music", label: dict.tabs?.music || "Music", href: "/tiktok/music", icon: <MusicIcon className="h-4 w-4" /> },
              { id: "photo", label: dict.tabs?.photo || "Photo", href: "/tiktok/photo", icon: <Camera className="h-4 w-4" /> },
            ]""",
        'twitter': """[
              { id: "video", label: dict.tabs?.video || "Video", href: "/twitter", icon: <Film className="h-4 w-4" /> },
              { id: "gif", label: dict.tabs?.gif || "GIF", href: "/twitter/gif", icon: <Hash className="h-4 w-4" /> },
              { id: "photo", label: dict.tabs?.photo || "Photo", href: "/twitter/photo", icon: <Camera className="h-4 w-4" /> },
              { id: "music", label: dict.tabs?.music || "Music", href: "/twitter/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]""",
        'snapchat': """[
              { id: "video", label: dict.tabs?.video || "Video", href: "/snapchat", icon: <Ghost className="h-4 w-4" /> },
              { id: "spotlight", label: dict.tabs?.spotlight || "Spotlight", href: "/snapchat/spotlight", icon: <Play className="h-4 w-4" /> },
              { id: "story", label: dict.tabs?.story || "Story", href: "/snapchat/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "photo", label: dict.tabs?.photo || "Photo", href: "/snapchat/photo", icon: <Camera className="h-4 w-4" /> },
            ]""",
        'telegram': """[
              { id: "media", label: dict.tabs?.video || "Video", href: "/telegram", icon: <Send className="h-4 w-4" /> },
              { id: "channel", label: "Channels", href: "/telegram/channel", icon: <Megaphone className="h-4 w-4" /> },
              { id: "group", label: "Groups", href: "/telegram/group", icon: <Users className="h-4 w-4" /> },
              { id: "music", label: dict.tabs?.music || "Music", href: "/telegram/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]""",
        'youtube': """[
              { id: "video", label: dict.tabs?.video || "Video", href: "/youtube", icon: <Film className="h-4 w-4" /> },
              { id: "shorts", label: dict.tabs?.shorts || "Shorts", href: "/youtube/shorts", icon: <PlaySquare className="h-4 w-4" /> },
              { id: "movies", label: dict.tabs?.movies || "Movies", href: "/youtube/movies", icon: <Film className="h-4 w-4" /> },
              { id: "music", label: dict.tabs?.music || "Music", href: "/youtube/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]""",
        'instagram': """[
              { id: "video", label: dict?.tabs?.video || "Video", href: "/instagram", icon: <Camera className="h-4 w-4" /> },
              { id: "reels", label: dict?.tabs?.reels || "Reels", href: "/reels", icon: <PlaySquare className="h-4 w-4" /> },
              { id: "story", label: dict?.tabs?.story || "Story", href: "/story", icon: <StopCircle className="h-4 w-4" /> },
              { id: "music", label: dict?.tabs?.music || "Music", href: "/music", icon: <MusicIcon className="h-4 w-4" /> },
            ]"""
    }
    
    new_items = items_map[platform]
    
    # Regex to find items={[...]}
    # It handles multiple lines and nested braces
    pattern = r'items\s*=\s*\{\s*\[.*?\]\s*\}'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        new_content = content.replace(match.group(0), f'items={{{new_items}}}')
        
        # Ensure Icons are imported
        # We add them to the lucide-react import line if missing
        icons_to_check = {
            'facebook': ['Film', 'StopCircle', 'ShieldCheck'],
            'tiktok': ['Film', 'StopCircle', 'MusicIcon', 'Camera'],
            'twitter': ['Film', 'Hash', 'Camera', 'MusicIcon'],
            'snapchat': ['Ghost', 'Play', 'StopCircle', 'Camera'],
            'telegram': ['Send', 'Megaphone', 'Users', 'MusicIcon'],
            'youtube': ['Film', 'PlaySquare', 'MusicIcon'],
            'instagram': ['Camera', 'PlaySquare', 'StopCircle', 'MusicIcon']
        }
        
        needed_icons = icons_to_check[platform]
        import_pattern = r'import\s+\{(.*?)\}\s+from\s+"lucide-react"'
        import_match = re.search(import_pattern, new_content)
        
        if import_match:
            existing_icons = [i.strip() for i in import_match.group(1).split(',')]
            for icon in needed_icons:
                # Handle alias for Music
                actual_icon = "Music" if icon == "MusicIcon" else icon
                if actual_icon not in [i.split(' as ')[0].strip() for i in existing_icons]:
                    if icon == "MusicIcon":
                        existing_icons.append("Music as MusicIcon")
                    else:
                        existing_icons.append(icon)
            
            new_import = f'import {{ {", ".join(sorted(set(existing_icons)))} }} from "lucide-react"'
            new_content = re.sub(import_pattern, new_import, new_content)
            
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Fixed {filepath}")

