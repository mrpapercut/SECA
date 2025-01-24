package models

import (
	"math"

	"gopkg.in/check.v1"
)

func (s *ModelSuite) TestGetRoute(c *check.C) {
	route, err := GetRoute()
	c.Assert(err, check.IsNil)
	c.Assert(route, check.HasLen, 0)

	systems := []*System{{
		Name:          "NGC 7822 Sector FG-Y e2",
		SystemAddress: 9837749364,
		StarPosX:      -2454.65625,
		StarPosY:      282.84375,
		StarPosZ:      -1316.53125,
	}, {
		Name:          "NGC 7822 Sector DL-Y e0",
		SystemAddress: 1247822964,
		StarPosX:      -2461.59375,
		StarPosY:      316.46875,
		StarPosZ:      -1384.09375,
	}, {
		Name:          "Outorst VX-O c20-0",
		SystemAddress: 79692075442,
		StarPosX:      -2482.84375,
		StarPosY:      370.50000,
		StarPosZ:      -1433.65625,
	}, {
		Name:          "Outorst NW-Q c19-0",
		SystemAddress: 79557890474,
		StarPosX:      -2546.84375,
		StarPosY:      397.31250,
		StarPosZ:      -1466.00000,
	}, {
		Name:          "Outorst IQ-S c18-0",
		SystemAddress: 79490781602,
		StarPosX:      -2601.93750,
		StarPosY:      379.15625,
		StarPosZ:      -1508.71875,
	}, {
		Name:          "Outorst EK-U c17-0",
		SystemAddress: 79490781594,
		StarPosX:      -2624.81250,
		StarPosY:      379.28125,
		StarPosZ:      -1582.12500,
	}}

	newRoute := make([]*Route, 0)

	for i, system := range systems {
		err := SaveSystem(system)
		c.Assert(err, check.IsNil)

		newRoute = append(newRoute, &Route{
			Position:      int64(i),
			SystemAddress: system.SystemAddress,
		})
	}

	err = UpdateRoute(newRoute)
	c.Assert(err, check.IsNil)

	updatedRoute, err := GetRoute()
	c.Assert(err, check.IsNil)
	c.Assert(updatedRoute, check.HasLen, 6)

	totalDistance, err := GetRouteLength(updatedRoute)
	c.Assert(err, check.IsNil)
	c.Assert(math.Round(totalDistance), check.Equals, float64(378))
}
