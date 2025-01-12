package events

type FSSBodySignalType string

const (
	SignalBiological FSSBodySignalType = "Biological"
	SignalGeological FSSBodySignalType = "Geological"
	SignalHuman      FSSBodySignalType = "Human"
	SignalThargoid   FSSBodySignalType = "Thargoid"
	SignalGuardian   FSSBodySignalType = "Guardian"
	SignalOther      FSSBodySignalType = "Other"
)

type FSSBodySignal struct {
	Type           string
	Type_Localised FSSBodySignalType
	Count          int
}

type EventFSSBodySignals struct {
	Timestamp     EventTimestamp
	Event         EventType
	BodyName      string
	BodyID        int64
	SystemAddress int64
	Signals       FSSBodySignalType
}

type EventFSSAllBodiesFound struct {
	Timestamp     EventTimestamp
	Event         EventType
	SystemName    string
	SystemAddress int64
	Count         int
}
