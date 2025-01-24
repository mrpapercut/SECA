package events

import (
	"strings"
	"time"

	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventMultiSellExplorationData(c *check.C) {
	systems := []*models.System{{
		Name:          "Synuefai AK-A e0",
		SystemAddress: 1440968781,
	}, {
		Name:          "Synuefai EQ-Y e0",
		SystemAddress: 1594367289,
	}, {
		Name:          "Synuefai LR-W e1-0",
		SystemAddress: 998583198,
	}}

	for _, system := range systems {
		err := models.SaveSystem(system)
		c.Assert(err, check.IsNil)
	}

	bodies := []*models.Body{{
		Name:          "Synuefai AK-A e0 A 1",
		BodySystemID:  1,
		BodyType:      "Planet",
		PlanetClass:   "Ammonia world",
		MassEM:        0.049756,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai AK-A e0 A 2",
		BodySystemID:  2,
		BodyType:      "Planet",
		PlanetClass:   "Rocky body",
		MassEM:        0.721473,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai AK-A e0 A 3",
		BodySystemID:  3,
		BodyType:      "Planet",
		PlanetClass:   "Water world",
		MassEM:        0.683981,
		WasDiscovered: true,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 A 1",
		BodySystemID:  4,
		BodyType:      "Planet",
		PlanetClass:   "Water world",
		MassEM:        0.509811,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 A 2",
		BodySystemID:  5,
		BodyType:      "Planet",
		PlanetClass:   "Earthlike body",
		MassEM:        0.363644,
		WasDiscovered: true,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 A 3",
		BodySystemID:  6,
		BodyType:      "Planet",
		PlanetClass:   "High metal content body",
		MassEM:        0.032592,
		WasDiscovered: true,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 A 4",
		BodySystemID:  7,
		BodyType:      "Planet",
		PlanetClass:   "Rocky body",
		MassEM:        0.53838,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 A 5",
		BodySystemID:  8,
		BodyType:      "Planet",
		PlanetClass:   "Ammonia world",
		MassEM:        0.815821,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 A 6",
		BodySystemID:  9,
		BodyType:      "Planet",
		PlanetClass:   "Ammonia world",
		MassEM:        0.799369,
		WasDiscovered: true,
		WasMapped:     true,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 A 7",
		BodySystemID:  10,
		BodyType:      "Planet",
		PlanetClass:   "Ammonia world",
		MassEM:        0.659252,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 B 1",
		BodySystemID:  11,
		BodyType:      "Planet",
		PlanetClass:   "Icy body",
		MassEM:        0.411324,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 B 2",
		BodySystemID:  12,
		BodyType:      "Planet",
		PlanetClass:   "Earthlike body",
		MassEM:        0.665843,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 B 3",
		BodySystemID:  13,
		BodyType:      "Planet",
		PlanetClass:   "Ammonia world",
		MassEM:        0.802499,
		WasDiscovered: true,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 B 4",
		BodySystemID:  14,
		BodyType:      "Planet",
		PlanetClass:   "Rocky ice body",
		MassEM:        0.857797,
		WasDiscovered: true,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai EQ-Y e0 B 5",
		BodySystemID:  15,
		BodyType:      "Planet",
		PlanetClass:   "Water world",
		MassEM:        0.018404,
		WasDiscovered: true,
		WasMapped:     true,
		Mapped:        true,
	}, {
		Name:          "Synuefai LR-W e1-0 A 1",
		BodySystemID:  16,
		BodyType:      "Planet",
		PlanetClass:   "Icy body",
		MassEM:        0.694033,
		WasDiscovered: false,
		WasMapped:     false,
		Mapped:        true,
	}, {
		Name:          "Synuefai LR-W e1-0 A 2",
		BodySystemID:  17,
		BodyType:      "Planet",
		PlanetClass:   "Rocky ice body",
		MassEM:        0.969783,
		WasDiscovered: true,
		WasMapped:     false,
		Mapped:        true,
	}}

	for _, body := range bodies {
		for _, system := range systems {
			if strings.HasPrefix(body.Name, system.Name) {
				body.SystemID = system.ID
				body.System = *system
				break
			}
		}

		if body.SystemID == 0 {
			c.Fatalf("error finding system for body %s", body.Name)
		}

		err := models.SaveBody(body)
		c.Assert(err, check.IsNil)

		scan := &models.ExplorationScan{
			SystemID:            body.System.ID,
			System:              body.System,
			BodyID:              body.ID,
			Body:                *body,
			Timestamp:           time.Now(),
			EfficiencyTargetMet: true,
		}

		scan.EstimatedEarnings = models.GetExplorationScanValue(scan)

		err = models.SaveExplorationScan(scan)
		c.Assert(err, check.IsNil)
	}

	rawEvent := `{ "timestamp":"2025-01-11T10:03:06Z", "event":"MultiSellExplorationData", "Discovered":[ { "SystemName":"Synuefai AK-A e0", "NumBodies":3 }, { "SystemName":"Synuefai EQ-Y e0", "NumBodies":12 }, { "SystemName":"Synuefai LR-W e1-0", "NumBodies":2 } ], "BaseValue":4260709, "Bonus":0, "TotalEarnings":4260709 }`

	s.eventHandler.handleEventMultiSellExplorationData(rawEvent)

	for _, body := range bodies {
		scan, err := models.GetExplorationScan(body.System.SystemAddress, body.BodySystemID)
		c.Assert(err, check.IsNil)
		c.Assert(scan.DataSold, check.Equals, true)
	}
}
