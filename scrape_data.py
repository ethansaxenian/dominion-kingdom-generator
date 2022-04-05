import requests
from bs4 import BeautifulSoup
import json
from urllib import request

URL = "http://wiki.dominionstrategy.com/index.php/List_of_cards"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

cards = []

table_rows = soup.find_all("table", class_="wikitable sortable")[0].find_all("tr")

for row in table_rows[1:]:
  columns = row.find_all("td")
  name = columns[0].find_all("a")[0].find_all("span")[0].text
  expansion = columns[1].find_all("a")[0].text
  types = [word.strip() for word in columns[2].text.split("-")]
  images = columns[3].find_all("img")
  costs = [str(image).removeprefix("<img alt=").split('"')[1].lower().removesuffix("plus").removesuffix("star").removeprefix('$') for image in images]
  cost = { "coins": None, "potions": None, "debt": None }
  for item in costs:
    if item == "p":
      cost["potions"] = "p"
    elif item[-1] == "d":
      cost["debt"] = f"{item[:-1]}d"
    else:
      cost["coins"] = int(item)
  text = columns[4].text.lower().strip()
  img_tag = str(columns[0].find("img"))
  img = img_tag[img_tag.find("src") + 4: img_tag.find("width")].strip().strip('"')
  request.urlretrieve(f"http://wiki.dominionstrategy.com{img}", f"public/images/{name}.jpg")
  link_tag = str(columns[0].find_all("a")[0])
  link = link_tag[link_tag.find("href") + 5: link_tag.find("title")].strip().strip('"')
  cards.append({
    "name": name,
    "expansion": expansion,
    "types": types,
    "coins": cost["coins"],
    "potions": cost["potions"],
    "debt": cost["debt"],
    "text": text,
    "in_supply": "this is not in the supply" not in text and not "Heirloom" in types and not "Shelter" in types,
    "img": f"/images/{name}.jpg",
    "link": f"http://wiki.dominionstrategy.com{link}"
  })

with open("./src/data/dominion_cards.json", "w") as file:
  file.write(json.dumps(cards, indent=2))
