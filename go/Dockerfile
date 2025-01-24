FROM golang:1.23-bookworm

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY main.go ./
COPY ./config ./config
COPY ./journal ./journal
COPY ./models ./models
COPY ./server ./server
COPY ./config.json ./

RUN go build -v -o /app/seca .

CMD ["/app/seca"]
