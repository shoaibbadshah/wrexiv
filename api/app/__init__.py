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

    setup_logging(app)
    setup_cors(app)
    setup_auth(app)
    setup_sentry()

    from app.graph.schema import schema
    from flask_graphql import GraphQLView

    # FIXME: move this to a command file
    @app.cli.command("reset-db")
    def reset_db_command():
        with app.app_context():
            db.drop_all()
            db.create_all()
            print("Database has been reset.")

    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
    )

    return app
