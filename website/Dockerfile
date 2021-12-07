FROM node:alpine

WORKDIR /usr/src/o--0.eu

COPY ./package.json ./package.json
COPY ./index.js ./index.js
COPY ./htmltemplate.js ./htmltemplate.js

COPY ./assets ./assets

RUN npm install

EXPOSE 3000
