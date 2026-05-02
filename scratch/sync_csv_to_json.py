import csv
import json

csv_file = '/Users/ramzan/Documents/projects/websites/instasnap/savclip_advanced_seo_checklist.csv'
json_file = '/Users/ramzan/Documents/projects/websites/instasnap/src/dictionaries/en.json'

with open(json_file, 'r') as f:
    data = json.load(f)

seo_pages = data['platforms']['seo_pages']

with open(csv_file, 'r') as f:
    reader = csv.reader(f)
    next(reader) # skip header
    for row in reader:
        url, site_name, title, desc, breadcrumb, rating = row
        slug = url.split('/')[-1].replace('-', '_')
        
        # If slug is not in seo_pages, or we want to update it
        if slug not in seo_pages:
            seo_pages[slug] = {
                "title": title,
                "subtitle": desc,
                "seo": {
                    "title": title,
                    "desc": desc
                },
                "desc": desc
            }
        else:
            # Optionally update existing ones to match CSV exactly
            seo_pages[slug]["title"] = title
            seo_pages[slug]["subtitle"] = desc
            seo_pages[slug]["seo"]["title"] = title
            seo_pages[slug]["seo"]["desc"] = desc

# Save back to en.json
with open(json_file, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Synced {len(seo_pages)} pages to en.json")
