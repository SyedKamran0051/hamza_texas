import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

# Create assets directory if it doesn't exist
if not os.path.exists('assets'):
    os.makedirs('assets')

# URL of the website to scrape
url = 'https://wienerschnitzelhouston.com'

# Send a request to the website
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Function to download images
def download_image(img_url, save_path):
    try:
        # Make absolute URL if it's relative
        if not bool(urlparse(img_url).netloc):
            img_url = urljoin(url, img_url)
        
        # Send a request to the image URL
        img_response = requests.get(img_url, stream=True)
        img_response.raise_for_status()
        
        # Save the image
        with open(save_path, 'wb') as file:
            for chunk in img_response.iter_content(chunk_size=8192):
                file.write(chunk)
        
        print(f"Downloaded: {save_path}")
        return True
    except Exception as e:
        print(f"Error downloading {img_url}: {e}")
        return False

# Find all image tags
img_tags = soup.find_all('img')
downloaded_count = 0

# Download each image
for img in img_tags:
    img_url = img.get('src')
    if img_url:
        # Extract filename from URL
        filename = os.path.basename(urlparse(img_url).path)
        
        # If filename is empty or doesn't have an extension, generate one
        if not filename or '.' not in filename:
            filename = f"image_{downloaded_count}.png"
        
        save_path = os.path.join('assets', filename)
        if download_image(img_url, save_path):
            downloaded_count += 1

# Find background images in CSS
style_tags = soup.find_all('style')
inline_styles = soup.find_all(style=True)
link_tags = soup.find_all('link', rel='stylesheet')

# Extract URLs from style tags
css_urls = []
for style in style_tags:
    urls = re.findall(r'url\([\'"]?(.*?)[\'"]?\)', style.text)
    css_urls.extend(urls)

# Extract URLs from inline styles
for element in inline_styles:
    urls = re.findall(r'url\([\'"]?(.*?)[\'"]?\)', element['style'])
    css_urls.extend(urls)

# Download CSS files and extract URLs
for link in link_tags:
    href = link.get('href')
    if href:
        if not bool(urlparse(href).netloc):
            css_url = urljoin(url, href)
        else:
            css_url = href
        
        try:
            css_response = requests.get(css_url)
            css_response.raise_for_status()
            urls = re.findall(r'url\([\'"]?(.*?)[\'"]?\)', css_response.text)
            
            for img_url in urls:
                # Skip data URLs
                if img_url.startswith('data:'):
                    continue
                
                # Extract filename from URL
                filename = os.path.basename(urlparse(img_url).path)
                
                # If filename is empty or doesn't have an extension, generate one
                if not filename or '.' not in filename:
                    filename = f"css_image_{downloaded_count}.png"
                
                save_path = os.path.join('assets', filename)
                if download_image(img_url, save_path):
                    downloaded_count += 1
        except Exception as e:
            print(f"Error processing CSS {css_url}: {e}")

# Additionally, let's try to find the logo and other specific images
# Wiener Schnitzel logo is likely to be in the header or have specific class/id
logo_img = soup.find('img', {'class': re.compile(r'logo', re.I)}) or soup.find('img', {'id': re.compile(r'logo', re.I)})
if logo_img and logo_img.get('src'):
    logo_url = logo_img.get('src')
    save_path = os.path.join('assets', 'logo.png')
    download_image(logo_url, save_path)

# Also download any SVG images that might be used for the logo
svg_tags = soup.find_all('svg')
for i, svg in enumerate(svg_tags):
    svg_content = str(svg)
    save_path = os.path.join('assets', f'svg_{i}.svg')
    with open(save_path, 'w') as file:
        file.write(svg_content)
    print(f"Saved SVG: {save_path}")

# Try to download additional images from specific sections
# Menu items
menu_section = soup.find('section', {'id': 'menu'}) or soup.find('div', {'class': re.compile(r'menu', re.I)})
if menu_section:
    menu_imgs = menu_section.find_all('img')
    for i, img in enumerate(menu_imgs):
        img_url = img.get('src')
        if img_url:
            save_path = os.path.join('assets', f'menu_item_{i}.png')
            download_image(img_url, save_path)

# Try to download the hero background image
# This is more complex as it might be a background image in CSS
# For now, we'll just try to download a placeholder
hero_section = soup.find('section', {'class': re.compile(r'hero', re.I)}) or soup.find('div', {'class': re.compile(r'hero', re.I)})
if hero_section:
    hero_style = hero_section.get('style', '')
    hero_bg_urls = re.findall(r'url\([\'"]?(.*?)[\'"]?\)', hero_style)
    for i, bg_url in enumerate(hero_bg_urls):
        save_path = os.path.join('assets', f'hero_bg_{i}.png')
        download_image(bg_url, save_path)

print(f"Downloaded {downloaded_count} images to the assets folder.")

# Download additional images from the internet for menu items
def download_menu_images():
    menu_items = [
        {"name": "original-hotdog", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/original_hotdog-1.jpg"},
        {"name": "chili-dog", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/chili_dog-1.jpg"},
        {"name": "chili-cheese-dog", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/chili_cheese_dog-1.jpg"},
        {"name": "cheeseburger", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/hamburger-1.jpg"},
        {"name": "chili-cheeseburger", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/chili_cheeseburger-1.jpg"},
        {"name": "corn-dog", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/corn_dog-1.jpg"},
        {"name": "chili-cheese-fries", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/chili_cheese_fries-1.jpg"},
        {"name": "tastee-freez", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2014/10/chocolate_cone-1.jpg"},
        {"name": "logo", "url": "https://www.wienerschnitzel.com/wp-content/themes/wienerschnitzel/img/ws-logo.png"},
        {"name": "hero-bg", "url": "https://wienerschnitzelhouston.com/wp-content/uploads/2023/10/wiener-schnitzel-houston-1.jpg"},
        {"name": "app-screenshot", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2019/07/ws-app-phone-300x600.png"},
        {"name": "app-store", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2019/07/app-store-badge.png"},
        {"name": "play-store", "url": "https://www.wienerschnitzel.com/wp-content/uploads/2019/07/google-play-badge.png"}
    ]
    
    for item in menu_items:
        save_path = os.path.join('assets', f"{item['name']}.jpg" if not item['name'] in ['logo', 'app-store', 'play-store'] else f"{item['name']}.png")
        download_image(item['url'], save_path)

download_menu_images()
