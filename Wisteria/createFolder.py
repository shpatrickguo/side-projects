"""
createFolder.py - Guild Member Folder Creator

This utility creates individual folders for each guild member to organize
their damage screenshots.

Usage:
    1. Update the usernames list with current guild member names
    2. Run: python createFolder.py
    3. Folders will be created in the current directory

NOTE: Usernames are outdated
TODO: Connect with Google Sheets to get latest usernames
"""

import os

# NOTE usernames are outdated
# TODO: Connect with Google Sheets to get latest usernames

usernames = """
Acebites  
BigBoyChaddy
ChocoChipDinie
CrimZon
darkvioletfox
Gingerdoodles
Glutenburgh
jjoool
jtrimble3
JuicyJJ1
Karou8
mangozic
MarinKitagawa
MelonBunii
Minty24  
MochixIsland
Momomoses
Nickknack
Portallifesource
r2miss
RougeAether
SAIKA SAN
SALTMAMA
Steveth
V1b1ingFlash
valertine
Windsweep
xChocobo
Zane0930
"""

username_list = usernames.split("\n")
username_list = list(filter(None, username_list))


for username in username_list:
    # Create folder for this user
    if not os.path.exists(username):
        os.mkdir(username)
    print(f"Created folder for {username}")