import os
import re

templates_dir = "/Users/ramzan/Documents/projects/websites/instasnap/src/components/templates"
files_to_process = []
if os.path.exists(templates_dir):
    for f in os.listdir(templates_dir):
        if f.endswith(".tsx"):
            files_to_process.append(os.path.join(templates_dir, f))

for file_path in files_to_process:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace initial={{ opacity: 0, y: 10 }} with initial={false} for the h1 motion.div
    target = """          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >"""
    replacement = """          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >"""
          
    if target in content:
        content = content.replace(target, replacement)
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Fixed opacity in {os.path.basename(file_path)}")
