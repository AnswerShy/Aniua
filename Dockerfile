# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.7.0
FROM node:${NODE_VERSION}-slim as builder
WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

ARG GITHUB_TOKEN
RUN git clone https://$GITHUB_TOKEN@github.com/AnswerShy/Aniua.git .

RUN npm install
RUN npm run build

RUN cp -r public .next/standalone/
RUN cp -r .next/static .next/standalone/.next/

FROM node:${NODE_VERSION}-slim as runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./

USER node

EXPOSE 3000
CMD ["node", "server.js", "-H", "0.0.0.0"]