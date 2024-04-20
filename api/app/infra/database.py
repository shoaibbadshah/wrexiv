import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import logging

db = SQLAlchemy()


def init_app(app):
    flask_env = os.getenv("APP_ENV", "development")

    if flask_env == "production":
        # 本番環境の設定
        db_user = os.getenv("DB_USER")
        db_pass = os.getenv("DB_PASSWORD")
        db_name = os.getenv("DB_NAME")
        connection_name = os.getenv("INSTANCE_CONNECTION_NAME")
        socket_path = f"/cloudsql/{connection_name}"
        database_url = (
            f"postgresql+psycopg2://{db_user}:{db_pass}@/{db_name}?host={socket_path}"
        )
    else:
        database_url = "postgresql://app_user:password@db/app_db"
        logging.info("Connecting to local DB")

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    Migrate(app, db)
    db.init_app(app)
