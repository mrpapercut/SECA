package journal

import (
	"log"
	"os"
	"path"

	"github.com/fsnotify/fsnotify"
)

type JournalWatcher struct {
	LogdirPath     string
	currentLogfile string
}

func GetWatcher() *JournalWatcher {
	homedir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error getting user home dir")
	}

	logdirPath := path.Join(homedir, "Saved Games", "Frontier Developments", "Elite Dangerous")

	return &JournalWatcher{
		LogdirPath: logdirPath,
	}
}

func (jw *JournalWatcher) StartWatcher() {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatalf("error starting watcher: %v", err)
	}
	defer watcher.Close()
}
