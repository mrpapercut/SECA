package events

import (
	"errors"
	"fmt"
	"strings"

	"github.com/mrpapercut/seca/models"
	"gorm.io/gorm"
)

type FSSBodySignalsEvent struct {
	GenericEvent
	BodyName      string
	BodySystemID  int64 `json:"BodyID"`
	SystemAddress int64
	Signals       []FSSBodySignal
	Genuses       []FSSBodySignalGenus
}

func (eh *EventHandler) handleEventFSSBodySignals(rawEvent string) error {
	event, err := ParseEvent[FSSBodySignalsEvent](rawEvent)
	if err != nil {
		return err
	}

	system, err := models.GetSystemByAddress(event.SystemAddress)
	if err != nil {
		return fmt.Errorf("error getting system for body: %v", err)
	}

	var body *models.Body

	body, err = models.GetBodyByName(event.BodyName)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			newbody := &models.Body{
				Name:         event.BodyName,
				BodyType:     "Planet",
				BodySystemID: event.BodySystemID,
				SystemID:     system.ID,
				System:       *system,
			}

			err = models.SaveBody(newbody)
			if err != nil {
				return fmt.Errorf("error creating body for signal: %v", err)
			}

			body, err = models.GetBodyByName(event.BodyName)
			if err != nil {
				return fmt.Errorf("error getting body after creation for signal: %v", err)
			}
		} else {
			return fmt.Errorf("error getting body: %v", err)
		}
	}

	for _, s := range event.Signals {
		genuses := make([]string, 0)

		if s.Type == string(SignalBiological) && len(event.Genuses) > 0 {
			for _, g := range event.Genuses {
				genuses = append(genuses, g.Genus)
			}
		}

		signal := &models.Signal{
			SystemID: system.ID,
			System:   *system,
			BodyID:   body.ID,
			Body:     *body,
			Type:     models.SignalType(s.Type),
			SubType:  strings.Join(genuses, ","),
			Count:    int64(s.Count),
		}

		err = models.SaveSignal(signal)
		if err != nil {
			return fmt.Errorf("error creating signal: %v", err)
		}
	}

	return nil
}
