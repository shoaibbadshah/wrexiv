from openai import OpenAI
from app.constants.gpt_functions import COVER_LETTER_EXTRACTION
from flask import abort
import json
import logging

client = OpenAI()

def document_text_to_json(document_text: str):
    prompt = """
I extracted text from a document. Please extract job seekers information from the text.

Here is the extracted text:

""" + document_text
    
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{
            "role": "system", 
            "content": [
                {
                    "type": "text", 
                    "text": "You are a system to extract job seekers information from the document." \
                            + "Don't make any assumptions about the text. Set the parameters to null if the information is not available."
                }
            ]},
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
        return json_data
    except Exception as e:
        logging.error(f"Unexpected error while parsing JSON from GPT-4: {e}")
        return json.loads("{}")
