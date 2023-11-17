import sys
import requests
from bs4 import BeautifulSoup
from rake_nltk import Rake
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import warnings

warnings.filterwarnings("ignore", category=pd.errors.DtypeWarning)

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

def write_keywords_to_file(keywords, output_file='keywords.txt'):
    with open(output_file, 'w', encoding='utf-8') as file:
        for keyword in keywords:
            file.write(keyword + '\n')

def recommend_movies(keywords, top_n=10):
    keywords_vector = tfidf_vectorizer.transform([keywords])

    _, movie_indices = knn_model.kneighbors(keywords_vector, n_neighbors=top_n)

    recommended_movies = data.iloc[movie_indices[0]]
    return recommended_movies

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

    # Write keywords to a file
    write_keywords_to_file(keywords)

    # Load movie data
    data = pd.read_csv('D:/New folder/movies_metadata.csv')
    data['overview'].fillna('', inplace=True)

    # Create TF-IDF matrix
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(data['overview'])

    # Create and fit the k-NN model
    knn_model = NearestNeighbors(metric='cosine', algorithm='brute')
    knn_model.fit(tfidf_matrix)

    # Run movie recommendation
    top_movies = recommend_movies(' '.join(keywords), top_n=15)
    print(top_movies[['title', 'overview']])
