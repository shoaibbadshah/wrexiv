from app.config.sentry import setup_sentry
from app.models.assistant_chat_thread import AssistantChatThread
from app.infra.database import init_app
from flask import Flask
from flask_graphql import GraphQLView
from app.graphql.schema import schema
from app.config.auth import setup_auth
from app.config.cors import setup_cors
from app.config.logging import setup_logging
from flask import Flask, request
from app.lib.chat_gpt import ChatGPT
from app.parameters.chat_gpt_parameter import ChatGptParameter
from flask import g
from sqlalchemy.orm import joinedload

app = Flask(__name__)
init_app(app)

setup_logging(app)
setup_cors(app)
setup_auth(app)
setup_sentry()

app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)

chat_gpt = ChatGPT()


@app.route("/chain", methods=["POST"])
def chain_route():

    parameter = ChatGptParameter(request.get_json())

    # 本当は認証しなきゃいけないが、Frontend から認証情報が渡ってきていない
    thread = (
        AssistantChatThread.query.options(joinedload(AssistantChatThread.messages))
        .filter_by(id=parameter.thread_id)
        .one()
    )

    return chat_gpt.generate(parameter.attributes(), thread), {
        "Content-Type": "text/plain"
    }


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
