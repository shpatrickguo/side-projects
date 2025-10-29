"""
dmgCheck.py - Guild Battle Damage OCR Processor

This script processes screenshots of guild battle damage from Cookie Run Kingdom.
It uses OCR (Optical Character Recognition) to extract damage numbers from images
and generates CSV reports organized by boss type.

Usage:
    1. Place user screenshots in bossDmg/<username>/ folders
    2. Update the SEASON variable to match current season
    3. Run: python dmgCheck.py
    4. Check output CSV files in report/ directory

TODO: Connect with extractDmgCheckChat.py so that we don't need to drag photos into their folders anymore
"""

# Imports
from PIL import Image, ImageFilter
import pandas as pd
import os
import logging
import pytesseract
import re
from datetime import datetime

logging.info("Starting dmgCheck.py")

# Global Variables
SEASON = "S3-4"

main_folder = 'bossDmg'

# Set of allowed image formats
IMAGE_FORMATS = {'png', 'jpg', 'jpeg'}


# Function for Optical Character Recognition
def ocr_image(img_path, kernel_size=1):
    """
    Perform OCR on an image to extract text.
    
    Args:
        img_path (str): Path to the image file
        kernel_size (int): Gaussian blur kernel size for noise reduction (default: 1)
        
    Returns:
        str: Extracted text from the image, or None if invalid image format
        
    Note:
        - Image is converted to grayscale
        - Gaussian blur is applied to reduce noise
        - Only png, jpg, jpeg formats are supported
    """
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
df = pd.DataFrame(columns=['Boss', 'IGN', 'Damage', 'Season'])

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
        #upload_time = os.path.getmtime(image_path)
        #upload_date = datetime.fromtimestamp(upload_time).date()

        # Create dataframe from this row
        row_df = pd.DataFrame([[boss, folder_name, damage, SEASON]], columns=['Boss', 'IGN', 'Damage', 'Season'])

        # Concatenate dataframes
        df = pd.concat([df, row_df], ignore_index=True)

# Group by Boss and IGN
grouped = df.groupby(['Boss', 'IGN'])

# Get max damage
max_dmg = grouped['Damage'].max().reset_index()

# Merge to get Season
merged = pd.merge(max_dmg, df[['Boss', 'IGN', 'Season']], on=['Boss', 'IGN'])

# Reorder columns
df = merged[['Boss', 'IGN', 'Damage', 'Season']]

# Drop duplicates
df = df.drop_duplicates()

print(df)

# Get unique Boss names
bosses = df['Boss'].unique()

# Initialize dictionary to store dataframes
boss_dfs = {}

for boss in bosses:

    # Filter rows only for this Boss
    boss_df = df[df['Boss'] == boss]

    # Add to dictionary with Boss name as key
    boss_dfs[boss] = boss_df

dmgCheckLA = boss_dfs['Living Abyss']
dmgCheckRVD = boss_dfs['Red Velvet Dragon']
#dmgCheckAoD = boss_dfs['Avatar of Destiny']

dmgCheckLA = dmgCheckLA[['IGN', 'Damage', 'Season']]
dmgCheckRVD = dmgCheckRVD[['IGN', 'Damage', 'Season']]
#dmgCheckAoD = dmgCheckAoD[['IGN', 'Damage', 'Season']]

# Locate export directory
if not os.path.exists('report'):
    os.mkdir('report')

# Export to CSV
dmgCheckLA.to_csv('report/dmgCheckLA.csv', index=False, header=False)
dmgCheckRVD.to_csv('report/dmgCheckRVD.csv', index=False, header=False)
#dmgCheckAoD.to_csv('report/dmgCheckAoD.csv', index=False, header=False)
