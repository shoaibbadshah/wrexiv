class ChatGptParameter:
    def __init__(self, data):
        self.scenario = data.get("scenario")
        self.prompt = data.get("prompt")
        self.thread_id = data.get("thread_id")

    def attributes(self):
        return {
            "scenario": self.scenario,
            "prompt": self.prompt,
            "thread_id": self.thread_id,
        }
