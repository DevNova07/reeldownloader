import os
from PIL import Image

def convert_to_webp(target_dir='public/images', quality=80):
    total_original_size = 0
    total_new_size = 0
    converted_count = 0

    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                source_path = os.path.join(root, file)
                filename, ext = os.path.splitext(file)
                dest_path = os.path.join(root, filename + '.webp')

                try:
                    # Get original size
                    original_size = os.path.getsize(source_path)
                    total_original_size += original_size

                    # Convert and save
                    img = Image.open(source_path)
                    # Convert to RGB if it's JPG (not strictly necessary but safe)
                    if ext.lower() in ('.jpg', '.jpeg'):
                        img = img.convert('RGB')
                    
                    img.save(dest_path, 'WEBP', quality=quality)

                    # Get new size
                    new_size = os.path.getsize(dest_path)
                    total_new_size += new_size
                    converted_count += 1

                    # Remove original
                    os.remove(source_path)
                    print(f"Converted: {file} -> {filename}.webp ({original_size/1024:.1f}KB -> {new_size/1024:.1f}KB)")

                except Exception as e:
                    print(f"Error converting {file}: {e}")

    if converted_count > 0:
        savings = (total_original_size - total_new_size) / (1024 * 1024)
        percent = (1 - (total_new_size / total_original_size)) * 100
        print(f"\nOptimization Finished!")
        print(f"Total Converted: {converted_count} files")
        print(f"Total Space Saved: {savings:.2f} MB ({percent:.1f}% reduction)")
    else:
        print("No images found to convert.")

if __name__ == "__main__":
    convert_to_webp()
