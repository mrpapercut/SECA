package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventFSSBodySignals(c *check.C) {
	systems := []*models.System{{
		Name:          "Outopps DR-N e6-3",
		SystemAddress: 14166262908,
	}, {
		Name:          "Outopps KO-Z d13-13",
		SystemAddress: 456919091451,
	}, {
		Name:          "Outopps BO-A b55-0",
		SystemAddress: 654311629785,
	}, {
		Name:          "Outopps QN-B d13-13",
		SystemAddress: 456851998963,
	}, {
		Name:          "Outopps PN-B d13-17",
		SystemAddress: 594274175219,
	}, {
		Name:          "Outopps VK-D c26-0",
		SystemAddress: 80899871202,
	}, {
		Name:          "Outopps KJ-F c25-2",
		SystemAddress: 630320173530,
	}, {
		Name:          "California Sector BA-A e6",
		SystemAddress: 27072119940,
	}, {
		Name:          "Outopps BO-A b55-0",
		SystemAddress: 654311629785,
	}}

	for _, system := range systems {
		err := models.SaveSystem(system)
		c.Assert(err, check.IsNil)
	}

	testSignals := [][]*models.BodySignal{{
		{Type: models.SignalBiological, Count: 1},
		{Type: models.SignalGeological, Count: 3},
	}, {
		{Type: models.SignalBiological, Count: 1},
	}, {
		{Type: models.SignalBiological, Count: 1},
	}, {
		{Type: models.SignalBiological, Count: 2},
	}, {
		{Type: models.SignalBiological, Count: 4},
	}, {
		{Type: models.SignalBiological, Count: 2},
	}, {
		{Type: models.SignalBiological, Count: 1},
	}, {
		{Type: models.SignalBiological, Count: 1},
	}, {
		{Type: models.SignalBiological, Count: 1},
	}, {
		{Type: models.SignalBiological, Count: 1},
	}, {
		{Type: models.SignalBiological, Count: 2},
	}, {
		{Type: models.SignalBiological, Count: 1},
		{Type: models.SignalGeological, Count: 2},
	}, {
		{Type: models.SignalBiological, Count: 1},
		{Type: models.SignalGeological, Count: 2},
	}, {
		{Type: models.SignalBiological, Count: 1},
	}, {
		{Type: models.SignalThargoid, Count: 16},
		{Type: models.SignalHuman, Count: 16},
	}, {
		{Type: models.SignalBiological, Count: 2, SubType: "Bacterium,Fonticulua"},
	}, {
		{Type: models.SignalBiological, Count: 2, SubType: "Bacterium,Fonticulua"},
	}, {
		{Type: models.SignalBiological, Count: 2, SubType: "Bacterium,Stratum"},
	}, {
		{Type: models.SignalBiological, Count: 2, SubType: "Bacterium,Stratum"},
	}, {
		{Type: models.SignalBiological, Count: 2, SubType: "Bacterium,Stratum"},
	}}

	bodyNames := []string{"Outopps DR-N e6-3 2", "Outopps KO-Z d13-13 A 3", "Outopps KO-Z d13-13 A 4", "Outopps BO-A b55-0 4 a", "Outorst QN-B d13-13 6", "Outorst PN-B d13-17 A 3", "Outorst VK-D c26-0 A 5", "Outorst VK-D c26-0 A 3", "Outorst VK-D c26-0 A 2", "Outorst VK-D c26-0 BC 2", "Outorst VK-D c26-0 BC 1", "Outorst KJ-F c25-2 B 6", "Outorst KJ-F c25-2 B 5", "Outorst KJ-F c25-2 B 7", "California Sector BA-A e6 4", "Outopps BO-A b55-0 4 a", "Outopps BO-A b55-0 4 a", "Outorst VK-D c26-0 BC 1", "Outorst VK-D c26-0 BC 1", "Outorst VK-D c26-0 BC 1"}
	bodySystemIDs := []int64{3, 10, 11, 6, 8, 7, 10, 8, 6, 17, 16, 9, 8, 10, 8, 6, 6, 16, 16, 16}
	signalAmounts := []int{2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1}

	rawEvents := []string{
		`{"timestamp":"2025-01-11T11:47:28Z","event":"FSSBodySignals","BodyName":"Outopps DR-N e6-3 2","BodyID":3,"SystemAddress":14166262908,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1},{"Type":"$SAA_SignalType_Geological;","Type_Localised":"Geological","Count":3}]}`,
		`{"timestamp":"2025-01-11T11:49:20Z","event":"FSSBodySignals","BodyName":"Outopps KO-Z d13-13 A 3","BodyID":10,"SystemAddress":456919091451,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1}]}`,
		`{"timestamp":"2025-01-11T11:51:14Z","event":"FSSBodySignals","BodyName":"Outopps KO-Z d13-13 A 4","BodyID":11,"SystemAddress":456919091451,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1}]}`,
		`{"timestamp":"2025-01-11T11:53:06Z","event":"FSSBodySignals","BodyName":"Outopps BO-A b55-0 4 a","BodyID":6,"SystemAddress":654311629785,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}]}`,
		`{"timestamp":"2025-01-11T13:13:02Z","event":"FSSBodySignals","BodyName":"Outorst QN-B d13-13 6","BodyID":8,"SystemAddress":456851998963,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":4}]}`,
		`{"timestamp":"2025-01-11T13:15:04Z","event":"FSSBodySignals","BodyName":"Outorst PN-B d13-17 A 3","BodyID":7,"SystemAddress":594274175219,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}]}`,
		`{"timestamp":"2025-01-11T13:36:34Z","event":"FSSBodySignals","BodyName":"Outorst VK-D c26-0 A 5","BodyID":10,"SystemAddress":80899871202,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1}]}`,
		`{"timestamp":"2025-01-11T13:37:50Z","event":"FSSBodySignals","BodyName":"Outorst VK-D c26-0 A 3","BodyID":8,"SystemAddress":80899871202,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1}]}`,
		`{"timestamp":"2025-01-11T13:38:07Z","event":"FSSBodySignals","BodyName":"Outorst VK-D c26-0 A 2","BodyID":6,"SystemAddress":80899871202,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1}]}`,
		`{"timestamp":"2025-01-11T13:39:36Z","event":"FSSBodySignals","BodyName":"Outorst VK-D c26-0 BC 2","BodyID":17,"SystemAddress":80899871202,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1}]}`,
		`{"timestamp":"2025-01-11T13:39:42Z","event":"FSSBodySignals","BodyName":"Outorst VK-D c26-0 BC 1","BodyID":16,"SystemAddress":80899871202,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}]}`,
		`{"timestamp":"2025-01-11T15:10:43Z","event":"FSSBodySignals","BodyName":"Outorst KJ-F c25-2 B 6","BodyID":9,"SystemAddress":630320173530,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1},{"Type":"$SAA_SignalType_Geological;","Type_Localised":"Geological","Count":2}]}`,
		`{"timestamp":"2025-01-11T15:10:50Z","event":"FSSBodySignals","BodyName":"Outorst KJ-F c25-2 B 5","BodyID":8,"SystemAddress":630320173530,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1},{"Type":"$SAA_SignalType_Geological;","Type_Localised":"Geological","Count":2}]}`,
		`{"timestamp":"2025-01-11T15:11:04Z","event":"FSSBodySignals","BodyName":"Outorst KJ-F c25-2 B 7","BodyID":10,"SystemAddress":630320173530,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":1}]}`,

		`{"timestamp":"2025-01-11T11:01:44Z","event":"SAASignalsFound","BodyName":"California Sector BA-A e6 4","SystemAddress":27072119940,"BodyID":8,"Signals":[{"Type":"$SAA_SignalType_Thargoid;","Type_Localised":"Thargoid","Count":16},{"Type":"$SAA_SignalType_Human;","Type_Localised":"Human","Count":16}],"Genuses":[]}`,
		`{"timestamp":"2025-01-11T11:57:28Z","event":"SAASignalsFound","BodyName":"Outopps BO-A b55-0 4 a","SystemAddress":654311629785,"BodyID":6,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}],"Genuses":[{"Genus":"$Codex_Ent_Bacterial_Genus_Name;","Genus_Localised":"Bacterium"},{"Genus":"$Codex_Ent_Fonticulus_Genus_Name;","Genus_Localised":"Fonticulua"}]}`,
		`{"timestamp":"2025-01-11T13:02:58Z","event":"SAASignalsFound","BodyName":"Outopps BO-A b55-0 4 a","SystemAddress":654311629785,"BodyID":6,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}],"Genuses":[{"Genus":"$Codex_Ent_Bacterial_Genus_Name;","Genus_Localised":"Bacterium"},{"Genus":"$Codex_Ent_Fonticulus_Genus_Name;","Genus_Localised":"Fonticulua"}]}`,
		`{"timestamp":"2025-01-11T13:48:38Z","event":"SAASignalsFound","BodyName":"Outorst VK-D c26-0 BC 1","SystemAddress":80899871202,"BodyID":16,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}],"Genuses":[{"Genus":"$Codex_Ent_Bacterial_Genus_Name;","Genus_Localised":"Bacterium"},{"Genus":"$Codex_Ent_Stratum_Genus_Name;","Genus_Localised":"Stratum"}]}`,
		`{"timestamp":"2025-01-11T14:58:50Z","event":"SAASignalsFound","BodyName":"Outorst VK-D c26-0 BC 1","SystemAddress":80899871202,"BodyID":16,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}],"Genuses":[{"Genus":"$Codex_Ent_Bacterial_Genus_Name;","Genus_Localised":"Bacterium"},{"Genus":"$Codex_Ent_Stratum_Genus_Name;","Genus_Localised":"Stratum"}]}`,
		`{"timestamp":"2025-01-11T15:00:26Z","event":"SAASignalsFound","BodyName":"Outorst VK-D c26-0 BC 1","SystemAddress":80899871202,"BodyID":16,"Signals":[{"Type":"$SAA_SignalType_Biological;","Type_Localised":"Biological","Count":2}],"Genuses":[{"Genus":"$Codex_Ent_Bacterial_Genus_Name;","Genus_Localised":"Bacterium"},{"Genus":"$Codex_Ent_Stratum_Genus_Name;","Genus_Localised":"Stratum"}]}`,
	}

	for i, rawEvent := range rawEvents {
		err := s.eventHandler.handleEventFSSBodySignals(rawEvent)
		c.Assert(err, check.IsNil)

		body, err := models.GetBodyByName(bodyNames[i])
		c.Assert(err, check.IsNil)
		c.Assert(body.BodySystemID, check.Equals, bodySystemIDs[i])

		signals, err := models.GetBodySignals(body)
		c.Assert(err, check.IsNil)
		c.Assert(signals, check.HasLen, signalAmounts[i])

		for j, testSignal := range testSignals[i] {
			c.Assert(signals[j].Type, check.Equals, testSignal.Type)
			c.Assert(signals[j].Count, check.Equals, testSignal.Count)
			c.Assert(signals[j].SubType, check.Equals, testSignal.SubType)
		}
	}

}
