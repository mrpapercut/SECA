package models

import (
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
