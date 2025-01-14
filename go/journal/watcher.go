package journal

import (
	"fmt"
	"log"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/fsnotify/fsnotify"
)

var eventCache = make(map[string]bool)

type StateShip struct {
	Type         string  `json:"type,omitempty"`
	Name         string  `json:"name,omitempty"`
	FuelLevel    float64 `json:"fuellevel,omitempty"`
	FuelCapacity float64 `json:"fuelcapacity,omitempty"`
}

type StateStatistics struct {
	SystemsVisited int `json:"systems_visited,omitempty"`
	TotalDistance  int `json:"total_distance,omitempty"`
	TotalJumps     int `json:"total_jumps,omitempty"`
}

type CurrentState struct {
	Commander  string           `json:"commander,omitempty"`
	Location   string           `json:"location,omitempty"`
	Credits    int              `json:"credits,omitempty"`
	Ship       *StateShip       `json:"ship,omitempty"`
	Statistics *StateStatistics `json:"statistics,omitempty"`
}

var currentState = &CurrentState{
	Ship:       &StateShip{},
	Statistics: &StateStatistics{},
}

type JournalWatcher struct {
	logdirPath string
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

	// new log, new cache for events
	if strings.HasSuffix(path, ".log") {
		eventCache = make(map[string]bool)
	}
}

func (jw *JournalWatcher) handleWriteEvent(path string) {
	file, err := os.ReadFile(path)
	if err != nil {
		fmt.Printf("error reading file: %v", err)
		return
	}

	if strings.HasSuffix(path, ".log") {
		jw.handleJournalUpdate(file)
	} else if strings.HasSuffix(path, "Status.json") {
		jw.handleStatusUpdate(file)
	} else if strings.HasSuffix(path, "Status.json") {
		jw.handleNavRouteUpdate(file)
	}
}
