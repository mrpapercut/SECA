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

type EventHandlerLog struct {
	Commander                int64
	LoadGame                 int64
	Location                 int64
	Statistics               int64
	FSDJump                  int64
	FSDTarget                int64
	Scan                     int64
	FSSBodySignals           int64
	SAASignalsFound          int64
	SAAScanComplete          int64
	ScanOrganic              int64
	MultiSellExplorationData int64
	SellOrganicData          int64
	Died                     int64
	NavRoute                 int64
	Docked                   int64
	Undocked                 int64
	Embark                   int64
	Disembark                int64
	Touchdown                int64
	Liftoff                  int64
	ApproachBody             int64
	LeaveBody                int64
	FSSSignalDiscovered      int64
}

var EHL = EventHandlerLog{}

type EventHandler struct{}

func (eh *EventHandler) HandleEvent(eventType string, rawEvent string) error {
	switch eventType {
	case "Commander":
		EHL.Commander++
		return eh.handleEventCommander(rawEvent)
	case "LoadGame":
		EHL.LoadGame++
		return eh.handleEventLoadGame(rawEvent)
	case "Location":
		EHL.Location++
		return eh.handleEventLocation(rawEvent)
	case "Statistics":
		EHL.Statistics++
		return eh.handleEventStatistics(rawEvent)
	case "FSDJump":
		EHL.FSDJump++
		return eh.handleEventFSDJump(rawEvent)
	case "FSDTarget":
		EHL.FSDTarget++
		return eh.handleEventFSDTarget(rawEvent)
	case "Scan":
		EHL.Scan++
		return eh.handleEventScan(rawEvent)
	case "FSSBodySignals":
		EHL.FSSBodySignals++
		return eh.handleEventFSSBodySignals(rawEvent)
	case "SAASignalsFound":
		EHL.SAASignalsFound++
		return eh.handleEventFSSBodySignals(rawEvent)
	case "SAAScanComplete":
		EHL.SAAScanComplete++
		return eh.handleEventSAAScanComplete(rawEvent)
	case "ScanOrganic":
		EHL.ScanOrganic++
		return eh.handleEventScanOrganic(rawEvent)
	case "MultiSellExplorationData":
		EHL.MultiSellExplorationData++
		return eh.handleEventMultiSellExplorationData(rawEvent)
	case "SellOrganicData":
		EHL.SellOrganicData++
		return eh.handleEventSellOrganicData(rawEvent)
	case "Died":
		EHL.Died++
		return eh.handleEventDied(rawEvent)
	case "NavRoute":
		EHL.NavRoute++
		return eh.handleEventNavRoute(rawEvent)
	case "Docked":
		EHL.Docked++
		return eh.handleEventDocked(rawEvent)
	case "Undocked":
		EHL.Undocked++
		return eh.handleEventUndocked(rawEvent)
	case "Embark":
		EHL.Embark++
		return eh.handleEventEmbark(rawEvent)
	case "Disembark":
		EHL.Disembark++
		return eh.handleEventDisembark(rawEvent)
	case "Touchdown":
		EHL.Touchdown++
		return eh.handleEventTouchdown(rawEvent)
	case "Liftoff":
		EHL.Liftoff++
		return eh.handleEventLiftoff(rawEvent)
	case "ApproachBody":
		EHL.ApproachBody++
		return eh.handleEventApproachBody(rawEvent)
	case "LeaveBody":
		EHL.LeaveBody++
		return eh.handleEventLeaveBody(rawEvent)
	case "FSSSignalDiscovered":
		EHL.FSSSignalDiscovered++
		return eh.handleEventFSSSignalDiscovered(rawEvent)
	}

	return nil
}
