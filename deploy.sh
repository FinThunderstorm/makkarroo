#!/usr/bin/env bash
set -o nounset -o errexit -o pipefail

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/scripts" && pwd )"

# shellcheck source=../../scripts/common-functions.sh
source "$script_dir/common-functions.sh"

dir="$repo/terraform"

function main {
  pushd "$dir"
  require_command terraform
  require_command docker
  require_command git

  echo ::group::Initialize Terraform
  terraform init -input=false
  echo ::endgroup::

  # Apply first only ECR repository
  echo ::group::Apply ECR repository with Terraform
  terraform apply -target=aws_ecr_repository.repository -input=false -auto-approve
  export REPOSITORY_URL=$(terraform output --raw repository_url)
  echo ::endgroup::
  popd

  echo ::group::Build and push Docker image
  export TF_VAR_image_tag=$(git rev-parse --short HEAD)
  docker build --platform linux/amd64 -t $REPOSITORY_URL:$TF_VAR_image_tag .
  docker push $REPOSITORY_URL:$TF_VAR_image_tag
  echo ::endgroup::

  # Apply the rest of the infrastructure after the image is built and pushed
  echo ::group::Apply the rest of the infrastructure with Terraform
  pushd "$dir"
  terraform apply -input=false -auto-approve
  echo ::endgroup::
  }

main "$@"