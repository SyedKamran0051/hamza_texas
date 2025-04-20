import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re
import json

# Create specials assets directory if it doesn't exist
specials_dir = 'assets/specials'
if not os.path.exists(specials_dir):
    os.makedirs(specials_dir)

# URLs to scrape for specials
urls = [
    'https://texascraftwings.com/specials/',
    'https://texascraftwings.com/special/boiled-seafood-platters/',
    'https://texascraftwings.com/special/limited-time-seafood-menu/',
    'https://texascraftwings.com/special/sunday-showdown-special/',
    'https://texascraftwings.com/special/blitz-bites-saturday-special/',
    'https://texascraftwings.com/special/chicks-and-sips/',
    'https://texascraftwings.com/special/monday-night-football-special/',
    'https://texascraftwings.com/special/wing-wednesday/'
]

# Specific image URLs we know exist (from the web content)
specific_images = [
    'https://texascraftwings.com/wp-content/uploads/2024/01/Black-Bold-Best-Seafood-Flyer-Instagram-Post-300x300.png',
    'https://texascraftwings.com/wp-content/uploads/2023/11/Seafood-menu-300x300.png',
    'https://texascraftwings.com/wp-content/uploads/2023/10/sunday-slugger-300x300.png',
    'https://texascraftwings.com/wp-content/uploads/2023/10/Grand-Slam-Saturdays-Instagram-Post-300x300.png',
    'https://texascraftwings.com/wp-content/uploads/2023/10/Black-and-Pink-Wine-Illustration-Ladies-Night-Poster-300x300.png',
    'https://texascraftwings.com/wp-content/uploads/2023/10/draft-300x300.png',
    'https://texascraftwings.com/wp-content/uploads/2023/10/Wildcard-Wing-Wednesday-TCW-300x300.png'
]

# List to store special information
specials = []

# Function to download images
def download_image(img_url, save_path):
    try:
        # Make absolute URL if it's relative
        if not bool(urlparse(img_url).netloc):
            img_url = urljoin(base_url, img_url)
        
        # Get higher resolution image by removing size constraints
        img_url = re.sub(r'-\d+x\d+\.', '.', img_url)
        
        # Send a request to the image URL
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        img_response = requests.get(img_url, headers=headers, stream=True)
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

# First download the specific images we know about
for img_url in specific_images:
    filename = os.path.basename(urlparse(img_url).path)
    # Clean filename and remove size constraints
    filename = re.sub(r'-\d+x\d+\.', '.', filename)
    filename = re.sub(r'[^\w\-.]', '_', filename)
    
    # Create save path
    save_path = os.path.join(specials_dir, filename)
    
    # Download the image
    download_image(img_url, save_path)

# Process each URL
for base_url in urls:
    print(f"Processing {base_url}")
    
    # Send a request to the website
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(base_url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Get page title
        title_elem = soup.find(['h1', 'h2'])
        title = title_elem.text.strip() if title_elem else os.path.basename(urlparse(base_url).path).replace('-', ' ').title()
        
        # Get page description
        description_elem = soup.find('h3')
        description = description_elem.text.strip() if description_elem else ""
        
        # Find all image tags
        img_tags = soup.find_all('img')
        special_image = None
        
        for img in img_tags:
            img_url = img.get('src')
            if not img_url:
                continue
                
            # Skip logo and icons
            if 'logo' in img_url.lower() or 'icon' in img_url.lower() or 'sticker' in img_url.lower() or '.svg' in img_url.lower():
                continue
                
            # Look for images that are likely to be specials
            if 'special' in img_url.lower() or 'menu' in img_url.lower() or 'promo' in img_url.lower() or 'instagram' in img_url.lower() or 'post' in img_url.lower():
                # Extract filename from URL
                filename = os.path.basename(urlparse(img_url).path)
                
                # Clean filename and remove size constraints
                filename = re.sub(r'-\d+x\d+\.', '.', filename)
                filename = re.sub(r'[^\w\-.]', '_', filename)
                
                # Create save path
                save_path = os.path.join(specials_dir, filename)
                
                # Download the image
                if download_image(img_url, save_path):
                    special_image = {
                        'filename': filename,
                        'path': save_path,
                        'url': img_url
                    }
                    break
        
        # If no special image found, try to match with specific images
        if not special_image:
            for specific_url in specific_images:
                if base_url.split('/')[-2] in specific_url:
                    filename = os.path.basename(urlparse(specific_url).path)
                    # Clean filename and remove size constraints
                    filename = re.sub(r'-\d+x\d+\.', '.', filename)
                    filename = re.sub(r'[^\w\-.]', '_', filename)
                    
                    special_image = {
                        'filename': filename,
                        'path': os.path.join(specials_dir, filename),
                        'url': specific_url
                    }
                    break
            
            # If still no match, use a default image based on the day
            if not special_image:
                day_mapping = {
                    'monday': 'draft.png',
                    'tuesday': 'draft.png',  # No Tuesday special, use Monday as default
                    'wednesday': 'Wildcard_Wing_Wednesday_TCW.png',
                    'thursday': 'Black_and_Pink_Wine_Illustration_Ladies_Night_Poster.png',
                    'friday': 'Grand_Slam_Saturdays_Instagram_Post.png',  # No Friday special, use Saturday as default
                    'saturday': 'Grand_Slam_Saturdays_Instagram_Post.png',
                    'sunday': 'sunday_slugger.png',
                }
                
                for day, img in day_mapping.items():
                    if day in base_url.lower():
                        special_image = {
                            'filename': img,
                            'path': os.path.join(specials_dir, img),
                            'url': f"Default for {day}"
                        }
                        break
        
        # Add special to list with a matching image if possible
        if title != "Specials":  # Skip the main specials page
            specials.append({
                'title': title,
                'description': description,
                'image': special_image if special_image else {'filename': 'default.png', 'path': 'assets/specials/default.png'},
                'url': base_url,
                'day': os.path.basename(urlparse(base_url).path).split('-')[0] if '-' in os.path.basename(urlparse(base_url).path) else ""
            })
    
    except Exception as e:
        print(f"Error processing {base_url}: {e}")

# Print the specials information
print(f"\nFound {len(specials)} specials:")
for special in specials:
    print(f"Title: {special['title']}")
    print(f"Description: {special['description']}")
    if 'image' in special and special['image']:
        print(f"Image: {special['image']['filename']}")
    print(f"Day: {special.get('day', '')}")
    print("-" * 30)

# Create a JSON file with the specials data
with open('assets/specials/specials.json', 'w') as f:
    json.dump(specials, f, indent=2)

print(f"Saved specials data to assets/specials/specials.json")
