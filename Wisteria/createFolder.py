import os

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