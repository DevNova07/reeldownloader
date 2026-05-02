import os
import glob

directory = '/Users/ramzan/Documents/projects/websites/instasnap/src/app'
tsx_files = glob.glob(f'{directory}/**/*.tsx', recursive=True)

count = 0
for filepath in tsx_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False
    
    # Target exact substring
    target_1 = 'mb-2 text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic'
    replacement_1 = 'mb-2 text-3xl min-[400px]:text-4xl font-black tracking-tight text-white sm:text-7xl drop-shadow-2xl uppercase italic text-balance'
    
    target_2 = 'mb-2 text-4xl font-black tracking-tight text-black sm:text-7xl drop-shadow-2xl uppercase italic'
    replacement_2 = 'mb-2 text-3xl min-[400px]:text-4xl font-black tracking-tight text-black sm:text-7xl drop-shadow-2xl uppercase italic text-balance'

    if target_1 in content:
        content = content.replace(target_1, replacement_1)
        modified = True
    
    if target_2 in content:
        content = content.replace(target_2, replacement_2)
        modified = True

    if modified:
        with open(filepath, 'w') as f:
            f.write(content)
        count += 1

print(f"Modified {count} files.")
