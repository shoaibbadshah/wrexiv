import os
import requests


class SocialSearcherAPI:
    def __init__(self):
        self.api_key = os.getenv("SOCIAL_SEARCHER_API_KEY")
        self.base_url = "https://api.social-searcher.com/v2/users"

    def search_users(self, name, network):
        """
        Search for social profiles by user name or surname.

        :param name: Name of the user.
        :param network: Social network to search on.
        :return: JSON response with search results.
        """
        # response = requests.get(
        #     "https://api.social-searcher.com/v2/search?q=Obama&network=web&key=8f3e5564efa975b1628133191d8981f4"
        # )
        response = requests.get(
            "https://api.social-searcher.com/v2/users?q=tom&network=facebook&key=8f3e5564efa975b1628133191d8981f4"
        )
        print(response.json())
        # params = {"key": self.api_key, "q": "John Smith", "network": "linkedin"}
        # response = requests.get(self.base_url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            return {
                "error": "Failed to fetch data",
                "status_code": response.status_code,
            }
