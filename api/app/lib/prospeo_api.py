import os
import requests
import logging

logger = logging.getLogger(__name__)


class ProspeoAPI:
    def __init__(self):
        self.api_key = os.getenv("PROSPEO_API_KEY")
        self.base_url = "https://api.prospeo.io/domain-search"

    def find_emails_by_domain(
        self,
        domain,
    ):
        payload = {"company": domain, "limit": 50, "company_enrichment": True}
        headers = {"Content-Type": "application/json", "X-KEY": self.api_key}

        try:
            response = requests.post(self.base_url, json=payload, headers=headers)
            if response.status_code == 200:
                return response.json()["response"]
            else:
                logger.error(
                    f"Error fetching emails: {response.status_code} {response.text}"
                )
                return f"Failed to fetch emails from Prospeo for domain {domain}"
        except requests.RequestException as e:
            logger.error(f"Failed to Prospeo request: {e}")
            return f"Failed to communicate with Prospeo API for domain {domain}"
