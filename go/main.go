package main

import (
	"fmt"

	"github.com/mrpapercut/seca/journal"
)

func main() {
	jw := journal.GetWatcher()

	fmt.Printf("Log dir path: %s\n", jw.LogdirPath)
}
