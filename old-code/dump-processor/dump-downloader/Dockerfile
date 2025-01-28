FROM alpine:3.14

RUN apk add --no-cache --no-progress wget gzip

COPY downloader.sh /usr/local/downloader.sh

RUN chmod +x /usr/local/downloader.sh
