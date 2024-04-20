import os
import requests


class PreviewData:
    def __init__(self, title, description, image, url):
        self.title = title
        self.description = description
        self.image = image
        self.url = url


class LinkPreview:
    def __init__(self):
        self.api_key = os.getenv("LINK_PREVIEW_API_KEY")
        self.link_preview_api = "http://api.linkpreview.net"

    def get_image_preview(self, target_url):
        params = {
            "key": self.api_key,
            "q": target_url,
        }
        response = requests.get(self.link_preview_api, params=params)
        # response.raise_for_status()  # ステータスコードが200でない場合、例外を発生させる

        data = response.json()
        preview_data = PreviewData(
            title=data.get("title"),
            description=data.get("description"),
            image=data.get("image"),
            url=data.get("url"),
        )

        if preview_data.image:
            return preview_data.image
        else:
            return None

    def get_preview_data(self, target_url):
        params = {
            "key": self.api_key,
            "q": target_url,
        }
        response = requests.get(self.link_preview_api, params=params)
        # response.raise_for_status()  # ステータスコードが200でない場合、例外を発生させる

        if response.json().get("error"):
            return None

        data = response.json()
        preview_data = PreviewData(
            title=data.get("title"),
            description=data.get("description"),
            image=data.get("image"),
            url=data.get("url"),
        )

        return preview_data
