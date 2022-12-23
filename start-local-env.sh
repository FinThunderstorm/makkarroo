#!/usr/bin/env bash
set -o nounset -o errexit -o pipefail

source "$( dirname "${BASH_SOURCE[0]}" )/scripts/common-functions.sh"

require_command tmux

session="makkarroo"

tmux kill-session -t $session || true
tmux start-server
tmux new-session -d -s $session

"$repo/scripts/npm-ci.sh"

tmux select-pane -t 0
tmux splitw -v

tmux select-pane -t 0
tmux send-keys "$repo/scripts/css.sh" C-m
tmux select-pane -t 0 -T "css"

tmux select-pane -t 1
tmux send-keys "$repo/scripts/run.sh" C-m
tmux select-pane -t 1 -T "run"

tmux select-pane -t 0

tmux set pane-border-status top

tmux attach-session -t $session

