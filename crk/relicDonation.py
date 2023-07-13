from PIL import Image, ImageFilter, ImageEnhance
import cv2
import imghdr
import pandas as pd
import numpy as np 
import os, logging
import pytesseract  
import re
from datetime import datetime

# Set of allowed image formats
IMAGE_FORMATS = {'png', 'jpg', 'jpeg'} 

# Create empty dataframe 
df = pd.DataFrame(columns=['IGN', 'Relic Donation Points', 'Date'])

def slice_video_on_profile_change(video_path, output_folder, threshold=100):

    # Open video 
    cap = cv2.VideoCapture(video_path)

    # Keep previous frame to compare with
    prev_img = None 

    # Counter for sliced segment numbers
    seg_num = 0

    # Read video frames until end
    while cap.isOpened():

        # Read next frame
        ret, frame = cap.read()

        # Break out of loop if video ended
        if not ret:  
            break

        # Convert colored frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Compare current frame vs previous  
        # If difference bigger than threshold, profile changed
        if prev_img is None or np.mean(np.abs(gray - prev_img)) > threshold:

            # Save current frame as new profile  
            prev_img = gray.copy()

            # Increment segment counter
            seg_num += 1

            # Write sliced segment frame to file
            cv2.imwrite(f"{output_folder}/segment_{seg_num}.jpg", frame)

    # Release video resource  
    cap.release()


def ocr_image(image_path, kernel_size=1, contrast_factor=2):

    # Validate image file
    ext = os.path.splitext(image_path)[1].lower()
    if ext[1:] not in IMAGE_FORMATS and imghdr.what(image_path) not in IMAGE_FORMATS: 
        return None
    
    # Load image
    image = Image.open(image_path)

    # Convert to grayscale    
    gray = image.convert('L')
    # Increase contrast
    enhancer = ImageEnhance.Contrast(gray)
    contrast = enhancer.enhance(contrast_factor)
    
    # Apply gaussian blur to remove noise
    blur = contrast.filter(ImageFilter.GaussianBlur(radius=kernel_size))

    # Perform OCR
    text = pytesseract.image_to_string(blur)

    return text

slice_video_on_profile_change('Final.mov', 'relicDonations')

folder = 'relicDonations/'

for filename in os.listdir(folder):
    image_path = os.path.join(folder, filename)

    text = ocr_image(image_path)
    
    # Check if 'Relic' appears in OCR text
    if 'Relic' not in text:
        os.remove(image_path) 
        continue


# Loop through images
for filename in os.listdir(folder):

    # Full image path
    image_path = os.path.join(folder, filename)  

    # Extract data from image 
    text = ocr_image(image_path)
    
    username = re.search(r'([\w]+)(?=\n)', text).group(1)
    # Get last number
    points = text.split(" ")[-1]
    # Remove non-digits
    points = int(re.sub(r'[^\d]', '', points))
    date = datetime.fromtimestamp(os.path.getmtime(image_path)).date()

    # Create new row
    new_row = {
        'IGN': username,
        'Relic Donation Points': points,
        'Date': date,
        'File': image_path
    }
    # Append row to dataframe
    df = df.append(new_row, ignore_index=True)

    # Drop duplicates
    df = df.drop_duplicates()
    
# Export to CSV
df.to_csv('relicDonations.csv', index=False)