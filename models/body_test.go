package models

import (
	"gopkg.in/check.v1"
)

func (s *ModelSuite) TestSaveStar(c *check.C) {
	var err error

	system := &System{
		Name:          s.SampleSystem.Name,
		SystemAddress: s.SampleSystem.SystemAddress,
		StarPosX:      s.SampleSystem.StarPosX,
		StarPosY:      s.SampleSystem.StarPosY,
		StarPosZ:      s.SampleSystem.StarPosZ,
	}

	err = SaveSystem(system)
	c.Assert(err, check.IsNil)

	retrievedSystem, err := GetSystemByAddress(system.SystemAddress)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedSystem.Name, check.Equals, system.Name)

	star := &Body{
		Name:         s.SampleStar.Name,
		BodySystemID: s.SampleStar.BodySystemID,
		SystemID:     retrievedSystem.ID,
		System:       *retrievedSystem,
		BodyType:     s.SampleStar.BodyType,
	}

	err = SaveBody(star)
	c.Assert(err, check.IsNil)

	retrievedStar, err := GetBody(retrievedSystem.SystemAddress, star.BodySystemID)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedStar.BodySystemID, check.Equals, star.BodySystemID)
	c.Assert(retrievedStar.WasDiscovered, check.Equals, false)

	updatedStar := &Body{
		Name:          s.SampleStar.Name,
		BodySystemID:  s.SampleStar.BodySystemID,
		SystemID:      retrievedSystem.ID,
		System:        *retrievedSystem,
		BodyType:      s.SampleStar.BodyType,
		WasDiscovered: true,
		WasMapped:     true,
		Discovered:    true,
		Mapped:        true,
		Footfall:      true,
		StarType:      "F",
	}

	err = SaveBody(updatedStar)
	c.Assert(err, check.IsNil)

	var count int64
	err = db.Model(&Body{}).Count(&count).Error
	c.Assert(err, check.IsNil)
	c.Assert(count, check.Equals, int64(1))

	retrievedUpdatedStar, err := GetBody(retrievedSystem.SystemAddress, updatedStar.BodySystemID)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedUpdatedStar.StarType, check.Equals, updatedStar.StarType)
	c.Assert(retrievedUpdatedStar.WasDiscovered, check.Equals, true)

	emptyUpdatedStar := &Body{
		Name:         s.SampleStar.Name,
		BodySystemID: s.SampleStar.BodySystemID,
		SystemID:     retrievedSystem.ID,
		System:       *retrievedSystem,
		BodyType:     s.SampleStar.BodyType,
	}

	err = SaveBody(emptyUpdatedStar)
	c.Assert(err, check.IsNil)

	retrievedEmptyUpdatedStar, err := GetBody(retrievedSystem.SystemAddress, emptyUpdatedStar.BodySystemID)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedEmptyUpdatedStar.StarType, check.Equals, updatedStar.StarType)
	c.Assert(retrievedEmptyUpdatedStar.WasDiscovered, check.Equals, true)
}

func (s *ModelSuite) TestSetBodyDiscovered(c *check.C) {
	body := &Body{
		Name:         s.SamplePlanet.Name,
		BodySystemID: s.SamplePlanet.BodySystemID,
		SystemID:     1,
		BodyType:     "Planet",
	}

	err := SaveBody(body)
	c.Assert(err, check.IsNil)

	retrievedBody, err := GetBodyByName(s.SamplePlanet.Name)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedBody.Discovered, check.Equals, false)

	err = SetBodyDiscovered(body)
	c.Assert(err, check.IsNil)

	retrievedDiscoveredBody, err := GetBodyByName(s.SamplePlanet.Name)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedDiscoveredBody.Discovered, check.Equals, true)
}

func (s *ModelSuite) TestSetBodyMapped(c *check.C) {
	body := &Body{
		Name:         s.SamplePlanet.Name,
		BodySystemID: s.SamplePlanet.BodySystemID,
		SystemID:     1,
		BodyType:     "Planet",
	}

	err := SaveBody(body)
	c.Assert(err, check.IsNil)

	retrievedBody, err := GetBodyByName(s.SamplePlanet.Name)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedBody.Mapped, check.Equals, false)

	err = SetBodyMapped(body)
	c.Assert(err, check.IsNil)

	retrievedMappedBody, err := GetBodyByName(s.SamplePlanet.Name)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedMappedBody.Mapped, check.Equals, true)
}

func (s *ModelSuite) TestSetBodyFootfall(c *check.C) {
	body := &Body{
		Name:         s.SamplePlanet.Name,
		BodySystemID: s.SamplePlanet.BodySystemID,
		SystemID:     1,
		BodyType:     "Planet",
	}

	err := SaveBody(body)
	c.Assert(err, check.IsNil)

	retrievedBody, err := GetBodyByName(s.SamplePlanet.Name)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedBody.Footfall, check.Equals, false)

	err = SetBodyFootfall(body)
	c.Assert(err, check.IsNil)

	retrievedFootfallBody, err := GetBodyByName(s.SamplePlanet.Name)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedFootfallBody.Footfall, check.Equals, true)
}
