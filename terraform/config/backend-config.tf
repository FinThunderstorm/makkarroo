bucket         = "makkarroo-terraform-state"
key            = "makkarroo-ci.tfstate"
region         = "eu-north-1"
encrypt        = true
dynamodb_table = "makkarroo-terraform-locks"