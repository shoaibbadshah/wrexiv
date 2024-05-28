terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

provider "google" {
  project = "globaltalentdb"
  region  = "asia-northeast1"
  zone    = "asia-northeast1-a"
}
