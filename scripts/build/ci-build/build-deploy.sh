#!/bin/bash
set -eo pipefail

<<<<<<< HEAD
_version="1.2.28"
=======
_version="1.3.1"
>>>>>>> v7.4.1
_tag="grafana/build-container:${_version}"

_dpath=$(dirname "${BASH_SOURCE[0]}")
cd "$_dpath"

docker build -t $_tag .
docker push $_tag
