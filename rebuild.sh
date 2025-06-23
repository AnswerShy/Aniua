#!/bin/bash

USE_NGROK=false

for arg in "$@"; do
  if [ "$arg" == "--ngrok" ]; then
    USE_NGROK=true
  fi
done

docker compose down -v
docker container prune -f
docker compose -f compose.prod.yaml build --no-cache frontend
docker compose -f compose.prod.yaml up -d frontend

if [ "$USE_NGROK" = true ]; then
  echo "Starting ngrok tunnel..."
  ngrok http --url=honest-octopus-driving.ngrok-free.app 3000
fi
