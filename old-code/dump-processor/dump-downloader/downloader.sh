#!/bin/sh

function download_dump() {
    FILENAME="$1.json.gz"
    DOWNLOAD_URL="https://www.edsm.net/dump/$FILENAME"
    DOWNLOAD_TARGET="/dumps/"

    echo "Downloading $FILENAME..."
    wget -P $DOWNLOAD_TARGET -q $DOWNLOAD_URL

    echo "Unpacking $FILENAME"
    gunzip "$DOWNLOAD_TARGET/$FILENAME"
}

download_dump "systemsWithoutCoordinates"
