import requests
from bs4 import BeautifulSoup

def get_description(link):
    try:
        response = requests.get(link)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the content under class "mw-content-ltr mw-parser-output"
        description_tag = soup.find('div', class_='mw-content-ltr mw-parser-output')

        # Exclude spans with classname "w-editsection"
        if description_tag:
            for edit_section_span in description_tag.select('span.w-editsection'):
                edit_section_span.decompose()

        # Extract text from the tag
        description = description_tag.get_text() if description_tag else 'Description not available'

        return description.strip()  # Trim whitespace from the beginning and end
    except Exception as e:
        print(f'Error fetching description: {e}')
        return 'Description not available'

# Example usage:
recipe_link = 'https://en.wikibooks.org/wiki/Cookbook:Salat%C4%83_de_Boeuf'  # Replace with the actual link
recipe_description = get_description(recipe_link)
print('Recipe Description:', recipe_description)
