import csv
import json
import os

csv_file = '/Users/ramzan/Documents/projects/websites/instasnap/savclip_advanced_seo_checklist.csv'
temp_csv = '/Users/ramzan/Documents/projects/websites/instasnap/savclip_advanced_seo_checklist_v2.csv'
json_file = '/Users/ramzan/Documents/projects/websites/instasnap/src/dictionaries/en.json'

with open(json_file, 'r') as f:
    data = json.load(f)

seo_pages = data['platforms']['seo_pages']

updated_rows = []
with open(csv_file, 'r') as f:
    reader = csv.reader(f)
    header = next(reader)
    updated_rows.append(header)
    for row in reader:
        url, site_name, title, desc, breadcrumb, rating = row
        # Flatten the URL if nested
        # e.g. https://savclip.com/en/instagram/music -> https://savclip.com/en/instagram-music
        base_url = "https://savclip.com/en/"
        path = url.replace(base_url, "")
        clean_slug = path.replace("/", "-").replace("_", "-")
        new_url = base_url + clean_slug
        
        json_key = clean_slug.replace("-", "_")
        
        # Update Dictionary
        seo_pages[json_key] = {
            "title": title,
            "subtitle": desc,
            "seo": {
                "title": title,
                "desc": desc
            },
            "desc": desc
        }
        
        updated_rows.append([new_url, site_name, title, desc, breadcrumb, rating])

# Save back to en.json
with open(json_file, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Save updated CSV
with open(temp_csv, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(updated_rows)

os.replace(temp_csv, csv_file)
print(f"Final Count: {len(seo_pages)} pages in en.json and CSV updated.")
