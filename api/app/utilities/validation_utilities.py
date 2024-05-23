import re

def validate_email(email: str) -> bool:
    """
    Validate email address
    """
    # Source: https://emailregex.com/
    return bool(re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email))