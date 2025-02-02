resource "vercel_project" "globaltalentdb" {
  name            = "globaltalentdb"
  framework       = "nextjs"
  build_command   = "yarn build"
  team_id         = "team_cUUJOF5e58em9YTg9UnbzH1n"
  install_command = "yarn"
  git_repository = {
    type              = "github"
    repo              = "wrexiv/globaltalentdb"
    branch            = "main"
    production_branch = "main"
  }
  root_directory             = "frontend"
  serverless_function_region = "hnd1"
  environment = [
    {
      key    = "NEXT_PUBLIC_GRAPHQL_API_URL"
      value  = var.api_url
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_API_URL"
      value  = var.api_url
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID"
      value  = var.gtm_id
      target = ["production", "preview"]
    },
    {
      key    = "CONTENTFUL_SPACE_ID"
      value  = var.contentful_space_id
      target = ["production", "preview"]
    },
    {
      key    = "CONTENTFUL_ACCESS_TOKEN"
      value  = var.contentful_access_token
      target = ["production", "preview"]
    },
    {
      key    = "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN"
      value  = var.contentful_management_access_token
      target = ["production", "preview"]
    },
    {
      key    = "CONTENTFUL_ENVIRONMENT"
      value  = var.contentful_environment
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_MUI_PRO_LICENSE_KEY"
      value  = var.mui_pro_license_key
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
      value  = var.stripe_publishable_key
      target = ["production", "preview"]
    },
    {
      key    = "STRIPE_SECRET_KEY"
      value  = var.stripe_secret_key
      target = ["production", "preview"]
    }
  ]
}
