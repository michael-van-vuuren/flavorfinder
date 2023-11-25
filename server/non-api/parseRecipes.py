import requests
import json
from bs4 import BeautifulSoup

links = set()
recipeToIngredients = {}

def parse_recipe_url(link):
    response = requests.get(
	    url=link,
    )
    soup = BeautifulSoup(response.content, 'html.parser')
    try:
        ingredients = soup.find("div", {"class" : "mw-content-ltr"}).ul.find_all("li")
        ingredientText = list(map(lambda x:x.text, ingredients))
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