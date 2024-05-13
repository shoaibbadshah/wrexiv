from app import create_app


app = create_app()
celery = app.extensions["celery"]

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
