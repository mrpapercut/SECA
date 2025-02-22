package events

import (
	"encoding/json"
	"time"
)

type GenericEvent struct {
	Timestamp time.Time `json:"timestamp"`
	Event     string    `json:"event"`
}

type EventType string

const (
	Commander                EventType = "Commander"
	Location                 EventType = "Location"
	LoadGame                 EventType = "LoadGame"
	Loadout                  EventType = "Loadout"
	Scan                     EventType = "Scan"
	FSSBodySignals           EventType = "FSSBodySignals"
	SAAScanComplete          EventType = "SAAScanComplete"
	MultiSellExplorationData EventType = "MultiSellExplorationData"
	SellOrganicData          EventType = "SellOrganicData"
	Docked                   EventType = "Docked"
	Undocked                 EventType = "Undocked"
	Embark                   EventType = "Embark"
	Disembark                EventType = "Disembark"
	Statistics               EventType = "Statistics"
	Died                     EventType = "Died"
)

type EventTimestamp *time.Time

type BodyName string
type BodySystemID int64
type StarSystem string
type SystemAddress int64
type MarketID int64

type FSSBodySignalType string

const (
	SignalBiological FSSBodySignalType = "Biological"
	SignalGeological FSSBodySignalType = "Geological"
	SignalHuman      FSSBodySignalType = "Human"
	SignalThargoid   FSSBodySignalType = "Thargoid"
	SignalGuardian   FSSBodySignalType = "Guardian"
	SignalOther      FSSBodySignalType = "Other"
)

type FSSBodySignalGenus struct {
	Genus string `json:"Genus_Localised"`
}

type FSSBodySignal struct {
	Type  string `json:"Type_Localised"`
	Count int
}

type NamePercentMap struct {
	Name    string
	Percent float64
}

func ParseEvent[T any](rawEvent string) (T, error) {
	var t T
	err := json.Unmarshal([]byte(rawEvent), &t)
	if err != nil {
		return t, err
	}

	return t, nil
}

type EventHandler struct{}

func (eh *EventHandler) HandleEvent(eventType string, rawEvent string) error {
	switch eventType {
	case "Commander":
		return eh.handleEventCommander(rawEvent)
	case "LoadGame":
		return eh.handleEventLoadGame(rawEvent)
	case "Location":
		return eh.handleEventLocation(rawEvent)
	case "Statistics":
		return eh.handleEventStatistics(rawEvent)
	case "FSDJump":
		return eh.handleEventFSDJump(rawEvent)
	case "FSDTarget":
		return eh.handleEventFSDTarget(rawEvent)
	case "Scan":
		return eh.handleEventScan(rawEvent)
	case "FSSBodySignals":
		return eh.handleEventFSSBodySignals(rawEvent)
	case "SAASignalsFound":
		return eh.handleEventFSSBodySignals(rawEvent)
	case "SAAScanComplete":
		return eh.handleEventSAAScanComplete(rawEvent)
	case "ScanOrganic":
		return eh.handleEventScanOrganic(rawEvent)
	case "MultiSellExplorationData":
		return eh.handleEventMultiSellExplorationData(rawEvent)
	case "SellOrganicData":
		return eh.handleEventSellOrganicData(rawEvent)
	case "Died":
		return eh.handleEventDied(rawEvent)
	case "NavRoute":
		return eh.handleEventNavRoute(rawEvent)
	case "Docked":
		return eh.handleEventDocked(rawEvent)
	case "Undocked":
		return eh.handleEventUndocked(rawEvent)
	case "Embark":
		return eh.handleEventEmbark(rawEvent)
	case "Disembark":
		return eh.handleEventDisembark(rawEvent)
	case "Touchdown":
		return eh.handleEventTouchdown(rawEvent)
	case "Liftoff":
		return eh.handleEventLiftoff(rawEvent)
	case "ApproachBody":
		return eh.handleEventApproachBody(rawEvent)
	case "LeaveBody":
		return eh.handleEventLeaveBody(rawEvent)
	case "FSSSignalDiscovered":
		return eh.handleEventFSSSignalDiscovered(rawEvent)
	case "Loadout":
		return eh.handleEventLoadout(rawEvent)
	case "Status":
		return eh.handleEventStatus(rawEvent)
	case "Shutdown":
		return eh.handleEventShutdown(rawEvent)
	}

	return nil
}
