package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type OrganicDataBioData struct {
	Genus   string `json:"Genus_Localised"`
	Species string `json:"Species_Localised"`
	Variant string `json:"Variant_Localised"`
	Value   int64
	Bonus   int64
}

type SellOrganicDataEvent struct {
	GenericEvent
	MarketID MarketID
	BioData  []OrganicDataBioData
}

func (eh *EventHandler) handleEventSellOrganicData(rawEvent string) error {
	event, err := ParseEvent[SellOrganicDataEvent](rawEvent)
	if err != nil {
		return err
	}

	variants := make(map[string]int, 0)

	totalEarnings := int64(0)

	for _, sale := range event.BioData {
		if _, exists := variants[sale.Variant]; !exists {
			variants[sale.Variant] = 1
		} else {
			variants[sale.Variant]++
		}

		totalEarnings += sale.Value + sale.Bonus
	}

	for variant, count := range variants {
		scans, err := models.GetBiologicalScansByVariant(variant)
		if err != nil {
			return fmt.Errorf("error getting scan by variant: %v", err)
		}

		filteredScans := make([]*models.BiologicalScan, 0)
		for _, scan := range scans {
			if !scan.DataSold {
				filteredScans = append(filteredScans, scan)
			}
		}

		for _, scan := range filteredScans[:min(len(filteredScans), count)] {
			err = models.SetBiologicalScanSold(scan)
			if err != nil {
				return fmt.Errorf("error updating scan: %v", err)
			}
		}
	}

	status, err := models.GetStatus()
	if err != nil {
		return fmt.Errorf("error getting status: %v", err)
	}
	status.Balance += totalEarnings

	err = models.UpdateStatus(status)
	if err != nil {
		return fmt.Errorf("error updating status: %v", err)
	}

	return nil
}
