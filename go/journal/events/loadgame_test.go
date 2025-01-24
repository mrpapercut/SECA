package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventLoadGame(c *check.C) {
	shipType := "Anaconda"
	shipName := "Truffel-IV"
	credits := []int64{87504854, 99221483, 131122483, 79234752}
	landedStates := []bool{true, false, false, true}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T09:05:11Z", "event":"LoadGame", "FID":"F9243357", "Commander":"Montgomery Agogo", "Horizons":true, "Odyssey":true, "Ship":"Anaconda", "ShipID":5, "ShipName":"Truffel-IV", "ShipIdent":"MO-27A", "FuelLevel":23.991510, "FuelCapacity":32.000000, "StartLanded":true, "GameMode":"Solo", "Credits":87504854, "Loan":0, "language":"English/UK", "gameversion":"4.0.0.1904", "build":"r308767/r0 " }`,
		`{ "timestamp":"2025-01-11T10:06:15Z", "event":"LoadGame", "FID":"F9243357", "Commander":"Montgomery Agogo", "Horizons":true, "Odyssey":true, "Ship":"ExplorationSuit_Class1", "Ship_Localised":"Artemis Suit", "ShipID":4293000001, "ShipName":"", "ShipIdent":"", "FuelLevel":0.987092, "FuelCapacity":1.000000, "GameMode":"Open", "Credits":99221483, "Loan":0, "language":"English/UK", "gameversion":"4.0.0.1904", "build":"r308767/r0 " }`,
		`{ "timestamp":"2025-01-11T11:01:01Z", "event":"LoadGame", "FID":"F9243357", "Commander":"Montgomery Agogo", "Horizons":true, "Odyssey":true, "Ship":"ExplorationSuit_Class1", "Ship_Localised":"Artemis Suit", "ShipID":4293000001, "ShipName":"", "ShipIdent":"", "FuelLevel":0.987092, "FuelCapacity":1.000000, "GameMode":"Open", "Credits":131122483, "Loan":0, "language":"English/UK", "gameversion":"4.0.0.1904", "build":"r308767/r0 " }`,
		`{ "timestamp":"2025-01-11T13:02:41Z", "event":"LoadGame", "FID":"F9243357", "Commander":"Montgomery Agogo", "Horizons":true, "Odyssey":true, "Ship":"Anaconda", "ShipID":5, "ShipName":"Truffel-IV", "ShipIdent":"MO-27A", "FuelLevel":32.000000, "FuelCapacity":32.000000, "StartLanded":true, "GameMode":"Open", "Credits":79234752, "Loan":0, "language":"English/UK", "gameversion":"4.0.0.1904", "build":"r308767/r0 " }`,
	}

	for i, rawEvent := range rawEvents {
		err := s.eventHandler.handleEventLoadGame(rawEvent)
		c.Assert(err, check.IsNil)

		status, err := models.GetStatus()
		c.Assert(err, check.IsNil)
		c.Assert(status.ShipType, check.Equals, shipType)
		c.Assert(status.ShipName, check.Equals, shipName)
		c.Assert(status.Balance, check.Equals, credits[i])
		c.Assert(status.Landed, check.Equals, landedStates[i])
	}
}
