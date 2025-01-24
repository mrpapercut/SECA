package main

import (
	"log"
	"log/slog"
	"os"

	"github.com/mrpapercut/seca/config"
	"github.com/mrpapercut/seca/journal"
	"github.com/mrpapercut/seca/models"
	"github.com/mrpapercut/seca/server"
)

func main() {
	// Setup config
	_, err := config.GetConfig()
	if err != nil {
		log.Fatalf("error loading config: %v", err)
	}

	// Setup logger
	defaultLogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(defaultLogger)

	// Setup database
	models.Setup()

	ws := server.GetWebserverInstance()

	jw := journal.GetWatcher()

	go jw.ProcessExistingFiles()

	go jw.StartWatcher()
	go ws.Start()

	select {}
}
