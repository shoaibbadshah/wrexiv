# resource "google_compute_network" "backend_network" {
#   name = "backend-network"
# }

# # Configure cloudrun static outbound ip
# # https://cloud.google.com/run/docs/configuring/static-outbound-ip
# resource "google_compute_subnetwork" "backend_subnetwork" {
#   provider      = google-beta
#   name          = "cr-static-ip"
#   ip_cidr_range = "10.124.0.0/28"
#   network       = google_compute_network.backend_network.id
#   region        = "asia-northeast1"
# }

# resource "google_project_service" "vpc" {
#   provider           = google-beta
#   service            = "vpcaccess.googleapis.com"
#   disable_on_destroy = true
# }

# resource "google_vpc_access_connector" "api" {
#   provider = google-beta
#   name     = "cr-conn"
#   region   = "asia-northeast1"

#   subnet {
#     name = google_compute_subnetwork.backend_subnetwork.name
#   }

#   depends_on = [
#     google_project_service.vpc
#   ]
# }

# resource "google_compute_router" "default" {
#   provider = google-beta
#   name     = "cr-static-ip-router"
#   network  = google_compute_network.backend_network.name
#   region   = google_compute_subnetwork.backend_subnetwork.region
# }

# resource "google_compute_address" "api" {
#   provider = google-beta
#   name     = "cr-static-ip-addr"
#   region   = google_compute_subnetwork.backend_subnetwork.region
# }

# resource "google_compute_router_nat" "api" {
#   provider = google-beta
#   name     = "cr-static-nat"
#   router   = google_compute_router.default.name
#   region   = google_compute_subnetwork.backend_subnetwork.region

#   nat_ip_allocate_option = "MANUAL_ONLY"
#   nat_ips                = [google_compute_address.api.self_link]

#   source_subnetwork_ip_ranges_to_nat = "LIST_OF_SUBNETWORKS"
#   subnetwork {
#     name                    = google_compute_subnetwork.backend_subnetwork.id
#     source_ip_ranges_to_nat = ["ALL_IP_RANGES"]
#   }
# }

# output "backend_api_nat_ip" {
#   value = google_compute_address.api.address
# }
