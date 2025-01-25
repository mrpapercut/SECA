package events

import (
	"fmt"

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

		mappedBodies := make([]*models.Body, 0)
		for _, body := range bodies {
			if body.Mapped {
				mappedBodies = append(mappedBodies, body)
			}
		}

		for _, body := range mappedBodies {
			scan, err := models.GetExplorationScan(system.SystemAddress, body.BodySystemID)
			if err != nil {
				return fmt.Errorf("error getting scans for body %s: %v", body.Name, err)
			}

			err = models.SetExplorationScanSold(scan)
			if err != nil {
				return fmt.Errorf("error updating scan: %v", err)
			}
		}
	}

	status, err := models.GetStatus()
	if err != nil {
		return fmt.Errorf("error getting status: %v", err)
	}
	status.Balance += event.TotalEarnings

	err = models.UpdateStatus(status)
	if err != nil {
		return fmt.Errorf("error updating status: %v", err)
	}

	return nil
}
