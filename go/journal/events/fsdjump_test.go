package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventFSDJump(c *check.C) {
	systemNames := []string{"Oochost LG-S b9-0", "Oochost SE-X d2-3", "Oochost WK-V d3-6"}
	systemAddresses := []int64{659142484561, 113388767387, 216467982499}
	bodyNames := []string{"Oochost LG-S b9-0", "Oochost SE-X d2-3", "Oochost WK-V d3-6 A"}
	bodySystemIDs := []int64{0, 0, 1}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T09:07:27Z", "event":"FSDJump", "Taxi":false, "Multicrew":false, "StarSystem":"Oochost LG-S b9-0", "SystemAddress":659142484561, "StarPos":[-880.96875,-262.71875,-2144.15625], "SystemAllegiance":"", "SystemEconomy":"$economy_None;", "SystemEconomy_Localised":"None", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_None;", "SystemGovernment_Localised":"None", "SystemSecurity":"$GAlAXY_MAP_INFO_state_anarchy;", "SystemSecurity_Localised":"Anarchy", "Population":0, "Body":"Oochost LG-S b9-0", "BodyID":0, "BodyType":"Star", "JumpDist":67.464, "FuelUsed":5.481114, "FuelLevel":18.510395 }`,
		`{ "timestamp":"2025-01-11T09:08:24Z", "event":"FSDJump", "Taxi":false, "Multicrew":false, "StarSystem":"Oochost SE-X d2-3", "SystemAddress":113388767387, "StarPos":[-852.15625,-231.90625,-2081.75000], "SystemAllegiance":"", "SystemEconomy":"$economy_None;", "SystemEconomy_Localised":"None", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_None;", "SystemGovernment_Localised":"None", "SystemSecurity":"$GAlAXY_MAP_INFO_state_anarchy;", "SystemSecurity_Localised":"Anarchy", "Population":0, "Body":"Oochost SE-X d2-3", "BodyID":0, "BodyType":"Star", "JumpDist":75.327, "FuelUsed":7.394805, "FuelLevel":19.818758 }`,
		`{ "timestamp":"2025-01-11T09:10:57Z", "event":"FSDJump", "Taxi":false, "Multicrew":false, "StarSystem":"Oochost WK-V d3-6", "SystemAddress":216467982499, "StarPos":[-811.12500,-224.84375,-2023.46875], "SystemAllegiance":"", "SystemEconomy":"$economy_None;", "SystemEconomy_Localised":"None", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_None;", "SystemGovernment_Localised":"None", "SystemSecurity":"$GAlAXY_MAP_INFO_state_anarchy;", "SystemSecurity_Localised":"Anarchy", "Population":0, "Body":"Oochost WK-V d3-6 A", "BodyID":1, "BodyType":"Star", "JumpDist":71.625, "FuelUsed":6.611027, "FuelLevel":25.388973 }`,
	}

	for _, rawEvent := range rawEvents {
		err := s.eventHandler.handleEventFSDJump(rawEvent)
		c.Assert(err, check.IsNil)
	}

	for i, systemName := range systemNames {
		systemAddress := systemAddresses[i]
		bodyName := bodyNames[i]
		bodySystemID := bodySystemIDs[i]

		system, err := models.GetSystemByAddress(systemAddress)
		c.Assert(err, check.IsNil)
		c.Assert(system.Name, check.Equals, systemName)

		systemID := system.ID

		bodyByID, err := models.GetBody(systemAddress, bodySystemID)
		c.Assert(err, check.IsNil)
		c.Assert(bodyByID.Name, check.Equals, bodyName)

		bodyByName, err := models.GetBodyByName(bodyName)
		c.Assert(err, check.IsNil)
		c.Assert(bodyByName.BodySystemID, check.Equals, bodySystemID)
		c.Assert(bodyByName.SystemID, check.Equals, systemID)
	}
}
