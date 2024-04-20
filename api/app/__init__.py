# app/__init__.py
from app.infra.database import db
from flask import Flask


def create_app():
    app = Flask(__name__)
    db.init_app(app)

    # ここでモデルをインポートする
    from models.tenant import Tenant
    from models.lead_request import LeadRequest

    return app
