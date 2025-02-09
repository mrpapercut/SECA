package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type SAAScanCompleteEvent struct {
	GenericEvent
	BodyName         string
	SystemAddress    int64
	BodySystemID     int64 `json:"BodyID"`
	ProbesUsed       int
	EfficiencyTarget int
}

func (eh *EventHandler) handleEventSAAScanComplete(rawEvent string) error {
	event, err := ParseEvent[SAAScanCompleteEvent](rawEvent)
	if err != nil {
		return err
	}

	system, err := models.GetSystemByAddress(event.SystemAddress)
	if err != nil {
		return fmt.Errorf("error getting system: %v", err)
	}

	body, err := models.GetBodyByName(event.BodyName)
	if err != nil {
		return fmt.Errorf("error getting body %s: %v", event.BodyName, err)
	}

	err = models.SetBodyMapped(body)
	if err != nil {
		return fmt.Errorf("error setting body.Mapped to true")
	}

	// Manually set Mapped to true so we don't have to retrieve
	// the body in order to calculate the correct scan value
	body.Mapped = true

	scan := &models.ExplorationScan{
		SystemID:            system.ID,
		System:              *system,
		BodyID:              body.ID,
		Body:                *body,
		Timestamp:           event.Timestamp,
		EfficiencyTargetMet: event.ProbesUsed <= event.EfficiencyTarget,
	}

	scan.EstimatedEarnings = models.GetExplorationScanValue(scan)

	err = models.SaveExplorationScan(scan)
	if err != nil {
		return fmt.Errorf("error creating exploration scan")
	}

	return nil
}
