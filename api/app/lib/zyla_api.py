import requests


class ZylaAPI:
    def __init__(self):
        self.base_url = (
            "https://zylalabs.com/api/958/social+media+profile+searcher+api/3712/search"
        )
        access_key = "3514|hQRtBuYc2z5RwTIm0iOvD6BbnjMENVdRTmiHCSfb"
        self.headers = {"Authorization": f"Bearer {access_key}"}

    def search_profiles(self, handle):
        """
        Search for a social media profile using the provided handle.

        :param handle: The social media handle to search for.
        :return: A dictionary containing the API response.
        """
        params = {"handle": handle}
        response = requests.get(self.base_url, headers=self.headers, params=params)

        if response.status_code == 200:
            try:
                return response.json()
            except ValueError:
                return {"error": "Failed to parse response"}
        else:
            return {
                "error": f"API request failed with status code {response.status_code}",
                "message": response.text,
            }
