package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type FSDTargetEvent struct {
	GenericEvent
	Name          string
	SystemAddress int64
	StarClass     string
}

func (eh *EventHandler) handleEventFSDTarget(rawEvent string) error {
	event, err := ParseEvent[FSDTargetEvent](rawEvent)
	if err != nil {
		return err
	}

	system := &models.System{
		Name:          event.Name,
		SystemAddress: event.SystemAddress,
	}

	err = models.SaveSystem(system)
	if err != nil {
		return fmt.Errorf("error creating or updating system: %v", err)
	}

	return nil
}
