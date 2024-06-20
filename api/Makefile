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

SHELL = /bin/bash
.SHELLFLAGS := -euxo pipefail -c

check-docker:
	@docker -v || (echo "Docker is not installed. Please install Docker first." && exit 1)
	@docker ps || (echo "Docker is not running. Please start Docker first." && exit 1)

check-gcloud:
	@gcloud -v || (echo "Gcloud is not installed. Please install Gcloud first." && exit 1)

login:
	check-gcloud
	gcloud auth login

configure-docker:
	check-gcloud
	check-docker
	gcloud auth configure-docker $(DOCKER_PKG_PATH) || ( echo "Configure Docker $(DOCKER_PKG_PATH) failed" && exit 1; )

set-project:
	check-gcloud
	gcloud config set project $(PROJECT_ID) || ( echo "Set project $(PROJECT_ID) failed" && exit 1; )

build-docker-image:
	check-docker
	docker buildx build --platform linux/amd64 -t $(API_IMAGE_NAME) -f $(API_DOCKER_FILE_PATH) . || ( echo "Docker build $(API_IMAGE_NAME) failed" && exit 1; )
	docker buildx build --platform linux/amd64 -t $(CELERY_IMAGE_NAME) -f $(CELERY_DOCKER_FILE_PATH) . || ( echo "Docker build $(API_IMAGE_NAME) failed"; && exit 1; )

push-docker-image:
	check-docker
	docker push $(API_IMAGE_NAME) || ( echo "Docker push $(API_IMAGE_NAME) failed" && exit 1; )
	docker push $(CELERY_IMAGE_NAME) || ( echo "Docker push $(CELERY_IMAGE_NAME) failed" && exit 1; )

deploy-to-gcloud:
	check-gcloud
	gcloud run deploy $(API_SERVICE_NAME) --image $(API_IMAGE_NAME) --platform managed --region $(REGION) --allow-unauthenticated || ( echo "Deploy $(API_SERVICE_NAME) failed" && exit 1; )

deploy-ready: login configure-docker set-project

deploy: build-docker-image push-docker-image deploy-to-gcloud

delete-db-volume:
	docker-compose down
	docker volume rm $(DB_VOLUME_NAME)

open-db:
	docker-compose run --rm $(DB_SERVICE_NAME) psql -U $(DB_USER) -h $(DB_HOST) -d $(DB_NAME)

open-production-db:
	check-gcloud
	gcloud sql connect globaltalentdb-db --user=postgres

show-migration-revisions:
	docker-compose run --rm $(DB_SERVICE_NAME) alembic -c migrations/alembic.ini history

run-test:
	docker-compose run api bash -c "export APP_ENV=testing && python -m pytest"
