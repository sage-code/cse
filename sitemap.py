import os
from urllib.parse import urljoin

# Configuration
BASE_URL = "https://sagecode.pro"  # Your domain name
OUTPUT_FILE = "sitemap.xml"        # Output sitemap file
SOURCE_DIR = "./"                  # Root directory of your website source code

def generate_sitemap(base_url, source_dir, output_file):
    # List to store all URLs
    urls = []
    
    # Walk through all subfolders and files
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith(".html"):  # Check for .html files
                # Generate relative path
                file_path = os.path.join(root, file)
                # Convert to URL format
                relative_path = os.path.relpath(file_path, source_dir).replace("\\", "/")
                url = urljoin(base_url + "/", relative_path)
                urls.append(url)
    
    # Generate XML content
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for url in urls:
        sitemap_content += f"  <url>\n    <loc>{url}</loc>\n  </url>\n"
    sitemap_content += "</urlset>"
    
    # Write to output file
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    
    print(f"Sitemap generated successfully: {output_file}")

# Run the script
if __name__ == "__main__":
    generate_sitemap(BASE_URL, SOURCE_DIR, OUTPUT_FILE)
