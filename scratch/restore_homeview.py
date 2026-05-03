import os

file_path = "/Users/ramzan/Documents/projects/websites/instasnap/src/app/[locale]/HomeView.tsx"

with open(file_path, 'r') as f:
    content = f.read()

target = """      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 border-t border-neutral-100 dark:border-neutral-800 pt-10">
      </div>
</section>
    </div>"""

replacement = """      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12 border-t border-neutral-100 dark:border-neutral-800 pt-10">
        <Breadcrumbs 
          items={[
            { name: "Home", item: `/${locale}` },
            { name: "Instagram Downloader", item: `/${locale}` }
          ]} 
        />
      </div>
</section>
    </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w') as f:
        f.write(content)
    print("Successfully restored Breadcrumbs in HomeView.tsx")
else:
    print("Could not find target content")
