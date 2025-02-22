package events

import (
	"fmt"
	"log/slog"

	"github.com/mrpapercut/seca/models"
)

type ExplorationDataDiscovery struct {
	SystemName string
	NumBodies  int
}

type MultiSellExplorationDataEvent struct {
	GenericEvent
	Discovered    []ExplorationDataDiscovery
	BaseValue     int64
	Bonus         int64
	TotalEarnings int64
}

func (eh *EventHandler) handleEventMultiSellExplorationData(rawEvent string) error {
	event, err := ParseEvent[MultiSellExplorationDataEvent](rawEvent)
	if err != nil {
		return err
	}

	for _, sale := range event.Discovered {
		system, err := models.GetSystemByName(sale.SystemName)
		if err != nil {
			return fmt.Errorf("error getting system %s: %v", sale.SystemName, err)
		}

		bodies, err := models.GetBodies(system.SystemAddress)
		if err != nil {
			return fmt.Errorf("error getting bodies for system %s: %v", system.Name, err)
		}

		for _, body := range bodies {
			scan, err := models.GetExplorationScan(system.SystemAddress, body.BodySystemID)
			if err != nil {
				slog.Warn(fmt.Sprintf("error getting scans for body %s: %v", body.Name, err))
				continue
			}

			err = models.SetExplorationScanSold(scan)
			if err != nil {
				return fmt.Errorf("error updating scan: %v", err)
			}
		}
	}

	status := models.GetStatus()
	status.SetCredits(status.Credits + event.TotalEarnings)

	return nil
}
