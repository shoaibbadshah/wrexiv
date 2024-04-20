import string
from openai import OpenAI
import json


class SummarizeGPT:
    def __init__(self):
        self.client = OpenAI()

    def summarize(self, text: string, language):
        prompt = f"Summarize the text given by users in the language:{language}"
        response = self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                },
                {
                    "role": "user",
                    "content": text,
                },
            ],
            functions=[
                {
                    "name": "format_output",
                    "description": "所定のフォーマットで出力する",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "summary": {
                                "type": "string",
                                "description": "要約された文章",
                            }
                        },
                        "required": ["summary"],
                    },
                }
            ],
            function_call="auto",
        )
        function_arguments = json.loads(
            response.choices[0].message.function_call.arguments
        )
        return function_arguments["summary"]
