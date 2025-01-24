package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type CommanderEvent struct {
	GenericEvent
	Name string
}

func (eh *EventHandler) handleEventCommander(rawEvent string) error {
	event, err := ParseEvent[CommanderEvent](rawEvent)
	if err != nil {
		return err
	}

	status, err := models.GetStatus()
	if err != nil {
		return fmt.Errorf("error getting status: %v", err)
	}

	if event.Name != "" && status.CommanderName != event.Name {
		status.CommanderName = event.Name

		err = models.UpdateStatus(status)
		if err != nil {
			return fmt.Errorf("error updating status: %v", err)
		}
	}

	return nil
}
