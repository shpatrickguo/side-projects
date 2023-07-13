# Imports
from PIL import Image, ImageFilter
import pandas as pd
import os
import logging
import pytesseract
import re
from datetime import datetime

logging.info("Starting dmgCheck.py")

main_folder = 'bossDmg'

# Set of allowed image formats
IMAGE_FORMATS = {'png', 'jpg', 'jpeg'}


# Function for Optical Character Recognition
def ocr_image(img_path, kernel_size=1):
    # Validate image file
    ext = os.path.splitext(img_path)[1].lower()
    if ext[1:] not in IMAGE_FORMATS:
        return None

    # Load image
    image = Image.open(img_path)

    # Convert to grayscale
    gray = image.convert('L')

    # Apply gaussian blur to remove noise
    blur = gray.filter(ImageFilter.GaussianBlur(radius=kernel_size))

    # Perform OCR
    ocr_text = pytesseract.image_to_string(blur)

    return ocr_text


# Create empty dataframe
df = pd.DataFrame(columns=['IGN', 'Boss', 'Damage', 'Date'])

# Loop through all sub-folders
for folder_name in os.listdir(main_folder):

    folder_path = os.path.join(main_folder, folder_name)

    # Skip non-folders
    if not os.path.isdir(folder_path):
        continue

    print(f"Processing folder: {folder_name}")

    # Loop through images inside this folder
    for filename in os.listdir(folder_path):

        image_path = os.path.join(folder_path, filename)
        if filename == '.DS_Store':
            continue

        # Perform OCR on image
        text = ocr_image(image_path)
        # Extract damage
        damage = re.search(r'Total Damage: (\d{1,3}(,\d{3})*)', text).group(1)
        # Remove commas and convert to integer
        damage = int(damage.replace(",", ""))

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

        # Create dataframe from this row
        row_df = pd.DataFrame([[folder_name, boss, damage, upload_date]], columns=['IGN', 'Boss', 'Damage', 'Date'])

        # Concatenate dataframes
        df = pd.concat([df, row_df], ignore_index=True)
        # Drop duplicates
        df = df.drop_duplicates()

# Export dataframe
if not os.path.exists('report'):
    os.mkdir('report')
# Export to CSV
df.to_csv('report/dmgCheck.csv', index=False)
