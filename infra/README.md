# GlobalTalentDB Infra

## Overview
### root directory
- `gcp.tf`: CloudRun configuration for the backend
- `vercel.tf`: Vercel configuration for the frontend

### firebase directory
- `firebase.tf`: Firebase configuration for storing the documents

### cloud_resources directory
- `provider.tf`: Provider configuration for the project
- `artifact_registry.tf`: Artifact Registry configuration for storing the docker images
- `cloud_sql.tf`: Cloud SQL configuration for the database

## How to deploy
1. Create a firebase storage bucket using the `firebase` directory
2. Create an artifact registry and cloud sql instance using the `cloud_resources` directory
4. Create a user for the cloud sql instance
```bash
gcloud sql users create app_user --instance=globaltalentdb-db --password=<password>
```
5. Create a database for the cloud sql instance
```bash
gcloud sql databases create app_db --instance=globaltalentdb-db
```
6. Create a cloud run instance and vercel instance using the root directory


## Connect to the database
```bash
gcloud sql connect globaltalentdb-db --user=app_user
```