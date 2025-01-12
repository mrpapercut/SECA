package journal

import (
	"fmt"
	"log"
	"os"
	"path"
	"path/filepath"

	"github.com/fsnotify/fsnotify"
)

type JournalWatcher struct {
	logdirPath     string
	currentLogfile string
}

func GetWatcher() *JournalWatcher {
	homedir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error getting user home dir")
	}

	logdirPath := path.Join(homedir, "Saved Games", "Frontier Developments", "Elite Dangerous")

	return &JournalWatcher{
		logdirPath: logdirPath,
	}
}

func (jw *JournalWatcher) StartWatcher() {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatalf("error starting watcher: %v", err)
	}
	defer watcher.Close()

	err = watcher.Add(jw.logdirPath)
	if err != nil {
		log.Fatalf("error watching directory: %v", err)
	}

	for {
		select {
		case event, ok := <-watcher.Events:
			if !ok {
				return
			}

			path, _ := filepath.Abs(event.Name)

			if event.Op&fsnotify.Create == fsnotify.Create {
				jw.handleCreateEvent(path)
			}

			if event.Op&fsnotify.Write == fsnotify.Write {
				jw.handleWriteEvent(path)
			}

		case err, ok := <-watcher.Errors:
			if !ok {
				return
			}

			fmt.Printf("error on watcher: %v", err)
		}
	}
}

func (jw *JournalWatcher) handleCreateEvent(path string) {
	fmt.Printf("handling create event for %s\n", path)
}

func (jw *JournalWatcher) handleWriteEvent(path string) {
	fmt.Printf("handling write event for %s\n", path)
}
