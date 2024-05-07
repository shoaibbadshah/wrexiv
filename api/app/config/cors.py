from flask_cors import CORS


def setup_cors(app):
    CORS(
        app,
        resources={
            r"/upload_documents": {
                "origins": [
                    "http://localhost:3000",
                    "https://globaltalentdb.com",
                    "https://www.globaltalentdb.com",
                ]
            },
            r"/graphql/*": {
                "origins": [
                    "http://localhost:3000",
                    "https://globaltalentdb.com",
                    "https://www.globaltalentdb.com",
                ]
            },
            r"/chain/*": {
                "origins": [
                    "http://localhost:3000",
                    "https://globaltalentdb.com",
                    "https://www.globaltalentdb.com",
                ]
            },
        },
    )
