package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type LocationEvent struct {
	GenericEvent
	StarSystem    string
	SystemAddress int64
	Docked        bool
	OnFoot        bool
	StarPos       []float64
	Body          string
	BodySystemID  int64 `json:"BodyID"`
	BodyType      string
}

func (ev *EventHandler) handleEventLocation(rawEvent string) error {
	event, err := ParseEvent[LocationEvent](rawEvent)
	if err != nil {
		return err
	}

	system := &models.System{
		Name:          event.StarSystem,
		SystemAddress: event.SystemAddress,
		StarPosX:      event.StarPos[0],
		StarPosY:      event.StarPos[1],
		StarPosZ:      event.StarPos[2],
	}

	err = models.SaveSystem(system)
	if err != nil {
		return fmt.Errorf("error creating or updating system: %v", err)
	}

	status := models.GetStatus()

	status.SetCurrentSystem(event.StarSystem)

	if event.Body != "" {
		status.SetCurrentBody(event.Body)
	}

	if event.Docked {
		status.SetState(models.StateDocked)
	}

	if event.OnFoot {
		status.SetState(models.StateOnFootPlanet)
	}

	return nil
}
