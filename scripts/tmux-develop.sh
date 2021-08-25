#!/bin/bash

pnpm run build:deps
session="develop"
tmux new-session -d -s $session
tmux new-window -t $session:$window 'develop'
tmux send-keys -t $session:$window 'pnpm run develop:deps' Enter
tmux split-window -v
tmux send-keys -t $session:$window 'pnpm run develop:app' Enter
tmux attach-session -t $session