FROM node:23.8-alpine AS nodebuilder

WORKDIR /app

COPY ./nextjs/package.json ./nextjs/package-lock.json ./

RUN npm install

COPY ./nextjs/ ./

RUN npm run build

FROM golang:1.23-bookworm AS gobuilder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY main.go ./
COPY ./config ./config
COPY ./discord ./discord
COPY ./journal ./journal
COPY ./models ./models
COPY ./server ./server
COPY ./config.json ./

# COPY ./nextjs ./nextjs

COPY --from=nodebuilder /app /app/nextjs

RUN go build -v -o /app/seca .

CMD ["/app/seca"]
