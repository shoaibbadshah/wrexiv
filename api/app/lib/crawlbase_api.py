import os
import requests
import logging

logger = logging.getLogger(__name__)


class CrawlbaseAPI:
    def __init__(self):
        self.api_key = os.getenv("CRAWLBASE_API_KEY")
        self.base_url = "https://api.crawlbase.com/leads"

    def fetch_company_emails(self, domain):
        url = f"{self.base_url}?token={self.api_key}&domain={domain}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            return data
        except requests.RequestException as e:
            logger.error(f"Failed to crawlbase request: {e}")
            return f"Failed to fetch company emails from Crawlbase for domain {domain}"
