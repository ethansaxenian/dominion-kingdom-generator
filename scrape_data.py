import requests
from bs4 import BeautifulSoup
import json

URL = "http://wiki.dominionstrategy.com/index.php/List_of_cards"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

cards = []

table_rows = soup.find_all("table", class_="wikitable sortable")[0].find_all("tr")
for row in table_rows[1:]:
    columns = row.find_all("td")
    name = columns[0].find_all("a")[0].find_all("span")[0].text.lower()
    expansion = columns[1].find_all("a")[0].text.lower()
    types = [word.strip().lower() for word in columns[2].text.split("-")]
    images = columns[3].find_all("img")
    costs = [str(image).removeprefix("<img alt=").split('"')[1].lower().removesuffix("plus").removesuffix("star").removeprefix('$') for image in images]
    cost = None if not costs else { "coins": None, "potions": None, "debt": None }
    for item in costs:
        if item == "p":
            cost["potions"] = 1
        elif item[-1] == "d":
            cost["debt"] = int(item[:-1])
        else:
            cost["coins"] = int(item)
    text = columns[4].text.lower().strip()
    img_tag = str(columns[0].find("img"))
    img = img_tag[img_tag.find("src") + 4: img_tag.find("width")].strip().strip('"')
    cards.append({
        "name": name,
        "expansion": expansion,
        "types": types,
        "cost": cost,
        "text": text,
        "in_supply": "this is not in the supply" not in text,
        "img": f"http://wiki.dominionstrategy.com{img}"
    })

with open("./data/dominion_cards.json", "w") as file:
    file.write(json.dumps(cards, indent=2))
