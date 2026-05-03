import os

file_path = "/Users/ramzan/Documents/projects/websites/instasnap/src/components/layout/SearchBar.tsx"

with open(file_path, 'r') as f:
    content = f.read()

target = """      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >"""

replacement = """      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >"""

if target in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w') as f:
        f.write(content)
    print("Successfully removed opacity: 0 from SearchBar.tsx")
else:
    print("Target not found in SearchBar.tsx")
