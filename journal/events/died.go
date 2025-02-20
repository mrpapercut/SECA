package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type DiedEvent struct {
	GenericEvent
}

func (eh *EventHandler) handleEventDied(rawEvent string) error {
	_, err := ParseEvent[DiedEvent](rawEvent)
	if err != nil {
		return err
	}

	err = models.SetExplorationScansDataLost()
	if err != nil {
		return fmt.Errorf("error setting exploration data to lost")
	}

	err = models.SetBiologicalScansDataLost()
	if err != nil {
		return fmt.Errorf("error setting biological data to lost")
	}

	return nil
}
