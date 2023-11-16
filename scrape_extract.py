import sys
import requests
from bs4 import BeautifulSoup
from rake_nltk import Rake

def extract_news_content(soup):
    article_elements = soup.find_all('article')
    news_content = '\n'.join([article.get_text(separator='\n', strip=True) for article in article_elements])  
    return news_content

def scrape_website(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        news_content = extract_news_content(soup)
        return news_content

    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to fetch the page. {e}")
        return ""

def extract_keywords(text_content):
    r = Rake()
    r.extract_keywords_from_text(text_content)
    keywords = r.get_ranked_phrases()
    return keywords

if __name__ == "__main__":
    # Check if a URL is provided as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python scraper.py <url>")
        sys.exit(1)

    # Get the URL from the command-line argument
    url = sys.argv[1]

    # Use the web scraper to extract news content
    news_content = scrape_website(url)

    # Use RAKE to extract keywords from the news content
    keywords = extract_keywords(news_content)

    # Print or use keywords as needed
    print("Keywords:")
    for keyword in keywords:
        print(keyword)
