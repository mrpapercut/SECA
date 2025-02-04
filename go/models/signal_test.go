package models

import (
	"gopkg.in/check.v1"
)

func (s *ModelSuite) TestCreateGeologicalSignal(c *check.C) {
	system := s.SampleSystem
	err := SaveSystem(system)
	c.Assert(err, check.IsNil)

	body := s.SamplePlanet
	err = SaveBody(body)
	c.Assert(err, check.IsNil)

	signal := &BodySignal{
		SystemID: system.ID,
		System:   *system,
		BodyID:   body.ID,
		Body:     *body,
		Type:     SignalGeological,
		Count:    1,
	}

	err = SaveBodySignal(signal)
	c.Assert(err, check.IsNil)

	retrievedSignals, err := GetBodySignals(body)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedSignals, check.HasLen, 1)
	c.Assert(retrievedSignals[0].Type, check.Equals, signal.Type)
}

func (s *ModelSuite) TestCreateBiologicalSignals(c *check.C) {
	system := s.SampleSystem
	err := SaveSystem(system)
	c.Assert(err, check.IsNil)

	body := s.SamplePlanet
	err = SaveBody(body)
	c.Assert(err, check.IsNil)

	noRetrievedSignals, err := GetBodySignals(body)
	c.Assert(err, check.IsNil)
	c.Assert(noRetrievedSignals, check.HasLen, 0)

	signal := &BodySignal{
		SystemID: system.ID,
		System:   *system,
		BodyID:   body.ID,
		Body:     *body,
		Type:     SignalBiological,
		Count:    2,
	}

	err = SaveBodySignal(signal)
	c.Assert(err, check.IsNil)

	retrievedSignals, err := GetBodySignals(body)
	c.Assert(err, check.IsNil)
	c.Assert(retrievedSignals, check.HasLen, 1)
	c.Assert(retrievedSignals[0].Count, check.Equals, signal.Count)

	updatedSignal := &BodySignal{
		SystemID: system.ID,
		System:   *system,
		BodyID:   body.ID,
		Body:     *body,
		Type:     SignalBiological,
		SubType:  "Bacterium,Strata",
		Count:    2,
	}

	err = SaveBodySignal(updatedSignal)
	c.Assert(err, check.IsNil)

	retriedUpdatedSignals, err := GetBodySignals(body)
	c.Assert(err, check.IsNil)
	c.Assert(retriedUpdatedSignals, check.HasLen, 1)
	c.Assert(retriedUpdatedSignals[0].SubType, check.Equals, updatedSignal.SubType)
}
