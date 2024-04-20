import logging
from flask.logging import default_handler


def setup_logging(app):
    app.logger.removeHandler(default_handler)
    app.logger.setLevel(logging.DEBUG)
    logging.basicConfig(level=logging.DEBUG)
