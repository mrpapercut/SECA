package journal

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"strings"
	"time"

	"github.com/mrpapercut/seca/journal/events"
	"github.com/mrpapercut/seca/models"
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

	jw.processJournalLines(lines[lastSessionIdx:])
}

func (jw *JournalWatcher) processJournalLines(lines []string) {
	for _, line := range lines {
		if len(line) == 0 {
			continue
		}

		var ev events.GenericEvent
		err := json.Unmarshal([]byte(line), &ev)
		if err != nil {
			slog.Warn(fmt.Sprintf("error unmarshalling event json: %v", err))
			continue
		}

		key := fmt.Sprintf("%s|%s", ev.Timestamp.Format(time.RFC3339), ev.Event)
		_, exists := eventCache[key]
		if exists {
			continue
		}

		eventCache[key] = true

		jw.handleJournalEvent(&ev, line)

		if ev.Event == "FSDJump" {
			jw.sendRouteUpdate()
		}

		if ev.Event == "Scan" || ev.Event == "SAAScanComplete" || ev.Event == "ScanOrganic" {
			err = models.UpdateStatusEarnings()
			if err != nil {
				slog.Warn(fmt.Sprintf("error updating status earnings: %v", err))
			}
		}
	}

	jw.sendStatusUpdate()
}

func (jw *JournalWatcher) sendStatusUpdate() {
	status, err := models.GetStatus()
	if err != nil {
		slog.Warn(fmt.Sprintf("error getting status: %v", err))
		return
	}

	statusResponse := &server.ResponseStatus{
		Type:   "getStatus",
		Status: status,
	}

	jsonStatus, err := json.Marshal(&statusResponse)
	if err != nil {
		slog.Warn(fmt.Sprintf("error marshalling status json: %v", err))
		return
	}

	server.SendMessage(jsonStatus)
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

	jw.sendRouteUpdate()
}

func (jw *JournalWatcher) sendRouteUpdate() {
	route, err := models.GetRoute()
	if err != nil {
		slog.Warn(fmt.Sprintf("error getting route: %v", err))
		return
	}

	routeLength, err := models.GetRouteLength(route)
	if err != nil {
		slog.Warn(fmt.Sprintf("error getting route length: %v", err))
		return
	}

	routeResponse := &server.ResponseRoute{
		Type:          "getRoute",
		Route:         route,
		TotalDistance: routeLength,
	}

	jsonRoute, err := json.Marshal(&routeResponse)
	if err != nil {
		slog.Warn(fmt.Sprintf("error marshalling route json: %v", err))
		return
	}

	server.SendMessage(jsonRoute)
}
