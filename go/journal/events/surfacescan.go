package events

type EventSAAScanComplete struct {
	Timestamp        EventTimestamp
	Event            EventType
	BodyName         BodyName
	SystemAddress    SystemAddress
	BodyID           BodyID
	ProbesUsed       int
	EfficiencyTarget int
}
