import sys
import requests
from bs4 import BeautifulSoup

def get_body_content_html(url):
    response = requests.get(url)
    html_content = response.text

    soup = BeautifulSoup(html_content, 'html.parser')
    # find div with class "mw-body-content"
    body_content_div = soup.find('div', class_='mw-body-content')

    if body_content_div:
        print(str(body_content_div))

    else:
        print('error: mw-body-content div not found')

# usage: python file.py url
url = sys.argv[1]

get_body_content_html(url)
