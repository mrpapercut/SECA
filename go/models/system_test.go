package models

import (
	"time"

	"gopkg.in/check.v1"
)

func (s *ModelSuite) TestSaveSystem(c *check.C) {
	systemName := s.SampleSystem.Name
	systemAdrress := s.SampleSystem.SystemAddress
	starPos := []float64{s.SampleSystem.StarPosX, s.SampleSystem.StarPosY, s.SampleSystem.StarPosZ}

	system := &System{
		ID:            1,
		Name:          systemName,
		SystemAddress: systemAdrress,
	}

	err := SaveSystem(system)
	c.Assert(err, check.IsNil)

	var systems []*System
	err = db.Model(&System{}).Find(&systems).Error
	c.Assert(err, check.IsNil)

	retrievedSystem, err := GetSystemByAddress(systemAdrress)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedSystem.Name, check.Equals, systemName)
	c.Assert(retrievedSystem.StarPosX, check.Equals, float64(0))

	systemWithStarPos := &System{
		Name:          systemName,
		SystemAddress: systemAdrress,
		StarPosX:      starPos[0],
		StarPosY:      starPos[1],
		StarPosZ:      starPos[2],
	}

	err = SaveSystem(systemWithStarPos)
	c.Assert(err, check.IsNil)

	newRetrievedSystem, err := GetSystemByAddress(system.SystemAddress)
	c.Assert(err, check.IsNil)
	c.Assert(newRetrievedSystem.Name, check.Equals, systemName)
	c.Assert(newRetrievedSystem.ID, check.Equals, retrievedSystem.ID)
	c.Assert(newRetrievedSystem.StarPosX, check.Equals, starPos[0])
	c.Assert(newRetrievedSystem.StarPosY, check.Equals, starPos[1])
	c.Assert(newRetrievedSystem.StarPosZ, check.Equals, starPos[2])

	systemWithoutStarPos := &System{
		Name:          systemName,
		SystemAddress: systemAdrress,
	}

	err = SaveSystem(systemWithoutStarPos)
	c.Assert(err, check.IsNil)
	againRetrievedSystem, err := GetSystemByAddress(system.SystemAddress)
	c.Assert(err, check.IsNil)
	c.Assert(againRetrievedSystem.Name, check.Equals, systemName)
	c.Assert(againRetrievedSystem.ID, check.Equals, newRetrievedSystem.ID)
	c.Assert(againRetrievedSystem.StarPosX, check.Equals, starPos[0])
	c.Assert(againRetrievedSystem.StarPosY, check.Equals, starPos[1])
	c.Assert(againRetrievedSystem.StarPosZ, check.Equals, starPos[2])
}

func (s *ModelSuite) TestGetSystemByAddress(c *check.C) {
	system := &System{
		Name:          "Oochost VC-Z b5-0",
		SystemAddress: 658605548081,
		StarPosX:      -906.18750,
		StarPosY:      -275.81250,
		StarPosZ:      -2205.34375,
	}

	err := SaveSystem(system)
	c.Assert(err, check.IsNil)

	retrievedSystem, err := GetSystemByAddress(system.SystemAddress)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedSystem.ID, check.Equals, system.ID)
}

func (s *ModelSuite) TestGetSystemByName(c *check.C) {
	system := &System{
		Name:          "Oochost VC-Z b5-0",
		SystemAddress: 658605548081,
		StarPosX:      -906.18750,
		StarPosY:      -275.81250,
		StarPosZ:      -2205.34375,
	}

	err := SaveSystem(system)
	c.Assert(err, check.IsNil)

	retrievedSystem, err := GetSystemByName(system.Name)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedSystem.ID, check.Equals, system.ID)
}

func (s *ModelSuite) TestGetSystemWithBodies(c *check.C) {
	system := &System{
		Name:          "Oochost VC-Z b5-0",
		SystemAddress: 658605548081,
		StarPosX:      -906.18750,
		StarPosY:      -275.81250,
		StarPosZ:      -2205.34375,
	}

	err := SaveSystem(system)
	c.Assert(err, check.IsNil)

	body := &Body{
		Name:         "Oochost VC-Z b5-0 A",
		BodySystemID: 1,
		SystemID:     system.ID,
		System:       *system,
		BodyType:     "Planet",
	}

	err = SaveBody(body)
	c.Assert(err, check.IsNil)

	signal := &Signal{
		SystemID: system.ID,
		System:   *system,
		BodyID:   body.ID,
		Body:     *body,
		Type:     SignalBiological,
		SubType:  "Bacterium,Fungoida",
		Count:    2,
	}

	err = SaveSignal(signal)
	c.Assert(err, check.IsNil)

	explScan := &ExplorationScan{
		SystemID:            system.ID,
		System:              *system,
		BodyID:              body.ID,
		Body:                *body,
		Timestamp:           time.Now(),
		EfficiencyTargetMet: true,
		DataSold:            false,
		DataLost:            false,
		EstimatedEarnings:   1000000,
	}

	err = SaveExplorationScan(explScan)
	c.Assert(err, check.IsNil)

	bioScan := &BiologicalScan{
		SystemID:          system.ID,
		System:            *system,
		BodyID:            body.ID,
		Body:              *body,
		Timestamp:         time.Now(),
		Genus:             string(GenusBacterium),
		Species:           string(SpeciesBacteriumCerbrus),
		Variant:           "Bacterium Cerbrus - Lime",
		DataSold:          false,
		DataLost:          false,
		EstimatedEarnings: 5000000,
	}

	err = SaveBiologicalScan(bioScan)
	c.Assert(err, check.IsNil)

	retrievedSystem, err := GetSystemWithBodies(system)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedSystem.ID, check.Equals, system.ID)

	c.Assert(retrievedSystem.Bodies, check.HasLen, 1)
	c.Assert(retrievedSystem.Bodies[0].ID, check.Equals, body.ID)

	c.Assert(retrievedSystem.Bodies[0].Signals, check.HasLen, 1)
	c.Assert(retrievedSystem.Bodies[0].Signals[0].Type, check.Equals, SignalBiological)

	c.Assert(retrievedSystem.Bodies[0].ExplorationScans, check.HasLen, 1)
	c.Assert(retrievedSystem.Bodies[0].ExplorationScans[0].EstimatedEarnings, check.Equals, explScan.EstimatedEarnings)

	c.Assert(retrievedSystem.Bodies[0].BiologicalScans, check.HasLen, 1)
	c.Assert(retrievedSystem.Bodies[0].BiologicalScans[0].Variant, check.Equals, bioScan.Variant)
}
