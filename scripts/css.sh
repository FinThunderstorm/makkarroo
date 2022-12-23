#!/usr/bin/env bash
set -o nounset -o errexit -o pipefail

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$script_dir/common-functions.sh"

dir="$repo"

function main {
  pushd "$dir"
  use_correct_node_version
  npm run css:dev
}

main "$@"

