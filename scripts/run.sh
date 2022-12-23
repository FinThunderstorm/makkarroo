#!/usr/bin/env bash
set -o nounset -o errexit -o pipefail

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# shellcheck source=../../scripts/common-functions.sh
source "$script_dir/common-functions.sh"

dir="$repo"

function main {
  pushd "$dir"
  use_correct_node_version
  npm run start:dev
}

main "$@"

