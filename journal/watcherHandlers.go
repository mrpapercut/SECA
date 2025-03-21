package journal

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"strings"
	"time"

	"github.com/mrpapercut/seca/discord"
	"github.com/mrpapercut/seca/journal/events"
	"github.com/mrpapercut/seca/server"
)

var eventHandler = events.EventHandler{}

func (jw *JournalWatcher) handleJournalUpdate(filecontents []byte) {
	lines := strings.Split(string(filecontents), "\n")

	// Get line index of last session, should start with eventType "Commander"
	lastSessionIdx := 0
	for idx, line := range lines {
		if strings.Contains(line, `"event":"Commander"`) {
			lastSessionIdx = idx
		}
	}

	jw.processJournalLines(lines[lastSessionIdx:], false)
}

func (jw *JournalWatcher) processJournalLines(lines []string, isFirstRun bool) {
	for lineIdx, line := range lines {
		if len(line) == 0 {
			continue
		}

		var ev events.GenericEvent
		err := json.Unmarshal([]byte(line), &ev)
		if err != nil {
			slog.Warn(fmt.Sprintf("error unmarshalling event json: %v", err))
			continue
		}

		key := fmt.Sprintf("%d|%s|%s", lineIdx, ev.Timestamp.Format(time.RFC3339), ev.Event)
		_, exists := eventCache[key]
		if exists {
			continue
		}

		eventCache[key] = true

		jw.handleJournalEvent(&ev, line)

		if !isFirstRun {
			if ev.Event == "FSDJump" {
				server.SendRouteUpdate()
			}

			if ev.Event == "LoadGame" || ev.Event == "Loadout" {
				server.SendStatusCommanderInfoUpdate()
			}
		}
	}

	if !isFirstRun {
		server.SendStatusUpdate()
		server.SendCurrentSystemUpdate()
	}
}

func (jw *JournalWatcher) handleJournalEvent(event *events.GenericEvent, rawEvent string) {
	err := eventHandler.HandleEvent(event.Event, rawEvent)
	if err != nil {
		slog.Warn(fmt.Sprintf("error processing %s event", event.Event), "error", err)
	}
}

func (jw *JournalWatcher) handleNavRouteUpdate(filecontents []byte) {
	var ev events.GenericEvent
	err := json.Unmarshal([]byte(filecontents), &ev)
	if err != nil {
		slog.Warn(fmt.Sprintf("error unmarshalling event navRoute json: %v", err))
		return
	}

	err = eventHandler.HandleEvent(ev.Event, string(filecontents))
	if err != nil {
		slog.Warn(fmt.Sprintf("error processing navRoute event: %v", err))
	}

	server.SendRouteUpdate()
}

func (jw *JournalWatcher) handleStatusUpdate(filecontents []byte) {
	var ev events.GenericEvent
	err := json.Unmarshal([]byte(filecontents), &ev)
	if err != nil {
		slog.Warn(fmt.Sprintf("error unmarshalling event status json: %v", err))
		return
	}

	err = eventHandler.HandleEvent(ev.Event, string(filecontents))
	if err != nil {
		slog.Warn(fmt.Sprintf("error processing status event: %v", err))
	}

	server.SendStatusUpdate()
	server.SendStatusCreditsUpdate()

	discord.UpdateDiscordPresence()
}
