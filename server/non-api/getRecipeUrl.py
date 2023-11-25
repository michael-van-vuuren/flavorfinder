import requests
import json
from bs4 import BeautifulSoup

links = []
f = open("../resources/wikipedia-recipe-links.json", "w")
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
            links.append(page.a['href'])

    # continue recursively parsing for subcategories
    for category in subcategories:
        category_link = category.a['href']
        parse_category(category_link)
    
def main():
    parse_category('wiki/Category:Recipes_by_ingredient') # recursively parse main recipe page
    f.write(json.dumps(links))
    f.close()

main()