import requests
import os
from urllib.parse import urlencode


class ExtractorAPI:
    def __init__(self):
        self.base_url = "https://extractorapi.com/api/v1"
        self.api_key = os.getenv("EXTRACTOR_API_KEY")

    def fetch_extractor_data(self, target_url):
        params = {"apikey": self.api_key, "url": target_url}
        fetch_url = f"{self.base_url}/extractor/?{urlencode(params)}"
        response = requests.get(fetch_url)

        if response.status_code != 200:
            response.raise_for_status()

        result = response.json()

        title = result.get("title")
        text = result.get("text")
        authors = result.get("author")
        published_date = result.get("date_published")
        images = result.get("images")

        if title is None or text is None:
            raise ValueError("Title or text is missing from the response")

        return {
            "title": title,
            "text": text,
            "authors": authors,
            "published_date": published_date,
            "images": images,
        }

    def search_extractor_data(self, search_term):
        params = {"apikey": self.api_key, "search_term": search_term}
        search_url = f"{self.base_url}/search/?{urlencode(params)}"
        response = requests.get(search_url)

        if response.status_code != 200:
            response.raise_for_status()

        return response.content
