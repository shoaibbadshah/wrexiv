import os
from serpapi import GoogleSearch


class SerpApiSearch:
    def __init__(self):
        self.api_key = os.getenv("SERP_API_KEY")

    def execute_search(self, **kwargs):
        # Ensure the api_key is included in the search parameters
        search_params = {"api_key": self.api_key}

        # Update the search parameters with any provided keyword arguments
        search_params.update(kwargs)

        # Optionally set default parameters here, e.g., for news search
        search_params.setdefault("tbm", "nws")

        # Perform the search with the updated parameters
        search = GoogleSearch(search_params)
        result = search.get_dict()
        return result

    def google_search(self, **kwargs):
        search_params = {"api_key": self.api_key}
        search_params.update(kwargs)
        search = GoogleSearch(search_params)
        result = search.get_dict()
        return result
