package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

// { "timestamp":"2024-12-31T16:00:58Z", "event":"FSSSignalDiscovered", "SystemAddress":10477373803, "SignalName":"$Warzone_Powerplay_Med:#index=4;", "SignalName_Localised":"Power Conflict Zone [Medium Intensity]", "SignalType":"Combat" }

type FSSSignalDiscovered struct {
	GenericEvent
	SystemAddress        int64
	SignalName           string
	SignalName_Localised string
	SignalType           string
	IsStation            bool
}

func (eh *EventHandler) handleEventFSSSignalDiscovered(rawEvent string) error {
	event, err := ParseEvent[FSSSignalDiscovered](rawEvent)
	if err != nil {
		return err
	}

	system, err := models.GetSystemByAddress(event.SystemAddress)
	if err != nil {
		return fmt.Errorf("error getting system for body: %v", err)
	}

	signalName := event.SignalName
	if event.SignalName_Localised != "" {
		signalName = event.SignalName_Localised
	}

	signal := &models.FSSSignal{
		SystemID:   system.ID,
		System:     *system,
		SignalName: signalName,
		SignalType: event.SignalType,
		IsStation:  event.IsStation,
	}

	err = models.SaveFSSSignal(signal)
	if err != nil {
		return fmt.Errorf("error saving fss signal: %v", err)
	}

	return nil
}

/* Signal types:
Type					Raw event
Outpost					{ "timestamp":"2024-12-16T13:04:30Z", "event":"FSSSignalDiscovered", "SystemAddress":672028435905, "SignalName":"Younghusband Colony", "SignalType":"Outpost" }
Megaship				{ "timestamp":"2024-12-16T09:21:15Z", "event":"FSSSignalDiscovered", "SystemAddress":6681123623626, "SignalName":"Lowell Class Science Vessel HLD-667", "SignalType":"Megaship" }
StationMegaShip			{ "timestamp":"2024-12-27T15:20:04Z", "event":"FSSSignalDiscovered", "SystemAddress":22654744341665, "SignalName":"CB-12 The Plutonium Pearl", "SignalType":"StationMegaShip", "IsStation":true }
StationBernalSphere		{ "timestamp":"2024-12-16T13:04:23Z", "event":"FSSSignalDiscovered", "SystemAddress":672028435905, "SignalName":"Kennedy Dock", "SignalType":"StationBernalSphere", "IsStation":true }
StationONeilOrbis		{ "timestamp":"2024-12-16T14:35:38Z", "event":"FSSSignalDiscovered", "SystemAddress":1110005778795, "SignalName":"Ampere Enterprise", "SignalType":"StationONeilOrbis", "IsStation":true }
StationONeilCylinder	{ "timestamp":"2024-12-27T21:55:07Z", "event":"FSSSignalDiscovered", "SystemAddress":3932277478106, "SignalName":"Jameson Memorial", "SignalType":"StationONeilCylinder", "IsStation":true }
Installation			{ "timestamp":"2024-12-16T10:16:57Z", "event":"FSSSignalDiscovered", "SystemAddress":2871588431249, "SignalName":"Associated Environment Administration", "SignalType":"Installation" }
StationAsteroid			{ "timestamp":"2025-01-31T21:16:24Z", "event":"FSSSignalDiscovered", "SystemAddress":599819492697, "SignalName":"Farsight Expedition Base", "SignalType":"StationAsteroid", "IsStation":true }
TouristBeacon			{ "timestamp":"2025-02-01T16:01:27Z", "event":"FSSSignalDiscovered", "SystemAddress":1211977713491, "SignalName":"Children of Raxxla Staging Post", "SignalType":"TouristBeacon" }
FleetCarrier			{ "timestamp":"2024-12-29T11:10:58Z", "event":"FSSSignalDiscovered", "SystemAddress":27076330676, "SignalName":"SOLUS V3L-W4Z", "SignalType":"FleetCarrier", "IsStation":true }
ResourceExtraction		{ "timestamp":"2024-12-31T15:57:11Z", "event":"FSSSignalDiscovered", "SystemAddress":10477373803, "SignalName":"$MULTIPLAYER_SCENARIO14_TITLE;", "SignalName_Localised":"Resource Extraction Site", "SignalType":"ResourceExtraction" }
NavBeacon				{ "timestamp":"2024-12-29T17:16:17Z", "event":"FSSSignalDiscovered", "SystemAddress":13866167707081, "SignalName":"$MULTIPLAYER_SCENARIO42_TITLE;", "SignalName_Localised":"Nav Beacon", "SignalType":"NavBeacon" }
Combat					{ "timestamp":"2024-12-28T21:01:26Z", "event":"FSSSignalDiscovered", "SystemAddress":35855326520745, "SignalName":"$Warzone_PointRace_High:#index=1;", "SignalName_Localised":"Conflict Zone [High Intensity]", "SignalType":"Combat" }
Codex					{ "timestamp":"2025-01-11T09:40:03Z", "event":"FSSSignalDiscovered", "SystemAddress":664511259553, "SignalName":"$Fixed_Event_Life_Cloud;", "SignalName_Localised":"Notable stellar phenomena", "SignalType":"Codex" }
StationCoriolis			{ "timestamp":"2024-12-16T14:36:59Z", "event":"FSSSignalDiscovered", "SystemAddress":11666339210657, "SignalName":"Nobleport", "SignalType":"StationCoriolis", "IsStation":true }
Titan					{ "timestamp":"2025-01-01T08:25:31Z", "event":"FSSSignalDiscovered", "SystemAddress":10477373803, "SignalName":"Titan Cocijo", "SignalType":"Titan" }
USS						{ "timestamp":"2025-01-01T13:39:02Z", "event":"FSSSignalDiscovered", "SystemAddress":7230812328674, "SignalName":"$USS_ConvoyDispersalPattern;", "SignalName_Localised":"Unidentified signal source", "SignalType":"USS", "USSType":"$USS_Type_Convoy;", "USSType_Localised":"Convoy dispersal pattern", "SpawningState":"$FactionState_War_desc;", "SpawningState_Localised":"The War state represents a conflict between the controlling faction in a system and a new faction that has expanded into the system.", "SpawningFaction":"Nik Future", "ThreatLevel":4, "TimeRemaining":887.569214 }
Generic					[{ "timestamp":"2024-12-31T16:00:58Z", "event":"FSSSignalDiscovered", "SystemAddress":10477373803, "SignalName":"$NumberStation:#index=1;", "SignalName_Localised":"Unregistered Comms Beacon", "SignalType":"Generic" },{ "timestamp":"2024-12-31T16:00:58Z", "event":"FSSSignalDiscovered", "SystemAddress":10477373803, "SignalName":"Memorial - The Second Thargoid War", "SignalType":"Generic" },{ "timestamp":"2024-12-31T16:00:58Z", "event":"FSSSignalDiscovered", "SystemAddress":10477373803, "SignalName":"Pilots' Memorial", "SignalType":"Generic" }]
*/
