variable "region" {
  type        = string
  description = "AWS Region"
  default     = "ap-northeast-2"
}

variable "ses_region" {
  type        = string
  description = "AWS Region for SES"
  default     = "us-east-1"
}

variable "stage" {
  type    = string
  default = "prod"
}

variable "key_name" {
  type = string
  default = "${loacl.namespace}-${local.stage}-server"
  
}




