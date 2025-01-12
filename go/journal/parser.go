package journal

import (
	"github.com/mrpapercut/seca/journal/events"
)

type JournalParser struct {
}

func (jp *JournalParser) ProcessEvent(event events.EventType) error {
	return nil
}
