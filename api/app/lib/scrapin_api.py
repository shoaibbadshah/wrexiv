import os
import requests


class ScrapinAPI:
    def __init__(self):
        self.api_key = os.getenv("SCRAPIN_API_KEY")
        self.base_url = "https://api.scrapin.io/enrichment/profile"

    def fetch_profile_details(self, linkedin_url):
        params = {"apikey": self.api_key, "linkedinUrl": linkedin_url}
        response = requests.get(self.base_url, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            return None
            return {
                "error": "Failed to fetch profile details",
                "status_code": response.status_code,
            }
