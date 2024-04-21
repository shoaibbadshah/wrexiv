import pytest
from app import create_app, db


# TODO: Setup a test database
@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://app_user:password@db/app_db"
    with app.app_context():
        yield app


@pytest.fixture(scope="function")
def client(app):
    return app.test_client()


@pytest.fixture(scope="function")
def database(app):
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()
