from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    from app.config.database import init_app

    init_app(app, db)

    from app.config.sentry import setup_sentry
    from app.config.auth import setup_auth
    from app.config.cors import setup_cors
    from app.config.logging import setup_logging
    from app.config.celery import setup_celery

    setup_logging(app)
    setup_cors(app)
    setup_auth(app)
    setup_sentry()
    setup_celery(app)

    from app.graph.schema import schema
    from flask_graphql import GraphQLView

    from app.commands.seed_db import seed_db_command
    from app.commands.reset_db import reset_db_command

    app.cli.add_command(seed_db_command)
    app.cli.add_command(reset_db_command)

    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
    )

    return app
