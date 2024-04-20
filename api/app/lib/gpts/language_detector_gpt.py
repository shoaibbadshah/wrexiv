from app.constants.gpt_functions import DETECT_LANGUAGES_FROM_COUNTRIES_FUNCTION_V3
from app.constants.prompts import DETECT_LANGUAGES_FROM_COUNTRIES_PROMPT
from openai import OpenAI
import json


class LanguageDetectorGPT:
    def __init__(self):
        self.client = OpenAI()

    def detect_languages_from_countries(self, countries):
        response = self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {
                    "role": "system",
                    "content": DETECT_LANGUAGES_FROM_COUNTRIES_PROMPT,
                },
                {
                    "role": "user",
                    "content": ", ".join(countries),
                },
            ],
            functions=[DETECT_LANGUAGES_FROM_COUNTRIES_FUNCTION_V3],
            function_call="auto",
        )
        function_arguments = json.loads(
            response.choices[0].message.function_call.arguments
        )
        print("----function_arguments----")
        print(function_arguments)
        print("----function_arguments----")
        return function_arguments["languages"]
