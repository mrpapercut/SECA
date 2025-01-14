package main

import (
	"github.com/mrpapercut/seca/journal"
	"github.com/mrpapercut/seca/server"
)

func main() {
	jw := journal.GetWatcher()

	go jw.StartWatcher()
	go server.StartWebserver()

	select {}
}
