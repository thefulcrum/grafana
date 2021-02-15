#!/bin/bash
set -eo pipefail

<<<<<<< HEAD
_version="1.2.7"
=======
_version="1.3.1"
>>>>>>> v7.4.1
_tag="grafana/grafana-ci-deploy:${_version}"

docker build -t $_tag .
docker push $_tag
