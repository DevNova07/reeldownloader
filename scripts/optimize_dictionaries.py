import json
import os

PLATFORMS = ['instagram', 'facebook', 'youtube', 'tiktok', 'snapchat', 'telegram', 'twitter']

def optimize_dict(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if 'platforms' not in data or 'seo_pages' not in data['platforms']:
        return

    seo_pages = data['platforms']['seo_pages']
    
    # Identify boilerplates
    # We'll use a majority-vote system to find the boilerplate for each platform
    boilerplates = {}
    
    for platform in PLATFORMS:
        platform_tails = []
        for key, page in seo_pages.items():
            if platform in key:
                art = page.get('article_content', '')
                if '\n\n' in art:
                    platform_tails.append(art.split('\n\n')[-1].strip())
        
        if platform_tails:
            from collections import Counter
            most_common, count = Counter(platform_tails).most_common(1)[0]
            if count > 1 and len(most_common) > 50:
                boilerplates[platform] = most_common

    # Add boilerplates to common section
    if 'common' not in data:
        data['common'] = {}
    
    data['common']['boilerplates'] = boilerplates

    # Second pass: Strip boilerplates
    count = 0
    for key, page in seo_pages.items():
        art = page.get('article_content', '')
        if not art:
            continue
            
        matched_platform = None
        for p in PLATFORMS:
            if p in key:
                matched_platform = p
                break
        
        if matched_platform and matched_platform in boilerplates:
            target_bp = boilerplates[matched_platform]
            if target_bp in art:
                # Remove the boilerplate
                new_art = art.replace(target_bp, '').strip()
                page['article_content'] = new_art
                count += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    return count

def main():
    dict_dir = 'src/dictionaries'
    for file in os.listdir(dict_dir):
        if file.endswith('.json'):
            path = os.path.join(dict_dir, file)
            saved = optimize_dict(path)
            if saved:
                print(f"Optimized {file}: Stripped {saved} pages.")

if __name__ == "__main__":
    main()
