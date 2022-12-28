output "registry_id" {
  description = "The account ID of the registry holding the repository."
  value       = aws_ecr_repository.repository.registry_id
}

output "repository_name" {
  description = "The name of the repository."
  value       = aws_ecr_repository.repository.name
}

output "repository_url" {
  description = "The URL of the repository."
  value       = aws_ecr_repository.repository.repository_url
}

output "makkarroo_service_url_apprunner" {
  value = aws_apprunner_service.makkarroo.service_url
}

output "makkarroo_service_url" {
  value = aws_apprunner_custom_domain_association.makkarroo.domain_name
}