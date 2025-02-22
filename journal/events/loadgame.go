package events

import (
	"fmt"
	"log/slog"

	"github.com/mrpapercut/seca/discord"
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

	dc := discord.GetDiscordInstance()
	if !dc.Connected {
		err = dc.Start()
		if err != nil {
			slog.Warn(fmt.Sprintf("error logging into discord: %v", err))
		}
	}

	return nil
}
