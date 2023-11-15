import sys
import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    # Send an HTTP request to the provided URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all the links on the page
        links = soup.find_all('a')

        # Print the titles of the links
        for link in links:
            title = link.get('title')
            if title:
                print(title)
            else:
                print("No title found for the link.")

    else:
        print(f"Error: Unable to fetch the page. Status code {response.status_code}")

if __name__ == "__main__":
    # Check if a URL is provided as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python scraper.py <url>")
        sys.exit(1)

    # Get the URL from the command-line argument
    url = sys.argv[1]

    # Call the scrape_website function with the provided URL
    scrape_website(url)
