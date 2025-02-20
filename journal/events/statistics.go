package events

import (
	"github.com/mrpapercut/seca/models"
)

type StatisticsEvent struct {
	GenericEvent
	Exploration struct {
		SystemsVisited float64 `json:"Systems_Visited"`
		TotalDistance  float64 `json:"Total_Hyperspace_Distance"`
		TotalJumps     float64 `json:"Total_Hyperspace_Jumps"`
	}
}

func (ev *EventHandler) handleEventStatistics(rawEvent string) error {
	event, err := ParseEvent[StatisticsEvent](rawEvent)
	if err != nil {
		return err
	}

	status := models.GetStatus()
	status.SetTravelStatistics(int64(event.Exploration.SystemsVisited), int64(event.Exploration.TotalJumps), event.Exploration.TotalDistance)

	return nil
}
