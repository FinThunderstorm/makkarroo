terraform {
  required_version = ">= 1.0.11"
  backend "s3" {}
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.48.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.1.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "makkarroo-vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
  instance_tenancy     = "default"

  tags = {
    Name = "makkarroo-vpc"
  }
}

resource "aws_subnet" "makkarroo-subnet-public-1" {
  vpc_id                  = aws_vpc.makkarroo-vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "eu-north-1a"
  tags = {
    Name = "makkarroo-subnet-public-1"
  }
}

resource "aws_internet_gateway" "makkarroo-igw" {
  vpc_id = aws_vpc.makkarroo-vpc.id
  tags = {
    Name = "makkarroo-igw"
  }
}

resource "aws_route_table" "makkarroo-public-crt" {
  vpc_id = aws_vpc.makkarroo-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.makkarroo-igw.id
  }

  tags = {
    Name = "makkarroo-public-crt"
  }
}

resource "aws_route_table_association" "makkarroo-crta-public-subnet-1" {
  subnet_id      = aws_subnet.makkarroo-subnet-public-1.id
  route_table_id = aws_route_table.makkarroo-public-crt.id
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

resource "aws_security_group" "makkarroo-sg" {
  vpc_id = aws_vpc.makkarroo-vpc.id

  ingress {
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    protocol    = "tcp"
    to_port     = 3000
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "makkarroo-sg"
  }
}

resource "aws_instance" "makkarroo_server" {
  ami           = "ami-0fd303abd14827300"
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.makkarroo-subnet-public-1.id

  vpc_security_group_ids = ["${aws_security_group.makkarroo-sg.id}"]

  tags = {
    Name = "MakkarrooServer"
  }
}

output "ec2instance" {
  value = aws_instance.makkarroo_server.public_ip
}