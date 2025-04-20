import os
import requests
import time

# Create assets directory if it doesn't exist
if not os.path.exists('assets'):
    os.makedirs('assets')

# Function to download images
def download_image(img_url, save_path):
    try:
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

# List of images to download from free sources
images = [
    {
        "name": "logo.png",
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Wienerschnitzel_logo.svg/1200px-Wienerschnitzel_logo.svg.png"
    },
    {
        "name": "hero-bg.jpg",
        "url": "https://fastfoodnutrition.org/social2/1200/wienerschnitzel.jpg"
    },
    {
        "name": "original-hotdog.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1487_s.jpg"
    },
    {
        "name": "chili-dog.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1488_s.jpg"
    },
    {
        "name": "chili-cheese-dog.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1489_s.jpg"
    },
    {
        "name": "cheeseburger.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1501_s.jpg"
    },
    {
        "name": "chili-cheeseburger.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1502_s.jpg"
    },
    {
        "name": "corn-dog.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1492_s.jpg"
    },
    {
        "name": "chili-cheese-fries.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1508_s.jpg"
    },
    {
        "name": "tastee-freez.jpg",
        "url": "https://fastfoodnutrition.org/item-photos/full/1520_s.jpg"
    },
    {
        "name": "app-screenshot.jpg",
        "url": "https://play-lh.googleusercontent.com/Nt_MOuHAQKPRlCxYPZ0Fz2YCrFVXkJ6_lAm0vAXZzC6Cdl_S_c-DTvXTpKfQsYftw0A=w526-h296-rw"
    },
    {
        "name": "app-store.png",
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
    },
    {
        "name": "play-store.png",
        "url": "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
    }
]

# Download each image
for img in images:
    save_path = os.path.join('assets', img['name'])
    download_image(img['url'], save_path)
    # Add a small delay to avoid rate limiting
    time.sleep(1)

print("Downloaded additional images to the assets folder.")
