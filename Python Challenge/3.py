"""
Inpsect page source, or scrape/download html
Copy comment block, save to 3.txt
"""

t = open("3.txt", "r").read()
sol = ""
last = True

def cipher(t, sol, last):
    for x in t:
        if x == "\n":
            continue
        if len(sol) in [0,1,2,4,5,6]:
            if x.islower():
                sol = ""
                last = True
            elif last:
                sol += x
        elif len(sol) == 3:     
            if x.islower():
                sol += x
            else:
                sol = ""
                last = False
        elif len(sol) == 7:
            if x.islower():
                print(sol[3])
                sol = ""
            else:
                sol = ""
    print(sol)
cipher(t, sol, last)
