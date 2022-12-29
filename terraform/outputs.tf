output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.app.domain_name
}
