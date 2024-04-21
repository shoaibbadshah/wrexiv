PROJECT_ID = globaltalentdb
REGION = asia-northeast1
DOCKER_PKG_PATH = $(REGION)-docker.pkg.dev
IMAGE_NAME = $(DOCKER_PKG_PATH)/$(PROJECT_ID)/$(PROJECT_ID)/$(PROJECT_ID)-api
DOCKER_FILE_PATH = ./docker/deploy/Dockerfile
SERVICE_NAME = globaltalentdb-api
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
	docker buildx build --platform linux/amd64 -t $(IMAGE_NAME) -f $(DOCKER_FILE_PATH) .

push-docker-image:
	docker push $(IMAGE_NAME)

deploy-to-gcloud:
	gcloud run deploy $(SERVICE_NAME) --image $(IMAGE_NAME) --platform managed --region $(REGION) --allow-unauthenticated

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
