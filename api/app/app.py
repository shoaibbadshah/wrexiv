from app.config.sentry import setup_sentry
from app.infra.database import init_app
from flask import Flask
from flask_graphql import GraphQLView
from app.graphql.schema import schema
from app.config.auth import setup_auth
from app.config.cors import setup_cors
from app.config.logging import setup_logging

app = Flask(__name__)
init_app(app)

setup_logging(app)
setup_cors(app)
setup_auth(app)
setup_sentry()

app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
