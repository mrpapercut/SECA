package main

import (
	"embed"
	"flag"
	"fmt"
	"log"
	"log/slog"
	"os"

	"github.com/mrpapercut/seca/config"
	"github.com/mrpapercut/seca/discord"
	"github.com/mrpapercut/seca/journal"
	"github.com/mrpapercut/seca/models"
	"github.com/mrpapercut/seca/server"
)

//go:embed nextjs/dist
//go:embed nextjs/dist/_next/static/chunks/pages/*.js
//go:embed nextjs/dist/_next/static/**/*.js
//go:embed nextjs/dist/_next/static/**/*.css
var nextFS embed.FS

func main() {
	// Flags
	disableWebserverPtr := flag.Bool("disable-webserver", false, "Disable frontend server")
	flag.Parse()

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

	// Websockets
	sockets := server.GetSocketServerInstance()

	// Journal watcher
	jw := journal.GetWatcher()

	// Discord
	err = discord.GetDiscordInstance().Start()
	if err != nil {
		slog.Warn(fmt.Sprintf("error starting discord presence: %v", err))
	}

	go jw.ProcessExistingFiles()

	go jw.StartWatcher()
	go sockets.Start()

	// Fileserver frontend
	if !*disableWebserverPtr {
		files := server.GetFileServerInstance()

		go files.Start(nextFS)
	}

	select {}
}
