FROM node:23.6-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY eslint.config.mjs index.html next.config.ts tsconfig.json ./
COPY ./components ./components
COPY ./pages ./pages
COPY ./public ./public
COPY ./styles ./styles

RUN chown -R node:node /app

USER node

RUN npm run build
