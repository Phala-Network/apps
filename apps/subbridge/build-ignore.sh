#!/bin/bash
if [[ $NO_IGNORE == true ]]; then
  exit 1
else
  git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF . ../../packages/ ../../.yarn/ ../../package.json ../../.yarnrc.yml ../../yarn.lock
fi
