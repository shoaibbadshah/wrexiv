COVER_LETTER_EXTRACTION = [
    {
        "type": "function",
        "function": {
            "name": "cover_letter_extraction",
            "description": "Extract job seekers information from cover letters.",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Job seeker's name",
                    },
                    "address": {
                        "type": "string",
                        "description": "Job seeker's address",
                    },
                    "email": {
                        "type": "string",
                        "description": "Job seeker's email",
                    },
                    "phone": {
                        "type": "string",
                        "description": "Job seeker's phone number",
                    },
                    "linkedin": {
                        "type": "string",
                        "description": "Job seeker's LinkedIn profile",
                    },
                    "website": {
                        "type": "string",
                        "description": "Job seeker's personal website",
                    },
                    "bio": {
                        "type": "string",
                        "description": "Job seeker's bio or summary written in the cover letter",
                    },
                },
                "required": ["name", "address", "email", "phone", "linkedin", "github", "website", "bio"],
            },
        }
    }
]