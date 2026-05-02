import csv
import json

csv_file = '/Users/ramzan/Documents/projects/websites/instasnap/savclip_advanced_seo_checklist.csv'
json_file = '/Users/ramzan/Documents/projects/websites/instasnap/src/dictionaries/en.json'

with open(json_file, 'r') as f:
    data = json.load(f)

existing_keys = set(data['platforms']['seo_pages'].keys())

csv_slugs = []
with open(csv_file, 'r') as f:
    reader = csv.reader(f)
    next(reader) # skip header
    for row in reader:
        url = row[0]
        slug = url.split('/')[-1].replace('-', '_')
        csv_slugs.append(slug)

missing = [s for s in csv_slugs if s not in existing_keys]
print(f"Total CSV Slugs: {len(csv_slugs)}")
print(f"Existing Keys: {len(existing_keys)}")
print(f"Missing Keys ({len(missing)}): {missing}")
