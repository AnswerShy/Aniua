docker compose down -v
docker container prune -f
docker compose -f compose.full.yaml build --no-cache frontend
docker compose -f compose.full.yaml up -d frontend