#!/bin/sh
trap "exit 1" INT

docker-compose -f ./docker/docker-compose.yml up -d
sleep 2
sls offline start --stage local