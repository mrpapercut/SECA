package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventFSDTarget(c *check.C) {
	systemNames := []string{"Oochost WK-V d3-1", "Oochost AR-T d4-2", "Oochost HZ-A c16-1"}
	systemAddresses := []int64{44669290659, 79029029035, 357656498570}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T09:10:45Z", "event":"FSDTarget", "Name":"Oochost WK-V d3-1", "SystemAddress":44669290659, "StarClass":"F", "RemainingJumpsInRoute":18 }`,
		`{ "timestamp":"2025-01-11T09:12:07Z", "event":"FSDTarget", "Name":"Oochost AR-T d4-2", "SystemAddress":79029029035, "StarClass":"A", "RemainingJumpsInRoute":17 }`,
		`{ "timestamp":"2025-01-11T09:23:45Z", "event":"FSDTarget", "Name":"Oochost HZ-A c16-1", "SystemAddress":357656498570, "StarClass":"K", "RemainingJumpsInRoute":13 }`,
	}

	for _, rawEvent := range rawEvents {
		err := s.eventHandler.handleEventFSDTarget(rawEvent)
		c.Assert(err, check.IsNil)
	}

	for i, systemName := range systemNames {
		systemAddress := systemAddresses[i]

		system, err := models.GetSystemByAddress(systemAddress)
		c.Assert(err, check.IsNil)
		c.Assert(system.Name, check.Equals, systemName)
	}
}
