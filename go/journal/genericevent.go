package journal

import (
	"encoding/json"
	"time"
)

type Event struct {
	Timestamp time.Time `json:"timestamp"`
	Event     string    `json:"event"`
}

// GenericEvent is a generic event for all unimplemented Events
type GenericEvent struct {
	Event
	KeyValue map[string]interface{}
}

type _GenericEvent GenericEvent

// UnmarshalJSON unmarshalls a journal event into a GenericEvent, putting Event-specific fields into KeyValue
func (e *GenericEvent) UnmarshalJSON(bs []byte) (err error) {
	foo := _GenericEvent{}

	if err = json.Unmarshal(bs, &foo); err == nil {
		*e = GenericEvent(foo)
	}

	m := make(map[string]interface{})

	if err = json.Unmarshal(bs, &m); err == nil {
		delete(m, "timestamp")
		delete(m, "event")
		e.KeyValue = m
	}

	return err
}
