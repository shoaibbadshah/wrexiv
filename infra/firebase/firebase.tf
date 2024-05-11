terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
}

variable "bucket_name" {
  description = "The name of the Cloud Storage bucket."
  type        = string
}

variable "project_id" {
  description = "The project ID of the Firebase project."
  type        = string
}

variable "location" {
  description = "The location of the Cloud Storage bucket."
  type        = string
}

# Provision a non-default Cloud Storage bucket.
resource "google_storage_bucket" "bucket" {
  provider = google-beta
  project  = var.project_id
  name     = var.bucket_name
  location = var.location
}

# Make the Storage bucket accessible for Firebase SDKs, authentication, and Firebase Security Rules.
resource "google_firebase_storage_bucket" "storage" {
  provider  = google-beta
  project   = var.project_id
  bucket_id = google_storage_bucket.bucket.name
}

resource "google_firebaserules_ruleset" "storage" {
  provider = google-beta
  project  = var.project_id

  source {
    files {
      name    = "storage.rules"
      content = file("storage.rules")
    }
  }

  depends_on = [
    google_firebase_storage_bucket.storage
  ]
}

resource "google_firebaserules_release" "storage" {
  provider     = google-beta
  name         = "firebase.storage/${google_storage_bucket.bucket.name}"
  ruleset_name = "projects/${var.project_id}/rulesets/${google_firebaserules_ruleset.storage.name}"
  project      = var.project_id

  depends_on = [
    google_firebase_storage_bucket.storage,
  ]

  lifecycle {
    replace_triggered_by = [
      google_firebaserules_ruleset.storage
    ]
  }
}

output "storage_bucket_name" {
  value       = google_storage_bucket.bucket.name
  description = "The name of the Cloud Storage bucket."
}

output "ruleset_name" {
  value       = google_firebaserules_ruleset.storage.name
  description = "The name of the Firebase Ruleset."
}

output "release_name" {
  value       = google_firebaserules_release.storage.name
  description = "The name of the Firebase Ruleset release."
}

output "ruleset_content" {
  value       = google_firebaserules_ruleset.storage.source.0.files.0.content
  description = "The content of the Firebase Ruleset."
}
