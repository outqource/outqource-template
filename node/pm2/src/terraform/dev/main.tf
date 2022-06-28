provider "aws" {
  region = "ap-northeast-2"
  
}


module "main" {
    source = "../main"
    region = "ap-northeast-2"
    stage = "dev"

}
