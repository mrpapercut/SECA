package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventLocation(c *check.C) {
	systemAddresses := []int64{658605548081, 27072119940, 27072119940, 654311629785, 44400783}
	systemNames := []string{"Oochost VC-Z b5-0", "California Sector BA-A e6", "California Sector BA-A e6", "Outopps BO-A b55-0", "S171 7"}
	bodies := []string{"Oochost VC-Z b5-0 A 3 d", "California Sector BA-A e6 4", "California Sector BA-A e6 4", "Outopps BO-A b55-0 4 a", "S171 7 A"}
	dockedStates := []bool{false, false, false, false, true}
	landedStates := []bool{false, true, true, false, false}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T09:05:43Z", "event":"Location", "Latitude":-43.006790, "Longitude":-52.472473, "DistFromStarLS":1716.184526, "Docked":false, "Taxi":false, "Multicrew":false, "StarSystem":"Oochost VC-Z b5-0", "SystemAddress":658605548081, "StarPos":[-906.18750,-275.81250,-2205.34375], "SystemAllegiance":"", "SystemEconomy":"$economy_None;", "SystemEconomy_Localised":"None", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_None;", "SystemGovernment_Localised":"None", "SystemSecurity":"$GAlAXY_MAP_INFO_state_anarchy;", "SystemSecurity_Localised":"Anarchy", "Population":0, "Body":"Oochost VC-Z b5-0 A 3 d", "BodyID":25, "BodyType":"Planet" }`,
		`{ "timestamp":"2025-01-11T10:07:12Z", "event":"Location", "DistFromStarLS":46.684772, "Docked":false, "OnFoot":true, "StarSystem":"California Sector BA-A e6", "SystemAddress":27072119940, "StarPos":[-319.81250,-216.75000,-913.46875], "SystemAllegiance":"Alliance", "SystemEconomy":"$economy_HighTech;", "SystemEconomy_Localised":"High Tech", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_Dictatorship;", "SystemGovernment_Localised":"Dictatorship", "SystemSecurity":"$SYSTEM_SECURITY_medium;", "SystemSecurity_Localised":"Medium Security", "Population":10000, "Body":"California Sector BA-A e6 4", "BodyID":8, "BodyType":"Planet", "Factions":[ { "Name":"Turner Research Group", "FactionState":"Boom", "Government":"Dictatorship", "Influence":0.847000, "Allegiance":"Alliance", "Happiness":"$Faction_HappinessBand2;", "Happiness_Localised":"Happy", "MyReputation":100.000000, "RecoveringStates":[ { "State":"Terrorism", "Trend":0 } ], "ActiveStates":[ { "State":"Boom" } ] }, { "Name":"Kumo Council", "FactionState":"Expansion", "Government":"Feudal", "Influence":0.153000, "Allegiance":"Independent", "Happiness":"$Faction_HappinessBand2;", "Happiness_Localised":"Happy", "MyReputation":0.000000, "ActiveStates":[ { "State":"Expansion" } ] } ], "SystemFaction":{ "Name":"Turner Research Group", "FactionState":"Boom" } }`,
		`{ "timestamp":"2025-01-11T11:01:44Z", "event":"Location", "DistFromStarLS":46.684773, "Docked":false, "OnFoot":true, "StarSystem":"California Sector BA-A e6", "SystemAddress":27072119940, "StarPos":[-319.81250,-216.75000,-913.46875], "SystemAllegiance":"Alliance", "SystemEconomy":"$economy_HighTech;", "SystemEconomy_Localised":"High Tech", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_Dictatorship;", "SystemGovernment_Localised":"Dictatorship", "SystemSecurity":"$SYSTEM_SECURITY_medium;", "SystemSecurity_Localised":"Medium Security", "Population":10000, "Body":"California Sector BA-A e6 4", "BodyID":8, "BodyType":"Planet", "Factions":[ { "Name":"Turner Research Group", "FactionState":"Boom", "Government":"Dictatorship", "Influence":0.847000, "Allegiance":"Alliance", "Happiness":"$Faction_HappinessBand2;", "Happiness_Localised":"Happy", "MyReputation":100.000000, "RecoveringStates":[ { "State":"Terrorism", "Trend":0 } ], "ActiveStates":[ { "State":"Boom" } ] }, { "Name":"Kumo Council", "FactionState":"Expansion", "Government":"Feudal", "Influence":0.153000, "Allegiance":"Independent", "Happiness":"$Faction_HappinessBand2;", "Happiness_Localised":"Happy", "MyReputation":0.000000, "ActiveStates":[ { "State":"Expansion" } ] } ], "SystemFaction":{ "Name":"Turner Research Group", "FactionState":"Boom" } }`,
		`{ "timestamp":"2025-01-11T13:02:58Z", "event":"Location", "Latitude":5.385210, "Longitude":-6.047650, "DistFromStarLS":792.211436, "Docked":false, "Taxi":false, "Multicrew":false, "StarSystem":"Outopps BO-A b55-0", "SystemAddress":654311629785, "StarPos":[-1242.81250,35.81250,-1160.56250], "SystemAllegiance":"", "SystemEconomy":"$economy_None;", "SystemEconomy_Localised":"None", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_None;", "SystemGovernment_Localised":"None", "SystemSecurity":"$GAlAXY_MAP_INFO_state_anarchy;", "SystemSecurity_Localised":"Anarchy", "Population":0, "Body":"Outopps BO-A b55-0 4 a", "BodyID":6, "BodyType":"Planet" }`,
		`{ "timestamp":"2025-01-11T15:53:30Z", "event":"Location", "Docked":true, "StationName":"V2B-BXV", "StationType":"FleetCarrier", "MarketID":3702789120, "StationFaction":{ "Name":"FleetCarrier" }, "StationGovernment":"$government_Carrier;", "StationGovernment_Localised":"Private Ownership", "StationServices":[ "dock", "autodock", "commodities", "contacts", "exploration", "crewlounge", "rearm", "refuel", "repair", "engineer", "flightcontroller", "stationoperations", "stationMenu", "carriermanagement", "carrierfuel", "socialspace", "vistagenomics" ], "StationEconomy":"$economy_Carrier;", "StationEconomy_Localised":"Private Enterprise", "StationEconomies":[ { "Name":"$economy_Carrier;", "Name_Localised":"Private Enterprise", "Proportion":1.000000 } ], "Taxi":false, "Multicrew":false, "StarSystem":"S171 7", "SystemAddress":44400783, "StarPos":[-2444.18750,298.03125,-1333.15625], "SystemAllegiance":"", "SystemEconomy":"$economy_None;", "SystemEconomy_Localised":"None", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_None;", "SystemGovernment_Localised":"None", "SystemSecurity":"$GAlAXY_MAP_INFO_state_anarchy;", "SystemSecurity_Localised":"Anarchy", "Population":0, "Body":"S171 7 A", "BodyID":1, "BodyType":"Star" }`,
	}

	for i, rawEvent := range rawEvents {
		err := s.eventHandler.handleEventLocation(rawEvent)
		c.Assert(err, check.IsNil)

		system, err := models.GetSystemByAddress(systemAddresses[i])
		c.Assert(err, check.IsNil)
		c.Assert(system.Name, check.Equals, systemNames[i])

		status, err := models.GetStatus()
		c.Assert(err, check.IsNil)
		c.Assert(status.System, check.Equals, systemNames[i])
		c.Assert(status.Body, check.Equals, bodies[i])
		c.Assert(status.Docked, check.DeepEquals, dockedStates[i])
		c.Assert(status.Landed, check.Equals, landedStates[i])
	}
}
