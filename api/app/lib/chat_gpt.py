from openai import OpenAI
from app.constants.gpt_functions import COVER_LETTER_EXTRACTION
import json
import logging
from app.utilities.validation_utilities import validate_email

class ChatGpt:
    def __init__(self):
        self.client = OpenAI()

    def document_text_to_json(self, document_text: str):
        prompt = """
I extracted text from a document. Please extract job seeker's information from the text.

Here is the extracted text:

    """ + document_text
        
        response = self.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": [
                        {
                            "type": "text", 
                            "text": "You are a system to extract job seekers information from a document." \
                                    + "Don't make any assumptions about the text. Set the parameters to null if the information is not available."
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt,
                        },
                    ]
                },
            ],
            tools=COVER_LETTER_EXTRACTION,
            tool_choice={"type": "function", "function": {"name": "cover_letter_extraction"}},
        )
        
        try:
            json_data = json.loads(response.choices[0].message.tool_calls[0].function.arguments)

            # For every value in the JSON, if the value is a "null" string, set it to None
            for key, value in json_data.items():
                if value == "null":
                    json_data[key] = None
            
            # Validate email
            if json_data.get("email") is not None:
                if not validate_email(json_data.get("email")):
                    json_data["email"] = None
            
            return json_data
        except Exception as e:
            logging.error(f"Unexpected error while parsing JSON from GPT-4: {e}")
            return json.loads("{}")

    def document_image_to_json(self, document_image_url: str):
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system", 
                    "content": [
                        {
                            "type": "text", 
                            "text": "You are a system to extract job seekers information from an image." \
                                    + "Don't make any assumptions about the text. Set the parameters to null if the information is not available."
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Please extract job seeker's information from the image."},
                        {
                        "type": "image_url",
                        "image_url": {
                            "url": document_image_url,
                        },
                        },
                    ],
                }
            ],
            tools=COVER_LETTER_EXTRACTION,
            tool_choice={"type": "function", "function": {"name": "cover_letter_extraction"}},
        )

        try:
            json_data = json.loads(response.choices[0].message.tool_calls[0].function.arguments)
            return json_data
        except Exception as e:
            logging.error(f"Unexpected error while parsing JSON from GPT-4: {e}")
            return json.loads("{}")