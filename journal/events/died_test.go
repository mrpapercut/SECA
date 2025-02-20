package events

import (
	"time"

	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventDied(c *check.C) {
	system := &models.System{
		Name:          "Synuefai AK-A e0",
		SystemAddress: 1440968781,
	}

	err := models.SaveSystem(system)
	c.Assert(err, check.IsNil)

	body := &models.Body{
		Name:          "Synuefai EQ-Y e0 A 1",
		BodySystemID:  1,
		SystemID:      system.ID,
		BodyType:      "Planet",
		PlanetClass:   "Ammonia world",
		MassEM:        0.049756,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}

	err = models.SaveBody(body)
	c.Assert(err, check.IsNil)

	biologicalscan := &models.BiologicalScan{
		SystemID:  system.ID,
		System:    *system,
		BodyID:    body.ID,
		Body:      *body,
		Timestamp: time.Now(),
		Genus:     string(models.GenusTussock),
		Species:   string(models.SpeciesTussockVentusa),
		Variant:   "Tussock Ventusa - Yellow",
	}

	biologicalscan.EstimatedEarnings = models.GetBiologicalScanValue(models.BiologicalSpecies(biologicalscan.Species), true)

	err = models.SaveBiologicalScan(biologicalscan)
	c.Assert(err, check.IsNil)

	totalBiologicalEarnings, err := models.GetTotalEstimatedBiologicalScanValue()
	c.Assert(err, check.IsNil)
	c.Assert(totalBiologicalEarnings, check.Equals, int64(16388500))

	explorationscan := &models.ExplorationScan{
		SystemID:            system.ID,
		System:              *system,
		BodyID:              body.ID,
		Body:                *body,
		Timestamp:           time.Now(),
		EfficiencyTargetMet: true,
	}

	explorationscan.EstimatedEarnings = models.GetExplorationScanValue(explorationscan)

	err = models.SaveExplorationScan(explorationscan)
	c.Assert(err, check.IsNil)

	totalExplorationEarnings, err := models.GetTotalEstimatedExplorationScanValue()
	c.Assert(err, check.IsNil)
	c.Assert(totalExplorationEarnings, check.Equals, int64(1985651))

	rawEvent := `{ "timestamp":"2025-01-05T17:43:32Z", "event":"Died" }`

	err = s.eventHandler.handleEventDied(rawEvent)
	c.Assert(err, check.IsNil)

	retrievedBiologicalScans, err := models.GetBiologicalScans(system.SystemAddress, body.BodySystemID)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedBiologicalScans, check.HasLen, 1)
	c.Assert(retrievedBiologicalScans[0].DataLost, check.Equals, true)

	retrievedExplorationScan, err := models.GetExplorationScan(system.SystemAddress, body.BodySystemID)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedExplorationScan.DataLost, check.Equals, true)

	newTotalBioEarnings, err := models.GetTotalEstimatedBiologicalScanValue()
	c.Assert(err, check.IsNil)
	c.Assert(newTotalBioEarnings, check.Equals, int64(0))

	newTotalExplorationEarnings, err := models.GetTotalEstimatedExplorationScanValue()
	c.Assert(err, check.IsNil)
	c.Assert(newTotalExplorationEarnings, check.Equals, int64(0))
}
