input = "g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj."

"""
Hint:
K -> M
O -> Q
E -> G

From hint we see that this is a caesar cipher where each letter is shifted by two.

"""

# Approach 1
import string
# Get list of lower case of alphabet
alphabet = list(string.ascii_lowercase)

def caesar_cipher(input, shift):
    """
    input: str
    shift: int

    RETURN: str with letter shifted by ```shift``` letters 
    """
    output = ""
    # loop through input
    for letter in input:
        # Edge cases
        if letter == "y":
            letter = "a"
        elif letter == "z":
            letter = "b"
        # shift letter by two
        elif letter in alphabet:
            index = alphabet.index(letter) + shift
            letter = alphabet[index]
        # space or punctuation
        else:
            letter = letter
        output += letter
    return output

shift = 2
caesar_cipher(input, shift)

# Approach 2
intab = "abcdefghijklmnopqrstuvwxyz"
outtab = "cdefghijklmnopqrstuvwxyzab"
print(input.translate({ord(x): y for (x, y) in zip(intab, outtab)}))

# Solution
s = "map"
print(s.translate({ord(x): y for (x, y) in zip(intab, outtab)}))