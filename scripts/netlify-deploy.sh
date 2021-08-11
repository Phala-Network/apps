#!/bin/bash
set -xeuo pipefail
test "$CI" = true || exit 1
npm install -g @microsoft/rush
rush install
rush build