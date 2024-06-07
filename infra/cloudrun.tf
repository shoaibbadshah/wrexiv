
# terraform import google_cloud_run_v2_service.api globaltalentdb/asia-northeast1/globaltalentdb-api
resource "google_cloud_run_v2_service" "api" {
  name           = "globaltalentdb-api"
  location       = "asia-northeast1"
  ingress        = "INGRESS_TRAFFIC_ALL"
  client         = "gcloud"
  client_version = "426.0.0"

  template {
    volumes {
      name = "cloudsql"

      cloud_sql_instance {
        instances = [var.instance_connection_name]
      }
    }
    containers {
      image = "asia-northeast1-docker.pkg.dev/globaltalentdb/globaltalentdb/globaltalentdb-api"
      volume_mounts {
        mount_path = "/cloudsql"
        name       = "cloudsql"
      }

      env {
        name  = "OPENAI_API_KEY"
        value = var.openai_api_key
      }
      env {
        name  = "DB_NAME"
        value = var.db_name
      }
      env {
        name  = "DB_PASSWORD"
        value = var.db_password
      }
      env {
        name  = "DB_USER"
        value = var.db_user
      }
      env {
        name  = "DB_PORT"
        value = 5432
      }
      env {
        name  = "INSTANCE_CONNECTION_NAME"
        value = "globaltalentdb:asia-northeast1:globaltalentdb-db"
      }
      env {
        name  = "INSTANCE_UNIX_SOCKET"
        value = "/cloudsql/globaltalentdb:asia-northeast1:globaltalentdb-db"
      }
      env {
        name  = "APP_ENV"
        value = "production"
      }
      env {
        name  = "GITHUB_PERSONAL_TOKEN"
        value = var.github_personal_token
      }
      env {
        name  = "FLASK_APP"
        value = "app"
      }
      env {
        name  = "FLASK_RUN_HOST"
        value = "0.0.0.0"
      }
      env {
        name  = "FLASK_DEBUG"
        value = "1"
      }
      env {
        name  = "SERP_API_KEY"
        value = var.serp_api_key
      }
      env {
        name  = "LINK_PREVIEW_API_KEY"
        value = var.link_preview_api_key
      }
      env {
        name  = "EXTRACTOR_API_KEY"
        value = var.extractor_api_key
      }
      env {
        name  = "SOCIAL_SEARCHER_API_KEY"
        value = var.social_searcher_api_key
      }
      env {
        name  = "SCRAPIN_API_KEY"
        value = var.scrapin_api_key
      }
      env {
        name  = "SCRAPIN_API_KEY_PERSONAL"
        value = var.scrapin_api_key_personal
      }
      env {
        name  = "CRAWLBASE_API_KEY"
        value = var.crawlbase_api_key
      }
      env {
        name  = "PROSPEO_API_KEY"
        value = var.prospeo_api_key
      }
      env {
        name  = "SENDGRID_API_KEY"
        value = var.sendgrid_api_key
      }
      env {
        name  = "APP_ENV"
        value = var.app_env
      }
      env {
        name  = "INSTANCE_CONNECTION_NAME"
        value = var.instance_connection_name
      }
      env {
        name  = "REDIS_URL"
        value = var.redis_url
      }
    }

    vpc_access {
      connector = google_vpc_access_connector.api.id
      egress    = "ALL_TRAFFIC"
    }
  }

  depends_on = [google_vpc_access_connector.api]
}


# Allow unauthenticated access to the service
data "google_iam_policy" "api" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "api" {
  location = google_cloud_run_v2_service.api.location
  project  = google_cloud_run_v2_service.api.project
  service  = google_cloud_run_v2_service.api.name

  policy_data = data.google_iam_policy.api.policy_data
}
