from flask_cors import CORS


def setup_cors(app):
    CORS(
        app,
        resources={
            r"/graphql/*": {
                "origins": [
                    "http://localhost:3000",
                    "https://globaldeel.com",
                    "https://www.globaldeel.com",
                ]
            },
            r"/chain/*": {
                "origins": [
                    "http://localhost:3000",
                    "https://globaldeel.com",
                    "https://www.globaldeel.com",
                ]
            },
        },
    )
