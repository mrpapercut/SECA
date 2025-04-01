package events

import (
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

	status := models.GetStatus()

	status.SetCredits(int64(event.Credits))
	status.SetFuelCapacity(event.FuelCapacity)
	status.SetFuelLevel(event.FuelLevel)

	if event.ShipName != "" {
		status.SetShip(event.ShipName, event.Ship)
	}

	return nil
}
