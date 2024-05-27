import re

def validate_url(document_url: str) -> dict:
    url_pattern = re.compile(
        r"^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$"
    )
    return bool(url_pattern.match(document_url))

def validate_email(email: str) -> bool:
    """
    Validate email address
    """
    # Source: https://emailregex.com/
    if re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email):
        return True
    return False