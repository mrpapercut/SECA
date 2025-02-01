package events

import (
	"fmt"

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

	status, err := models.GetStatus()
	if err != nil {
		return fmt.Errorf("error getting status: %v", err)
	}

	status.SystemsVisited = int64(event.Exploration.SystemsVisited)
	status.TotalDistance = event.Exploration.TotalDistance
	status.TotalJumps = int64(event.Exploration.TotalJumps)

	err = models.UpdateStatus(status)
	if err != nil {
		return fmt.Errorf("error updating status: %v", err)
	}

	return nil
}
