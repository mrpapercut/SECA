package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type OrganicScanType string

const (
	ScanTypeLog     OrganicScanType = "Log"
	ScanTypeSample  OrganicScanType = "Sample"
	ScanTypeAnalyse OrganicScanType = "Analyse"
)

type ScanOrganicEvent struct {
	GenericEvent
	ScanType      OrganicScanType
	Genus         models.BiologicalGenus   `json:"Genus_Localised"`
	Species       models.BiologicalSpecies `json:"Species_Localised"`
	Variant       string                   `json:"Variant_Localised"`
	SystemAddress int64
	BodySystemID  int64 `json:"Body"`
}

func (eh *EventHandler) handleEventScanOrganic(rawEvent string) error {
	event, err := ParseEvent[ScanOrganicEvent](rawEvent)
	if err != nil {
		return err
	}

	// Only register fully analysed scans
	if event.ScanType != ScanTypeAnalyse {
		return nil
	}

	system, err := models.GetSystemByAddress(event.SystemAddress)
	if err != nil {
		return fmt.Errorf("error getting system: %v", err)
	}

	body, err := models.GetBody(event.SystemAddress, event.BodySystemID)
	if err != nil {
		return fmt.Errorf("error getting body with systemAddress %d & bodyID %d: %v", event.SystemAddress, event.BodySystemID, err)
	}

	scan := &models.BiologicalScan{
		SystemID:  system.ID,
		System:    *system,
		BodyID:    body.ID,
		Body:      *body,
		Timestamp: event.Timestamp,
		Genus:     string(event.Genus),
		Species:   string(event.Species),
		Variant:   event.Variant,
	}

	scan.EstimatedEarnings = models.GetBiologicalScanValue(models.BiologicalSpecies(scan.Species), !body.WasMapped)

	err = models.SaveBiologicalScan(scan)
	if err != nil {
		return fmt.Errorf("error creating organic scan: %v", err)
	}

	return nil
}
