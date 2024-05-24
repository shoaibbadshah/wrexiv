# See versions at https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance#database_version
resource "google_sql_database_instance" "instance" {
  name             = "globaltalentdb-db"
  region           = "asia-northeast1"
  database_version = "POSTGRES_15"
  settings {
    tier = "db-g1-small"
  }

  deletion_protection = "true"
}


resource "google_sql_database" "database_deletion_policy" {
  name            = "globaltalentdb-db"
  instance        = google_sql_database_instance.instance.name
  deletion_policy = "ABANDON"
}
