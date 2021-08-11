#!/bin/bash
set -xeuo pipefail
test "$CI" = true || exit 1
npx rush install
npx rush build