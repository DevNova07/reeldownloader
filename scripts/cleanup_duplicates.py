import os

def cleanup_duplicates():
    base_dirs = ['src/components/templates']
    
    target_duplicate = 'import dynamic from "next/dynamic";\n'
    
    fixed_count = 0

    for base_dir in base_dirs:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith('.tsx'):
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Find all occurrences of the dynamic import
                    # We want to keep the first one and remove the rest
                    
                    # There are mixed quotes and semicolons in the file
                    # Let's standardize the line to search for and remove the second block
                    
                    if '// Dynamic imports for improved performance (below-the-fold content)' in content:
                        # The block below this has `import dynamic from "next/dynamic";`
                        content = content.replace('// Dynamic imports for improved performance (below-the-fold content)\nimport dynamic from "next/dynamic";', '// Dynamic imports for improved performance (below-the-fold content)')
                        
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        fixed_count += 1

    print(f"Removed duplicate dynamic imports in {fixed_count} template files.")

if __name__ == "__main__":
    cleanup_duplicates()
