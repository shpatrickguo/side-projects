"""
extractDmgCheckChat.py - Discord Chat Export Processor

This script processes exported Discord chat logs (HTML format) to extract
damage screenshots and metadata from messages with specific reactions.

Usage:
    1. Export Discord chat to dmgCheckChat.html
    2. Run: python extractDmgCheckChat.py
    3. Check output in data/dmgCheckChat.csv

Requirements:
    - BeautifulSoup4 for HTML parsing
    - Discord chat export in HTML format
"""

from bs4 import BeautifulSoup
import pandas as pd

with open('dmgCheckChat.html') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Find message with the reaction
reactions = soup.find_all('div', {'class': 'chatlog__reaction',
                                  'title': 'Lumi_verified_check'})

messages = []
dfs = []

for reaction in reactions:

    msg = reaction.find_parent('div', 'chatlog__message-primary')

    username = msg.find('span', {'class':'chatlog__author'}).text
    timestamp = msg.find('span', {'class':'chatlog__timestamp'}).text

    images = [img['src'] for img in msg.find_all('img', {'class': 'chatlog__attachment-media'})]

    # Create dataframe for this row
    row_df = pd.DataFrame([[username, timestamp, images]])

    # Append to list
    dfs.append(row_df)

# Concatenate all dataframes
df = pd.concat(dfs, ignore_index=True)

# Export to CSV
df.to_csv('data/dmgCheckChat.csv', index=False)
