from app.constants.gpt_functions import EXTRACT_KEYWORDS_FROM_TEXT_FUNCTION
from app.constants.prompts import EXTRACT_KEYWORDS_FROM_TEXT_PROMPT
from openai import OpenAI
import json


class KeywordsExtractorGPT:
    def __init__(self):
        self.client = OpenAI()

    def pick_keyword_from_text(self, text, language):
        response = self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {
                    "role": "system",
                    "content": EXTRACT_KEYWORDS_FROM_TEXT_PROMPT,
                },
                {
                    "role": "user",
                    "content": f"2 keywords in ${language}",
                },
                {
                    "role": "user",
                    "content": text,
                },
            ],
            functions=[EXTRACT_KEYWORDS_FROM_TEXT_FUNCTION],
            function_call="auto",
        )
        function_arguments = json.loads(
            response.choices[0].message.function_call.arguments
        )
        print(function_arguments)
        return function_arguments
