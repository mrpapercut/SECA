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

	status, err := models.GetStatus()
	if err != nil {
		return fmt.Errorf("error getting status: %v", err)
	}

	status.System = event.StarSystem
	status.Body = event.Body
	status.Docked = event.Docked
	status.Landed = event.OnFoot

	err = models.UpdateStatus(status)
	if err != nil {
		return fmt.Errorf("error updating status: %v", err)
	}

	return nil
}
