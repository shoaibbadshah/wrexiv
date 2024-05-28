resource "google_compute_global_address" "service_range" {
  name          = "address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.backend_network.id
}

resource "google_service_networking_connection" "private_service_connection" {
  network                 = google_compute_network.backend_network.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.service_range.name]
}

resource "google_redis_instance" "celery_broker" {
  name           = "celery-broker"
  tier           = "BASIC"
  memory_size_gb = 1

  location_id = "asia-northeast1-a"

  authorized_network = google_compute_network.backend_network.id
  connect_mode       = "PRIVATE_SERVICE_ACCESS"

  redis_version = "REDIS_7_0"

  depends_on = [google_service_networking_connection.private_service_connection]

  auth_enabled = true

  lifecycle {
    prevent_destroy = false
  }
}
