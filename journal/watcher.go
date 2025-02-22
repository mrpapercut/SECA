package journal

import (
	"fmt"
	"log"
	"log/slog"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/fsnotify/fsnotify"
	"github.com/mrpapercut/seca/config"
	"github.com/mrpapercut/seca/models"
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

type JournalWatcher struct {
	logdirPath string
}

func GetWatcher() *JournalWatcher {
	conf, _ := config.GetConfig()

	var logdirPath string

	if conf.JournalFolder != "" {
		logdirPath = conf.JournalFolder
	} else {
		homedir, err := os.UserHomeDir()
		if err != nil {
			log.Fatalf("error getting user home dir")
		}

		logdirPath = path.Join(homedir, "Saved Games", "Frontier Developments", "Elite Dangerous")
	}

	return &JournalWatcher{
		logdirPath: logdirPath,
	}
}

func (jw *JournalWatcher) ProcessExistingFiles() {
	files, err := os.ReadDir(jw.logdirPath)
	if err != nil {
		slog.Warn("unable to read logdirPath")
	}

	isFirstRun := models.IsFirstRun()

	var lastJournalFile string

	for _, file := range files {
		filepath := path.Join(jw.logdirPath, file.Name())
		slog.Info(fmt.Sprintf("Processing file %s", filepath))

		contents, err := os.ReadFile(filepath)
		if err != nil {
			slog.Warn("error reading file %s: %v", filepath, err)
			continue
		}

		if strings.HasSuffix(filepath, ".log") {
			lastJournalFile = filepath

			if isFirstRun {
				jcontents := strings.Split(string(contents), "\n")
				jw.processJournalLines(jcontents, isFirstRun)
			}

			continue
		}

		if strings.HasSuffix(filepath, "NavRoute.json") {
			jw.handleNavRouteUpdate(contents)
			continue
		} else if strings.HasSuffix(filepath, "Status.json") {
			jw.handleStatusUpdate(contents)
			continue
		}
	}

	// For Journal, process only the last file in its entirety
	if !isFirstRun && lastJournalFile != "" {
		contents, err := os.ReadFile(lastJournalFile)
		if err != nil {
			slog.Warn("error reading file %s: %v", lastJournalFile, err)
		}

		lastJournalContents := strings.Split(string(contents), "\n")
		jw.processJournalLines(lastJournalContents, false)
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

	slog.Info("Watcher started")

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
	fmt.Printf("handling write event for %s\n", path)

	file, err := os.ReadFile(path)
	if err != nil {
		fmt.Printf("error reading file: %v", err)
		return
	}

	if strings.HasSuffix(path, ".log") {
		jw.handleJournalUpdate(file)
	} else if strings.HasSuffix(path, "NavRoute.json") {
		jw.handleNavRouteUpdate(file)
	} else if strings.HasSuffix(path, "Status.json") {
		jw.handleStatusUpdate(file)
	}
}
