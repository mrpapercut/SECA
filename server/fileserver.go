package server

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"sync"
)

type FileServer struct{}

var fileserverInstance *FileServer
var fileserverLock = &sync.Mutex{}

func GetFileServerInstance() *FileServer {
	if fileserverInstance == nil {
		fileserverLock.Lock()
		defer fileserverLock.Unlock()

		if fileserverInstance == nil {
			fileserverInstance = &FileServer{}
		}
	}

	return fileserverInstance
}

func (f *FileServer) Start(nextFS embed.FS) {
	distFS, err := fs.Sub(nextFS, "nextjs/dist")
	if err != nil {
		log.Fatal(err)
	}

	// The static Next.js app will be served under `/`.
	http.Handle("/", http.FileServer(http.FS(distFS)))

	log.Println("Starting HTTP server at http://localhost:3000 ...")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
