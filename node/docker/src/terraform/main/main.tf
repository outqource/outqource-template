provider "aws" {
  region = var.region
}


locals {
  namespace             = "main"
  default_cidr          = "172.16.0.0/16"
stage= "dev"
}