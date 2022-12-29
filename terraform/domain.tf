data "cloudflare_zone" "alanendev" {
  name = "alanen.dev"
}

resource "aws_acm_certificate" "alanendev" {
  provider          = aws.acm
  domain_name       = var.domain_name
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_record" "validation" {
  count   = length(aws_acm_certificate.alanendev.domain_validation_options)
  zone_id = data.cloudflare_zone.alanendev.id
  name    = tolist(aws_acm_certificate.alanendev.domain_validation_options)[count.index].resource_record_name
  value   = trimsuffix(tolist(aws_acm_certificate.alanendev.domain_validation_options)[count.index].resource_record_value, ".")
  type    = tolist(aws_acm_certificate.alanendev.domain_validation_options)[count.index].resource_record_type
  ttl     = 1
  proxied = false

  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "acm_validation" {
  provider                = aws.acm
  certificate_arn         = aws_acm_certificate.alanendev.arn
  validation_record_fqdns = cloudflare_record.validation[*].hostname
}

resource "cloudflare_record" "makkarroo" {
  zone_id = data.cloudflare_zone.alanendev.id
  name    = "makkarroo"
  value   = aws_cloudfront_distribution.app.domain_name
  type    = "CNAME"
  proxied = false
}
