# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.7.0
FROM node:${NODE_VERSION}-slim as builder
WORKDIR /app

ENV NEXT_PUBLIC_BASE_URL=http://localhost:3000/
ENV NEXT_PUBLIC_API_URL=https://api.aniua.top/

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
RUN cp -r public .next/standalone/
RUN cp -r .next/static .next/standalone/.next/

FROM node:${NODE_VERSION}-slim as runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL=http://0.0.0.0:3000/
ENV NEXT_PUBLIC_API_URL=https://api.aniua.top/
COPY --from=builder /app/.next/standalone ./
# CUT THESE 3 TO DECREASE TO 400mb
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/server ./server
RUN npm install socket.io

USER node

EXPOSE 3000
CMD ["node", "server.js", "-H", "0.0.0.0"]