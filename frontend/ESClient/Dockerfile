FROM node:17.3.0-alpine3.15

WORKDIR /app

COPY ./package.json ./package.json
COPY ./src ./src

RUN chown -R node:node /app

USER node

RUN npm install
