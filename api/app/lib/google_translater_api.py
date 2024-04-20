from google.cloud import translate_v2 as translate
import os


class GoogleTranslateAPI:
    def __init__(self):
        cred_path = os.path.join(
            # FIXME: Make this path nicer
            os.path.dirname(__file__),
            "../config/credentials.json",
        )
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
        self.client = translate.Client()

    def translate_text(self, target_language, text):
        if not text:
            raise ValueError("No text provided for translation")

        # The Translation API can detect the source language automatically
        result = self.client.translate(text, target_language=target_language)

        translated_text = result.get("translatedText")
        if not translated_text:
            raise Exception("Translation returned an empty response.")

        return translated_text


# Example usage
if __name__ == "__main__":
    translator = GoogleTranslateAPI()
    try:
        translated_text = translator.translate_text("fr", "Hello, world!")
        print(f"Translated text: {translated_text}")
    except Exception as e:
        print(f"Error: {e}")
