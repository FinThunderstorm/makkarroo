terraform {
  required_version = ">= 1.0.11"
  backend "s3" {
    bucket         = "makkarroo-terraform-state"
    key            = "makkarroo-ci.tfstate"
    region         = "eu-north-1"
    encrypt        = true
    dynamodb_table = "makkarroo-terraform-locks"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.48.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "cloudflare" {
}

resource "aws_ecr_repository" "repository" {
  name                 = var.registry_name
  image_tag_mutability = "MUTABLE"
  tags = {
    Name = var.registry_name
  }

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_apprunner_auto_scaling_configuration_version" "makkarroo" {
  auto_scaling_configuration_name = "makkarroo-autoscaling"

  max_concurrency = 200
  max_size        = 1
  min_size        = 1

  tags = {
    Name = "makkarroo-autoscaling"
  }
}

resource "aws_apprunner_service" "makkarroo" {
  depends_on                     = [time_sleep.waitrolecreate]
  auto_scaling_configuration_arn = aws_apprunner_auto_scaling_configuration_version.makkarroo.arn

  service_name = "makkarroo-app-runner"

  source_configuration {
    image_repository {
      image_configuration {
        port = "3000"
      }

      image_identifier      = "${aws_ecr_repository.repository.repository_url}:latest"
      image_repository_type = "ECR"

    }
    authentication_configuration {
      access_role_arn = aws_iam_role.role.arn
    }
    auto_deployments_enabled = true


  }
  health_check_configuration {
    healthy_threshold   = 1
    interval            = 10
    path                = "/"
    protocol            = "TCP"
    timeout             = 5
    unhealthy_threshold = 5
  }

  tags = {
    Name = "makkarroo-app-runner"
  }
}
