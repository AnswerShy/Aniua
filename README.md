# Aniua
## HOW RUN DOCKER

**Before build set enviroment!**
For this set env key from [example](https://github.com/AnswerShy/Aniua/blob/main/.example.env) 

 > To build full app with custom server
```
docker compose -f compose.full.yaml build --no-cache frontend
docker compose -f compose.full.yaml up -d frontend
```