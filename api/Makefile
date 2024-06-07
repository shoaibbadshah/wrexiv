PROJECT_ID = globaltalentdb
REGION = asia-northeast1
DOCKER_PKG_PATH = $(REGION)-docker.pkg.dev
API_IMAGE_NAME = $(DOCKER_PKG_PATH)/$(PROJECT_ID)/$(PROJECT_ID)/$(PROJECT_ID)-api
CELERY_IMAGE_NAME = $(DOCKER_PKG_PATH)/$(PROJECT_ID)/$(PROJECT_ID)/$(PROJECT_ID)-celery
API_DOCKER_FILE_PATH = ./docker/deploy/Dockerfile-api
CELERY_DOCKER_FILE_PATH = ./docker/deploy/Dockerfile-celery
API_SERVICE_NAME = globaltalentdb-api
CELERY_SERVICE_NAME = globaltalentdb-celery
DB_VOLUME_NAME = globaltalentdb-db
DB_SERVICE_NAME = db
DB_USER = app_user
DB_HOST = db
DB_NAME = app_db

login:
	gcloud auth login

configure-docker:
	gcloud auth configure-docker $(DOCKER_PKG_PATH)

set-project:
	gcloud config set project $(PROJECT_ID)

build-docker-image:
	docker buildx build --platform linux/amd64 -t $(API_IMAGE_NAME) -f $(API_DOCKER_FILE_PATH) .
	docker buildx build --platform linux/amd64 -t $(CELERY_IMAGE_NAME) -f $(CELERY_DOCKER_FILE_PATH) .

push-docker-image:
	docker push $(API_IMAGE_NAME)
	docker push $(CELERY_IMAGE_NAME)

deploy-to-gcloud:
	gcloud run deploy $(API_SERVICE_NAME) --image $(API_IMAGE_NAME) --platform managed --region $(REGION) --allow-unauthenticated

deploy-ready: login configure-docker set-project

deploy: build-docker-image push-docker-image deploy-to-gcloud

delete-db-volume:
	docker-compose down
	docker volume rm $(DB_VOLUME_NAME)

open-db:
	docker-compose run --rm $(DB_SERVICE_NAME) psql -U $(DB_USER) -h $(DB_HOST) -d $(DB_NAME)

open-production-db:
	gcloud sql connect globaltalentdb-db --user=postgres

show-migration-revisions:
	docker-compose run --rm $(DB_SERVICE_NAME) alembic -c migrations/alembic.ini history

run-test:
	docker-compose run api bash -c "export APP_ENV=testing && python -m pytest"
