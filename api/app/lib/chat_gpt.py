from app.constants.gpt_functions import FORMAT_MARKETING_ASSETS
from app.constants.prompts import CONTENT_GENERATION
from openai import OpenAI
import json


class ChatGPT:
    def __init__(self):
        self.client = OpenAI()

    def generate(self, params, thread):
        formatted_messages = [
            {"role": message.role, "content": message.content}
            for message in thread.messages
        ]

        for resp in self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=formatted_messages,
            stream=True,
        ):
            r = resp.choices[0]
            if r.finish_reason == "stop":
                break
            chunk = r.delta.content
            chunk = chunk.replace("\n", "<br />")
            yield f"{chunk}\n"

    def generate_content(self, text):
        response = self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {
                    "role": "system",
                    "content": CONTENT_GENERATION,
                },
                {
                    "role": "user",
                    "content": text,
                },
            ],
            functions=[FORMAT_MARKETING_ASSETS],
            function_call="auto",
        )
        function_arguments = json.loads(
            response.choices[0].message.function_call.arguments
        )
        return function_arguments["posts"]
