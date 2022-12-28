data "cloudflare_zone" "alanendev" {
  name = "alanen.dev"
}

resource "aws_apprunner_custom_domain_association" "makkarroo" {
  domain_name          = "makkarroo.alanen.dev"
  service_arn          = aws_apprunner_service.makkarroo.arn
  enable_www_subdomain = false
}

resource "cloudflare_record" "makkarroo_certificate_validation" {
  count   = length(aws_apprunner_custom_domain_association.makkarroo.certificate_validation_records)
  zone_id = data.cloudflare_zone.alanendev.id
  name    = tolist(aws_apprunner_custom_domain_association.makkarroo.certificate_validation_records)[count.index].name
  value   = tolist(aws_apprunner_custom_domain_association.makkarroo.certificate_validation_records)[count.index].value
  type    = tolist(aws_apprunner_custom_domain_association.makkarroo.certificate_validation_records)[count.index].type
  proxied = true
}

resource "cloudflare_record" "makkarroo" {
  zone_id = data.cloudflare_zone.alanendev.id
  name    = "makkarroo"
  value   = aws_apprunner_custom_domain_association.makkarroo.dns_target
  type    = "CNAME"
  proxied = true
}
