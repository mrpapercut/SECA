package journal

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/mrpapercut/seca/server"
)

func (jw *JournalWatcher) handleJournalUpdate(file []byte) {
	lines := strings.Split(string(file), "\n")

	// Get line index of last session, should start with eventType "Commander"
	lastSessionIdx := 0
	for idx, line := range lines {
		if strings.Contains(line, `"event":"Commander"`) {
			lastSessionIdx = idx
		}
	}

	for _, line := range lines[lastSessionIdx:] {
		if len(line) == 0 {
			continue
		}

		var ev GenericEvent
		err := json.Unmarshal([]byte(line), &ev)
		if err != nil {
			fmt.Printf("error unmarshalling json: %v", err)
			continue
		}

		key := fmt.Sprintf("%s|%s", ev.Event.Timestamp.Format(time.RFC3339), ev.Event.Event)
		_, exists := eventCache[key]
		if exists {
			continue
		}

		eventCache[key] = true

		jw.handleJournalEvent(&ev)
	}
}

type StatisticsExploration map[string]interface{}

// type StatisticsExploration struct {
// 	Systems_Visited           int
// 	Total_Hyperspace_Distance int
// 	Total_Hyperspace_Jumps    int
// }

// type Statistics struct {
// 	Exploration StatisticsExploration
// }

func (jw *JournalWatcher) handleJournalEvent(event *GenericEvent) {
	switch event.Event.Event {
	case "Commander":
		currentState.Commander = event.KeyValue["Name"].(string)
	case "Location":
		currentState.Location = event.KeyValue["Body"].(string)
	case "LoadGame":
		currentState.Credits = int(event.KeyValue["Credits"].(float64))

		if shipType, exists := event.KeyValue["Ship"]; exists {
			currentState.Ship.Type = shipType.(string)
		}

		if shipName, exists := event.KeyValue["ShipName"]; exists {
			currentState.Ship.Name = shipName.(string)
		}

		if fuelLevel, exists := event.KeyValue["FuelLevel"]; exists {
			currentState.Ship.FuelLevel = fuelLevel.(float64)
		}

		if fuelCapacity, exists := event.KeyValue["FuelCapacity"]; exists {
			currentState.Ship.FuelCapacity = fuelCapacity.(float64)
		}
	case "Statistics":
		if exploration, exists := event.KeyValue["Exploration"].(map[string]interface{}); exists {
			currentState.Statistics.SystemsVisited = int(exploration["Systems_Visited"].(float64))
			currentState.Statistics.TotalDistance = int(exploration["Total_Hyperspace_Distance"].(float64))
			currentState.Statistics.TotalJumps = int(exploration["Total_Hyperspace_Jumps"].(float64))
		}
	}

	response, _ := json.Marshal(&currentState)

	server.SendMessage(response)
}

func (jw *JournalWatcher) handleStatusUpdate(file []byte) {

}

func (jw *JournalWatcher) handleNavRouteUpdate(file []byte) {

}
