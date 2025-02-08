package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventStatus(c *check.C) {
	rawEvents := []string{
		`{ "timestamp":"2025-02-07T19:03:53Z", "event":"Status", "Flags":18874380, "Flags2":0, "Pips":[6,6,0], "FireGroup":0, "GuiFocus":0, "Fuel":{ "FuelMain":32.000000, "FuelReservoir":0.604885 }, "Cargo":0.000000, "LegalState":"Clean", "Latitude":-4.919272, "Longitude":75.453941, "Heading":101, "Altitude":3552, "BodyName":"Hypaa Hypoo HC-B d14-0 A 5", "PlanetRadius":1159048.125000, "Balance":1371232390, "Destination":{ "System":8312981115, "Body":8, "Name":"Hypaa Hypoo HC-B d14-0 A 5" } }`,
		`{ "timestamp":"2025-02-07T19:17:19Z", "event":"Status", "Flags":2097158, "Flags2":32785, "Oxygen":1.000000, "Health":1.000000, "Temperature":224.418503, "SelectedWeapon":"$humanoid_sampletool_name;", "SelectedWeapon_Localised":"Genetic Sampler", "Gravity":0.165364, "LegalState":"Clean", "Latitude":-4.897648, "Longitude":75.500778, "Heading":52, "BodyName":"Hypaa Hypoo HC-B d14-0 A 5", "PlanetRadius":1159048.125000, "Balance":1371232390 }`,
		`{ "timestamp":"2025-02-07T17:36:42Z", "event":"Status", "Flags":150994968, "Flags2":0, "Pips":[4,8,0], "FireGroup":1, "GuiFocus":0, "Fuel":{ "FuelMain":24.801229, "FuelReservoir":0.960427 }, "Cargo":0.000000, "LegalState":"Clean", "Balance":1371232390, "Destination":{ "System":342490025218, "Body":0, "Name":"Syreadiae HS-F c1" } }`,
	}

	err := s.eventHandler.handleEventStatus(rawEvents[0])
	c.Assert(err, check.IsNil)

	status := models.GetStatus()
	c.Assert(status.Credits, check.Equals, int64(1371232390))
	c.Assert(status.CurrentBody, check.Equals, "Hypaa Hypoo HC-B d14-0 A 5")
	c.Assert(status.FuelLevel, check.Equals, float64(32.0))
	c.Assert(status.State, check.Equals, models.StateFlying)

	models.ClearStatus()

	err = s.eventHandler.handleEventStatus(rawEvents[1])
	c.Assert(err, check.IsNil)

	status = models.GetStatus()
	c.Assert(status.Credits, check.Equals, int64(1371232390))
	c.Assert(status.CurrentBody, check.Equals, "Hypaa Hypoo HC-B d14-0 A 5")
	c.Assert(status.State, check.Equals, models.StateBioScanning)

	models.ClearStatus()

	err = s.eventHandler.handleEventStatus(rawEvents[2])
	c.Assert(err, check.IsNil)

	status = models.GetStatus()
	c.Assert(status.State, check.Equals, models.StateSupercruise)
}
