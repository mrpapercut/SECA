package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventCommander(c *check.C) {
	commanderName := "Montgomery Agogo"
	rawEvents := []string{
		fmt.Sprintf(`{ "timestamp":"2025-01-11T10:06:15Z", "event":"Commander", "FID":"F9243357", "Name":"%s" }`, commanderName),
		fmt.Sprintf(`{ "timestamp":"2025-01-11T13:02:41Z", "event":"Commander", "FID":"F9243357", "Name":"%s" }`, commanderName),
	}

	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)
	c.Assert(status.CommanderName, check.Equals, "")

	for _, rawEvent := range rawEvents {
		err = s.eventHandler.handleEventCommander(rawEvent)
		c.Assert(err, check.IsNil)
	}

	updatedStatus, err := models.GetStatus()
	c.Assert(err, check.IsNil)
	c.Assert(updatedStatus.CommanderName, check.Equals, commanderName)
}
