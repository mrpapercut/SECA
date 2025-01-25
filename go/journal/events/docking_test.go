package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventDocked(c *check.C) {
	stations := []string{"V2B-BXV", "Mic Turner Base", "Onizuka Gateway", "Treshchov Gateway"}
	systems := []string{"S171 7", "California Sector BA-A e6", "Ruwachis", "Baroahy"}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T15:41:55Z", "event":"Docked", "StationName":"V2B-BXV", "StationType":"FleetCarrier", "Taxi":false, "Multicrew":false, "StarSystem":"S171 7", "SystemAddress":44400783, "MarketID":3702789120, "StationFaction":{ "Name":"FleetCarrier" }, "StationGovernment":"$government_Carrier;", "StationGovernment_Localised":"Private Ownership", "StationServices":[ "dock", "autodock", "commodities", "contacts", "exploration", "crewlounge", "rearm", "refuel", "repair", "engineer", "flightcontroller", "stationoperations", "stationMenu", "carriermanagement", "carrierfuel", "socialspace", "vistagenomics" ], "StationEconomy":"$economy_Carrier;", "StationEconomy_Localised":"Private Enterprise", "StationEconomies":[ { "Name":"$economy_Carrier;", "Name_Localised":"Private Enterprise", "Proportion":1.000000 } ], "DistFromStarLS":0.000000, "LandingPads":{ "Small":4, "Medium":4, "Large":8 } }`,
		`{ "timestamp":"2025-01-11T10:01:49Z", "event":"Docked", "StationName":"Mic Turner Base", "StationType":"CraterOutpost", "Taxi":false, "Multicrew":false, "StarSystem":"California Sector BA-A e6", "SystemAddress":27072119940, "MarketID":128737014, "StationFaction":{ "Name":"Turner Research Group", "FactionState":"Boom" }, "StationGovernment":"$government_Dictatorship;", "StationGovernment_Localised":"Dictatorship", "StationAllegiance":"Alliance", "StationServices":[ "dock", "autodock", "commodities", "contacts", "exploration", "missions", "outfitting", "crewlounge", "rearm", "refuel", "repair", "tuning", "engineer", "missionsgenerated", "flightcontroller", "stationoperations", "powerplay", "searchrescue", "stationMenu", "shop", "livery", "socialspace", "bartender", "vistagenomics", "pioneersupplies", "apexinterstellar", "frontlinesolutions" ], "StationEconomy":"$economy_HighTech;", "StationEconomy_Localised":"High Tech", "StationEconomies":[ { "Name":"$economy_HighTech;", "Name_Localised":"High Tech", "Proportion":1.000000 } ], "DistFromStarLS":46.684772, "LandingPads":{ "Small":4, "Medium":4, "Large":4 } }`,
		`{ "timestamp":"2025-01-03T11:14:20Z", "event":"Docked", "StationName":"Onizuka Gateway", "StationType":"Ocellus", "Taxi":false, "Multicrew":false, "StarSystem":"Ruwachis", "SystemAddress":13866167707081, "MarketID":3230760448, "StationFaction":{ "Name":"Sitakapan Expeditionary Forces", "FactionState":"Expansion" }, "StationGovernment":"$government_Dictatorship;", "StationGovernment_Localised":"Dictatorship", "StationAllegiance":"Empire", "StationServices":[ "dock", "autodock", "commodities", "contacts", "exploration", "missions", "outfitting", "crewlounge", "rearm", "refuel", "repair", "shipyard", "tuning", "engineer", "missionsgenerated", "flightcontroller", "stationoperations", "powerplay", "searchrescue", "stationMenu", "shop", "livery", "modulepacks", "socialspace", "bartender", "vistagenomics", "pioneersupplies", "apexinterstellar", "frontlinesolutions" ], "StationEconomy":"$economy_Industrial;", "StationEconomy_Localised":"Industrial", "StationEconomies":[ { "Name":"$economy_Industrial;", "Name_Localised":"Industrial", "Proportion":0.800000 }, { "Name":"$economy_Refinery;", "Name_Localised":"Refinery", "Proportion":0.200000 } ], "DistFromStarLS":49.789490, "LandingPads":{ "Small":17, "Medium":18, "Large":9 } }`,
		`{ "timestamp":"2025-01-03T11:38:19Z", "event":"Docked", "StationName":"Treshchov Gateway", "StationType":"Coriolis", "Taxi":false, "Multicrew":false, "StarSystem":"Baroahy", "SystemAddress":3107710866154, "MarketID":3230317312, "StationFaction":{ "Name":"Independents of Baroahy" }, "StationGovernment":"$government_Democracy;", "StationGovernment_Localised":"Democracy", "StationAllegiance":"Federation", "StationServices":[ "dock", "autodock", "blackmarket", "commodities", "contacts", "exploration", "missions", "outfitting", "crewlounge", "rearm", "refuel", "repair", "shipyard", "tuning", "engineer", "missionsgenerated", "flightcontroller", "stationoperations", "powerplay", "searchrescue", "materialtrader", "stationMenu", "shop", "livery", "socialspace", "bartender", "vistagenomics", "pioneersupplies", "apexinterstellar", "frontlinesolutions" ], "StationEconomy":"$economy_Industrial;", "StationEconomy_Localised":"Industrial", "StationEconomies":[ { "Name":"$economy_Industrial;", "Name_Localised":"Industrial", "Proportion":0.770000 }, { "Name":"$economy_Extraction;", "Name_Localised":"Extraction", "Proportion":0.230000 } ], "DistFromStarLS":30.751640, "LandingPads":{ "Small":17, "Medium":18, "Large":9 } }`,
	}

	for i, rawEvent := range rawEvents {
		err := s.eventHandler.handleEventDocked(rawEvent)
		c.Assert(err, check.IsNil)

		status, err := models.GetStatus()
		c.Assert(err, check.IsNil)
		c.Assert(status.Body, check.Equals, stations[i])
		c.Assert(status.System, check.Equals, systems[i])
		c.Assert(status.Docked, check.Equals, true)
		c.Assert(status.Landed, check.Equals, false)
		c.Assert(status.OnFoot, check.Equals, false)
	}
}

func (s *EventSuite) TestHandleEventUndocked(c *check.C) {
	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)

	status.Docked = true
	status.Landed = false
	status.OnFoot = false

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	rawEvent := `{ "timestamp":"2025-01-03T11:49:31Z", "event":"Undocked", "StationName":"Onizuka Gateway", "StationType":"Ocellus", "MarketID":3230760448, "Taxi":false, "Multicrew":false }`

	err = s.eventHandler.handleEventUndocked(rawEvent)
	c.Assert(err, check.IsNil)

	updatedStatus, err := models.GetStatus()
	c.Assert(err, check.IsNil)
	c.Assert(updatedStatus.Docked, check.Equals, false)
}

func (s *EventSuite) TestHandleEventEmbark(c *check.C) {
	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)

	status.Docked = false
	status.Landed = false

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	isOnStation := []bool{false, false, true}
	isOnPlanet := []bool{true, true, false}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T11:02:34Z", "event":"Embark", "SRV":false, "Taxi":false, "Multicrew":false, "ID":5, "StarSystem":"California Sector BA-A e6", "SystemAddress":27072119940, "Body":"California Sector BA-A e6 4", "BodyID":8, "OnStation":false, "OnPlanet":true }`,
		`{ "timestamp":"2025-01-11T12:05:38Z", "event":"Embark", "SRV":true, "Taxi":false, "Multicrew":false, "ID":6, "StarSystem":"Outopps BO-A b55-0", "SystemAddress":654311629785, "Body":"Outopps BO-A b55-0 4 a", "BodyID":6, "OnStation":false, "OnPlanet":true }`,
		`{ "timestamp":"2025-01-03T11:05:32Z", "event":"Embark", "SRV":false, "Taxi":false, "Multicrew":false, "ID":7, "StarSystem":"Ailurians", "SystemAddress":2871319995833, "Body":"Broglie Port", "BodyID":8, "OnStation":true, "OnPlanet":false, "StationName":"Broglie Port", "StationType":"Outpost", "MarketID":3230041856 }`,
	}

	for i, rawEvent := range rawEvents {
		err = s.eventHandler.handleEventEmbark(rawEvent)
		c.Assert(err, check.IsNil)

		updatedStatus, err := models.GetStatus()
		c.Assert(err, check.IsNil)
		c.Assert(updatedStatus.Docked, check.Equals, isOnStation[i])
		c.Assert(updatedStatus.Landed, check.Equals, isOnPlanet[i])
		c.Assert(updatedStatus.OnFoot, check.Equals, false)
	}
}

func (s *EventSuite) TestHandleEventDisembark(c *check.C) {
	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)

	status.OnFoot = false

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	isOnStation := []bool{false, false, true}
	isOnPlanet := []bool{true, true, false}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T11:04:14Z", "event":"Disembark", "SRV":false, "Taxi":false, "Multicrew":false, "ID":5, "StarSystem":"California Sector BA-A e6", "SystemAddress":27072119940, "Body":"California Sector BA-A e6 4", "BodyID":8, "OnStation":false, "OnPlanet":true }`,
		`{ "timestamp":"2025-01-11T12:05:18Z", "event":"Disembark", "SRV":true, "Taxi":false, "Multicrew":false, "ID":6, "StarSystem":"Outopps BO-A b55-0", "SystemAddress":654311629785, "Body":"Outopps BO-A b55-0 4 a", "BodyID":6, "OnStation":false, "OnPlanet":true }`,
		`{ "timestamp":"2025-01-02T21:48:46Z", "event":"Disembark", "SRV":false, "Taxi":false, "Multicrew":false, "ID":7, "StarSystem":"Ailurians", "SystemAddress":2871319995833, "Body":"Broglie Port", "BodyID":8, "OnStation":true, "OnPlanet":false, "StationName":"Broglie Port", "StationType":"Outpost", "MarketID":3230041856 }`,
	}

	for i, rawEvent := range rawEvents {
		err = s.eventHandler.handleEventDisembark(rawEvent)
		c.Assert(err, check.IsNil)

		updatedStatus, err := models.GetStatus()
		c.Assert(err, check.IsNil)
		c.Assert(updatedStatus.Docked, check.Equals, isOnStation[i])
		c.Assert(updatedStatus.Landed, check.Equals, isOnPlanet[i])
		c.Assert(updatedStatus.OnFoot, check.Equals, true)
	}
}

func (s EventSuite) TestHandleEventTouchdown(c *check.C) {
	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)

	status.Landed = false

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	rawEvent := `{ "timestamp":"2025-01-10T16:45:28Z", "event":"Touchdown", "PlayerControlled":true, "Taxi":false, "Multicrew":false, "StarSystem":"Synuefai YD-K d8-2", "SystemAddress":79163033931, "Body":"Synuefai YD-K d8-2 AB 7 b", "BodyID":67, "OnStation":false, "OnPlanet":true, "Latitude":-41.062263, "Longitude":76.115097 }`

	err = s.eventHandler.handleEventTouchdown(rawEvent)
	c.Assert(err, check.IsNil)

	updatedStatus, err := models.GetStatus()
	c.Assert(err, check.IsNil)
	c.Assert(updatedStatus.Docked, check.Equals, false)
	c.Assert(updatedStatus.Landed, check.Equals, true)
	c.Assert(updatedStatus.OnFoot, check.Equals, false)
}

func (s EventSuite) TestHandleEventLiftoff(c *check.C) {
	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)

	status.Landed = false

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	rawEvent := `{ "timestamp":"2025-01-11T13:04:28Z", "event":"Liftoff", "PlayerControlled":true, "Taxi":false, "Multicrew":false, "StarSystem":"Outopps BO-A b55-0", "SystemAddress":654311629785, "Body":"Outopps BO-A b55-0 4 a", "BodyID":6, "OnStation":false, "OnPlanet":true, "Latitude":5.385210, "Longitude":-6.047650 }`

	err = s.eventHandler.handleEventLiftoff(rawEvent)
	c.Assert(err, check.IsNil)

	updatedStatus, err := models.GetStatus()
	c.Assert(err, check.IsNil)
	c.Assert(updatedStatus.Docked, check.Equals, false)
	c.Assert(updatedStatus.Landed, check.Equals, true)
	c.Assert(updatedStatus.OnFoot, check.Equals, false)
}

func (s EventSuite) TestHandleEventApproachBody(c *check.C) {
	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)

	status.Body = ""

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	bodies := []string{"Outopps BO-A b55-0 4 a", "Outorst VK-D c26-0 BC 1"}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T11:58:49Z", "event":"ApproachBody", "StarSystem":"Outopps BO-A b55-0", "SystemAddress":654311629785, "Body":"Outopps BO-A b55-0 4 a", "BodyID":6 }`,
		`{ "timestamp":"2025-01-11T13:49:54Z", "event":"ApproachBody", "StarSystem":"Outorst VK-D c26-0", "SystemAddress":80899871202, "Body":"Outorst VK-D c26-0 BC 1", "BodyID":16 }`,
	}

	for i, rawEvent := range rawEvents {
		err = s.eventHandler.handleEventApproachBody(rawEvent)
		c.Assert(err, check.IsNil)

		updatedStatus, err := models.GetStatus()
		c.Assert(err, check.IsNil)
		c.Assert(updatedStatus.Body, check.Equals, bodies[i])
	}
}

func (s EventSuite) TestHandleEventLeaveBody(c *check.C) {
	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)

	systemName := "Outopps BO-A b55-0"

	status.System = systemName
	status.Body = "Outopps BO-A b55-0 4 a"

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	rawEvent := `{ "timestamp":"2025-01-11T13:05:58Z", "event":"LeaveBody", "StarSystem":"Outopps BO-A b55-0", "SystemAddress":654311629785, "Body":"Outopps BO-A b55-0 4 a", "BodyID":6 }`

	err = s.eventHandler.handleEventLeaveBody(rawEvent)
	c.Assert(err, check.IsNil)

	updatedStatus, err := models.GetStatus()
	c.Assert(err, check.IsNil)
	c.Assert(updatedStatus.System, check.Equals, systemName)
	c.Assert(updatedStatus.Body, check.Equals, "")
}
