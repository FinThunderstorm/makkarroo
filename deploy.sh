#!/usr/bin/env bash
set -o nounset -o errexit -o pipefail

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/scripts" && pwd )"

# shellcheck source=../../scripts/common-functions.sh
source "$script_dir/common-functions.sh"

repo_dir="$repo/terraform"
terraform_dir="$repo/terraform"

function main {
  require_command terraform
  use_correct_node_version

  echo ::group::Build static site
  pushd "$repo_dir"
  npm ci
  npm run build
  npm run export
  echo ::endgroup::

  echo ::group::Initialize Terraform
  pushd "$terraform_dir"
  terraform init -input=false
  echo ::endgroup::

  echo ::group::Apply the rest of the infrastructure with Terraform
  pushd "$terraform_dir"
  terraform apply -input=false -auto-approve
  echo ::endgroup::
  }

main "$@"