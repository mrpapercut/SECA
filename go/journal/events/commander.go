package events

import (
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

	status := models.GetStatus()

	if event.Name != "" && status.CommanderName != event.Name {
		status.SetCommanderName(event.Name)
	}

	return nil
}
