import os
from flask_migrate import Migrate
import logging


def init_app(app, db):
    flask_env = os.getenv("APP_ENV", "development")

    if flask_env == "production":
        db_user = os.getenv("DB_USER")
        db_pass = os.getenv("DB_PASSWORD")
        db_name = os.getenv("DB_NAME")
        connection_name = os.getenv("INSTANCE_CONNECTION_NAME")
        if connection_name:
            socket_path = f"/cloudsql/{connection_name}"
            database_url = (
                f"postgresql+psycopg2://{db_user}:{db_pass}@/{db_name}?host={socket_path}"
            )
        else:
            db_host = os.getenv("DB_HOST", "localhost")
            db_port = os.getenv("DB_PORT", "5432")
            database_url = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
    elif flask_env == "testing":
        database_url = "postgresql://app_user:password@db/app_db"
        logging.info("Connecting to test DB")
    else:
        database_url = "postgresql://app_user:password@db/app_db"
        logging.info("Connecting to local DB")

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    Migrate(app, db)
