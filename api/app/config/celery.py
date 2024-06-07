from celery import Celery, Task
from flask import Flask
import os

def setup_celery(app: Flask) -> Celery:
    redis_url = os.getenv("REDIS_URL", "redis://redis")
    app.config.from_mapping(
        CELERY=dict(
            broker_url=redis_url,
            result_backend=redis_url,
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
