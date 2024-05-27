from celery import Celery, Task
from flask import Flask
import os

def setup_celery(app: Flask) -> Celery:
    flask_env = os.getenv("APP_ENV", "development")
    if flask_env == "production":
        redis_host = os.getenv("REDIS_HOST")
        redis_password = os.getenv("REDIS_PASSWORD")
        redis_url = f"redis://:{redis_password}@{redis_host}"
        app.config.from_mapping(
            CELERY=dict(
                broker_url=redis_url,
                result_backend=redis_url,
                task_ignore_result=True,
            ),
        )
    else:
        app.config.from_mapping(
            CELERY=dict(
                broker_url="redis://redis",
                result_backend="redis://redis",
                task_ignore_result=True,
            ),
        )
        
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)

    celery_app = Celery(app.name, task_cls=FlaskTask)
    celery_app.config_from_object(app.config["CELERY"])
    celery_app.set_default()
    app.extensions["celery"] = celery_app
    return celery_app
