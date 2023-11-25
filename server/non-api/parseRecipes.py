import requests
import json
from bs4 import BeautifulSoup

links = set()
recipeToIngredients = {}
unicode = {"\u00bd": "0.5", "\u00bc": "0.25", "\u2154": 2/3, "\u00e9":"e", "\u00a0": " ","\u00f3":"o"
,"\u00be": "0.75", "\u2153":1/3, "\u00b0":" degrees", "\u215c":"0.375", "\u2014": " ", "\u215b":"0.125",
"\u00f1": "n", "\u00e8":"e", "\u00ee":"i", "\u00fa":"u", "\u00f4": "o", "\u00e7":"c", "\u201d": " inch"
,"\u00fb": "u", "\u2159":1/6, "\u215d":0.625, "\u00e4":"a", "\u00ea":"e", "\u00ba":" degrees", "\u00d7":"x", "\u01b0":"u",
"\u1ebf": "e", "\u1edb":"o", "\u1eaf":"a", "\u00ed":"i", "\u2155":"0.2", "\u2013": "|"}

def parse_recipe_url(link):
    response = requests.get(
	    url=link,
    )
    soup = BeautifulSoup(response.content, 'html.parser')
    try:
        ingredients = soup.find("div", {"class" : "mw-content-ltr"}).ul.find_all("li")
        ingredientText = []
        for ingredient in ingredients:
            plaintext = ingredient.text
            for key, value in unicode.items():
                plaintext = plaintext.replace(key, str(value))
            ingredientText.append(plaintext)
        recipeToIngredients[link] = ingredientText
    except:
        print(link)

def parse_category(link):
    response = requests.get(
	    url='https://en.wikibooks.org/' + link,
    )
    soup = BeautifulSoup(response.content, 'html.parser')
    subcategories = soup.find_all("div", {"class" : "CategoryTreeItem"})
    if soup.find(id='mw-pages') is not None:
        subpages = soup.find(id='mw-pages').find_all("div", {"class" : "mw-category-group"}, recursive=True)
        # get all recipes pages in category
        for page in subpages:
            links.add('https://en.wikibooks.org/' + page.a['href'])

    # continue recursively parsing for subcategories
    for category in subcategories:
        category_link = category.a['href']
        parse_category(category_link)
    
def main():
    parse_category('wiki/Category:Recipes_by_ingredient') # recursively parse main recipe page
    f = open("../resources/wikipedia-recipe-links.json", "w")
    f.write(json.dumps(list(links))) # write all links
    f.close()

    for link in links:
        parse_recipe_url(link)
    f = open("../resources/recipe-to-ingredients.json", "w")
    f.write(json.dumps(dict(recipeToIngredients))) # write all links
    f.close()

main()