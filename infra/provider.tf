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