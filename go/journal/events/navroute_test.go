package events

import (
	"math"

	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventNavroute(c *check.C) {
	route, err := models.GetRoute()
	c.Assert(err, check.IsNil)
	c.Assert(route, check.HasLen, 0)

	rawJournalEvent := `{ "timestamp":"2025-01-11T17:17:25Z", "event":"NavRoute" }`

	err = s.eventHandler.handleEventNavRoute(rawJournalEvent)
	c.Assert(err, check.IsNil)
	route, err = models.GetRoute()
	c.Assert(err, check.IsNil)
	c.Assert(route, check.HasLen, 0)

	rawNavRouteJsonEvent := `{"timestamp":"2025-01-11T17:17:25Z","event":"NavRoute","Route":[{"StarSystem":"NGC 7822 Sector FG-Y e2","SystemAddress":9837749364,"StarPos":[-2454.65625,282.84375,-1316.53125],"StarClass":"B"},{"StarSystem":"NGC 7822 Sector DL-Y e0","SystemAddress":1247822964,"StarPos":[-2461.59375,316.46875,-1384.09375],"StarClass":"B"},{"StarSystem":"Outorst VX-O c20-0","SystemAddress":79692075442,"StarPos":[-2482.84375,370.5,-1433.65625],"StarClass":"M"},{"StarSystem":"Outorst NW-Q c19-0","SystemAddress":79557890474,"StarPos":[-2546.84375,397.3125,-1466],"StarClass":"K"},{"StarSystem":"Outorst IQ-S c18-0","SystemAddress":79490781602,"StarPos":[-2601.9375,379.15625,-1508.71875],"StarClass":"K"},{"StarSystem":"Outorst EK-U c17-0","SystemAddress":79490781594,"StarPos":[-2624.8125,379.28125,-1582.125],"StarClass":"K"},{"StarSystem":"Outordy LW-M d7-2","SystemAddress":78643284163,"StarPos":[-2656.46875,383.53125,-1647.46875],"StarClass":"F"},{"StarSystem":"Outordy LW-M d7-0","SystemAddress":9923807427,"StarPos":[-2703.625,381.40625,-1697.875],"StarClass":"G"},{"StarSystem":"Outordy PR-B c14-0","SystemAddress":79289487738,"StarPos":[-2739.5625,415.4375,-1740.53125],"StarClass":"K"},{"StarSystem":"Outordy EV-O d6-0","SystemAddress":9907046587,"StarPos":[-2778.09375,456.28125,-1782.09375],"StarClass":"G"},{"StarSystem":"Outordy AE-H c11-0","SystemAddress":79222411618,"StarPos":[-2782.0625,455.09375,-1859.125],"StarClass":"K"},{"StarSystem":"Outordy UC-J c10-0","SystemAddress":79222444378,"StarPos":[-2779.75,497.53125,-1903.3125],"StarClass":"K"},{"StarSystem":"Outordy UN-S d4-0","SystemAddress":9907062955,"StarPos":[-2776.6875,543.5,-1936.0625],"StarClass":"A"},{"StarSystem":"Outordy PH-U d3-1","SystemAddress":44250024099,"StarPos":[-2844.90625,557.46875,-1970.375],"StarClass":"F"},{"StarSystem":"Outordy OH-U d3-0","SystemAddress":9873508515,"StarPos":[-2878.84375,557.34375,-2015.28125],"StarClass":"F"},{"StarSystem":"Outordy AU-O c7-0","SystemAddress":78954074434,"StarPos":[-2929.96875,595.3125,-2024.46875],"StarClass":"K"},{"StarSystem":"Outordy TS-Q c6-0","SystemAddress":78886998330,"StarPos":[-2948.78125,632,-2056],"StarClass":"K"},{"StarSystem":"Outordy IG-W d2-0","SystemAddress":9873524891,"StarPos":[-2937.96875,676.75,-2097.0625],"StarClass":"F"},{"StarSystem":"Outordy EA-Y d1-1","SystemAddress":44233263251,"StarPos":[-2923.03125,675.25,-2121.21875],"StarClass":"A"},{"StarSystem":"Outordy BF-Y d1-2","SystemAddress":78576240787,"StarPos":[-2953.625,728.28125,-2165.9375],"StarClass":"G"},{"StarSystem":"Outordy XY-Z d1","SystemAddress":44216502411,"StarPos":[-2975.5,720.65625,-2236.40625],"StarClass":"K"},{"StarSystem":"Outordy QR-B c1-0","SystemAddress":78819954954,"StarPos":[-3011.78125,732.15625,-2299.15625],"StarClass":"K"},{"StarSystem":"Hegua CZ-A c29-0","SystemAddress":78685769978,"StarPos":[-3065.9375,756.0625,-2346.09375],"StarClass":"K"},{"StarSystem":"Hegua YL-B d14-0","SystemAddress":9840003195,"StarPos":[-3094.9375,780.96875,-2410.875],"StarClass":"F"},{"StarSystem":"Hegua RR-E c27-0","SystemAddress":78618693866,"StarPos":[-3142.84375,775.96875,-2463.46875],"StarClass":"M"},{"StarSystem":"Hegua JF-I c25-0","SystemAddress":78618693850,"StarPos":[-3142.375,780.375,-2539.40625],"StarClass":"K"},{"StarSystem":"Hegua CE-K c24-0","SystemAddress":78551617746,"StarPos":[-3184,817.03125,-2581],"StarClass":"K"},{"StarSystem":"Hegua RW-N c22-0","SystemAddress":78484541634,"StarPos":[-3199.9375,863,-2635.71875],"StarClass":"K"},{"StarSystem":"Hegua KV-P c21-0","SystemAddress":78417465530,"StarPos":[-3235.375,900.40625,-2692.5],"StarClass":"K"},{"StarSystem":"Hegua YQ-K d9-3","SystemAddress":112885696595,"StarPos":[-3235.3125,939.09375,-2757.15625],"StarClass":"A"},{"StarSystem":"Hegua TM-V c18-0","SystemAddress":78350422178,"StarPos":[-3274.09375,983.65625,-2807.25],"StarClass":"K"},{"StarSystem":"Hegua TK-M d8-5","SystemAddress":181588396107,"StarPos":[-3297.96875,1001,-2842.28125],"StarClass":"A"},{"StarSystem":"Hegua IF-Z c16-0","SystemAddress":78283346066,"StarPos":[-3329.25,1039.03125,-2894.3125],"StarClass":"K"},{"StarSystem":"Hegua GK-Z c16-0","SystemAddress":78283378834,"StarPos":[-3342.15625,1058.9375,-2900.65625],"StarClass":"K"}]}`

	status, err := models.GetStatus()
	c.Assert(err, check.IsNil)
	status.System = "NGC 7822 Sector FG-Y e2"

	err = models.UpdateStatus(status)
	c.Assert(err, check.IsNil)

	err = s.eventHandler.handleEventNavRoute(rawNavRouteJsonEvent)
	c.Assert(err, check.IsNil)
	route, err = models.GetRoute()
	c.Assert(err, check.IsNil)
	c.Assert(route, check.HasLen, 34)

	totalDistance, err := models.GetRouteLength(route)
	c.Assert(err, check.IsNil)
	c.Assert(math.Round(totalDistance), check.Equals, float64(2225))
}
