# Imports
# Image handling
from PIL import Image
from PIL import Image, ImageFilter
import cv2
import imghdr
# Data handling
import pandas as pd
# Filesystem
import os
# Text processing
import pytesseract
import re
# Dates
from datetime import datetime

# Set of allowed image formats
IMAGE_FORMATS = {'png', 'jpg', 'jpeg'}

# Function for Optical Character Recognition
def ocr_image(image_path, kernel_size=1):

    # Validate image file
    ext = os.path.splitext(image_path)[1].lower()
    if ext[1:] not in IMAGE_FORMATS and imghdr.what(image_path) not in IMAGE_FORMATS:
        return None

    # Load image
    image = Image.open(image_path)

    # Convert to grayscale
    gray = image.convert('L')

    # Apply gaussian blur to remove noise
    blur = gray.filter(ImageFilter.GaussianBlur(radius=kernel_size))

    # Perform OCR
    text = pytesseract.image_to_string(blur)

    return text

# Create empty dataframe
df = pd.DataFrame(columns=['IGN', 'Boss', 'Damage', 'Date'])

main_folder = 'images'

# Loop through all subfolders
for folder_name in os.listdir(main_folder):

    folder_path = os.path.join(main_folder, folder_name)

    # Skip non-folders
    if not os.path.isdir(folder_path):
        continue

    print(f"Processing folder: {folder_name}")

    # Loop through images inside this folder
    for filename in os.listdir(folder_path):

        image_path = os.path.join(folder_path, filename)

        # Perform OCR on image
        text = ocr_image(image_path)

        # Extract damage
        damage = re.search(r'Total Damage: (\d{1,3}(,\d{3})*)', text).group(1)

        # Extract boss name
        boss = re.search(r'(Living Abyss|Red Velvet Dragon|Avatar of Destiny)', text).group(1)

        # Get image upload date
        upload_time = os.path.getmtime(image_path)
        upload_date = datetime.fromtimestamp(upload_time).date()

        # Create new row
        new_row = {
            'IGN': folder_name,
            'Boss': boss,
            'Damage': damage,
            'Date': upload_date
        }

        # Append row to dataframe
        df = df.append(new_row, ignore_index=True)

        # Drop duplicates
        df = df.drop_duplicates()

# Export to CSV
df.to_csv('dmgCheck.csv', index=False)