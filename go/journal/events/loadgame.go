package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type LoadGameEvent struct {
	GenericEvent
	Credits      float64
	Ship         string
	ShipName     string
	FuelLevel    float64
	FuelCapacity float64
	StartLanded  bool
}

func (eh *EventHandler) handleEventLoadGame(rawEvent string) error {
	event, err := ParseEvent[LoadGameEvent](rawEvent)
	if err != nil {
		return err
	}

	status, err := models.GetStatus()
	if err != nil {
		return fmt.Errorf("error getting status: %v", err)
	}

	status.Balance = int64(event.Credits)
	status.FuelLevel = event.FuelLevel
	status.FuelCapacity = event.FuelCapacity
	status.Landed = event.StartLanded

	if event.ShipName != "" {
		status.ShipType = event.Ship
		status.ShipName = event.ShipName
	}

	err = models.UpdateStatus(status)
	if err != nil {
		return fmt.Errorf("error updating status: %v", err)
	}

	return nil
}
