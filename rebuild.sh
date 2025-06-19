docker compose down -v
docker container prune -f
docker compose -f 'compose.prod.yaml' up -d --build 'frontend'