module "out" {
  source = "hashicorp/dir/template"

  base_dir = "${path.module}/../out"
}

resource "aws_s3_object" "static" {
  for_each = module.out.files

  key                    = each.key
  bucket                 = aws_s3_bucket.app.id
  source                 = each.value.source_path
  etag                   = each.value.digests.sha256
  content_type           = each.value.content_type
  content                = each.value.content
  server_side_encryption = "AES256"
}