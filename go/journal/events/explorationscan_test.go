package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventSAAScanComplete(c *check.C) {
	systems := []*models.System{{
		ID:            1,
		Name:          "California Sector BA-A e6",
		SystemAddress: 27072119940,
	}, {
		ID:            2,
		Name:          "Outopps BO-A b55-0",
		SystemAddress: 654311629785,
	}, {
		ID:            3,
		Name:          "Outorst VK-D c26-0",
		SystemAddress: 80899871202,
	}, {
		ID:            4,
		Name:          "S171 7",
		SystemAddress: 44400783,
	}}

	for _, system := range systems {
		err := models.SaveSystem(system)
		c.Assert(err, check.IsNil)
	}

	bodies := []*models.Body{{
		Name:           "California Sector BA-A e6 4",
		BodySystemID:   8,
		SystemID:       1,
		BodyType:       "Planet",
		PlanetClass:    models.AmmoniaWorld,
		MassEM:         0.43914,
		TerraformState: models.NotTerraformable,
		WasDiscovered:  true,
		WasMapped:      true,
	}, {
		Name:           "Outopps BO-A b55-0 4 a",
		BodySystemID:   8,
		SystemID:       2,
		BodyType:       "Planet",
		PlanetClass:    models.EarthLikeWorld,
		MassEM:         0.498039,
		TerraformState: models.NotTerraformable,
		WasDiscovered:  true,
		WasMapped:      false,
	}, {
		Name:           "Outorst VK-D c26-0 BC 1",
		BodySystemID:   8,
		SystemID:       3,
		BodyType:       "Planet",
		PlanetClass:    models.WaterWorld,
		MassEM:         0.780638,
		TerraformState: models.NotTerraformable,
		WasDiscovered:  true,
		WasMapped:      false,
	}, {
		Name:           "S171 7 B 1 a",
		BodySystemID:   3,
		SystemID:       4,
		BodyType:       "Planet",
		PlanetClass:    models.WaterWorld,
		MassEM:         0.453011,
		TerraformState: models.Terraformable,
		WasDiscovered:  true,
		WasMapped:      true,
	}}

	for _, body := range bodies {
		err := models.SaveBody(body)
		c.Assert(err, check.IsNil)
	}

	expectedValues := []int64{777091, 3555753, 1312209, 1455001}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T09:58:54Z", "event":"SAAScanComplete", "BodyName":"California Sector BA-A e6 4", "SystemAddress":27072119940, "BodyID":8, "ProbesUsed":4, "EfficiencyTarget":4 }`,
		`{ "timestamp":"2025-01-11T11:57:28Z", "event":"SAAScanComplete", "BodyName":"Outopps BO-A b55-0 4 a", "SystemAddress":654311629785, "BodyID":6, "ProbesUsed":5, "EfficiencyTarget":6 }`,
		`{ "timestamp":"2025-01-11T13:48:38Z", "event":"SAAScanComplete", "BodyName":"Outorst VK-D c26-0 BC 1", "SystemAddress":80899871202, "BodyID":16, "ProbesUsed":5, "EfficiencyTarget":6 }`,
		`{ "timestamp":"2025-01-11T16:42:38Z", "event":"SAAScanComplete", "BodyName":"S171 7 B 1 a", "SystemAddress":44400783, "BodyID":4, "ProbesUsed":22, "EfficiencyTarget":22 }`,
	}

	for i, rawEvent := range rawEvents {
		err := s.eventHandler.handleEventSAAScanComplete(rawEvent)
		c.Assert(err, check.IsNil)

		system := systems[i]
		body := bodies[i]

		scan, err := models.GetExplorationScan(system.SystemAddress, body.BodySystemID)
		c.Assert(err, check.IsNil)
		c.Assert(scan.EstimatedEarnings, check.Equals, expectedValues[i])
	}
}
