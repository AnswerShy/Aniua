docker compose down -v
docker container prune -f
docker compose build --no-cache
docker compose up