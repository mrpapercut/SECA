package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventScanOrganic(c *check.C) {
	systems := []*models.System{{
		Name:          "Outopps BO-A b55-0",
		SystemAddress: 654311629785,
	}, {
		Name:          "Outorst VK-D c26-0",
		SystemAddress: 80899871202,
	}}

	for _, system := range systems {
		err := models.SaveSystem(system)
		c.Assert(err, check.IsNil)
	}

	bodies := []*models.Body{{
		Name:          "Outopps BO-A b55-0 4 a",
		BodySystemID:  6,
		BodyType:      "Planet",
		SystemID:      systems[0].ID,
		WasDiscovered: true,
		WasMapped:     true,
	}, {
		Name:          "Outorst VK-D c26-0 BC 1",
		BodySystemID:  16,
		BodyType:      "Planet",
		SystemID:      systems[1].ID,
		WasDiscovered: true,
		WasMapped:     false,
	}}

	for _, body := range bodies {
		err := models.SaveBody(body)
		c.Assert(err, check.IsNil)
	}

	species := []string{"Fonticulua Campestris", "Stratum Tectonicas", "Bacterium Aurasus"}
	expectedValues := []int64{1000000, 95054000, 5000000}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T12:02:25Z", "event":"ScanOrganic", "ScanType":"Log", "Genus":"$Codex_Ent_Fonticulus_Genus_Name;", "Genus_Localised":"Fonticulua", "Species":"$Codex_Ent_Fonticulus_02_Name;", "Species_Localised":"Fonticulua Campestris", "Variant":"$Codex_Ent_Fonticulus_02_M_Name;", "Variant_Localised":"Fonticulua Campestris - Amethyst", "SystemAddress":654311629785, "Body":6 }`,
		`{ "timestamp":"2025-01-11T12:04:11Z", "event":"ScanOrganic", "ScanType":"Sample", "Genus":"$Codex_Ent_Fonticulus_Genus_Name;", "Genus_Localised":"Fonticulua", "Species":"$Codex_Ent_Fonticulus_02_Name;", "Species_Localised":"Fonticulua Campestris", "Variant":"$Codex_Ent_Fonticulus_02_M_Name;", "Variant_Localised":"Fonticulua Campestris - Amethyst", "SystemAddress":654311629785, "Body":6 }`,
		`{ "timestamp":"2025-01-11T12:05:30Z", "event":"ScanOrganic", "ScanType":"Sample", "Genus":"$Codex_Ent_Fonticulus_Genus_Name;", "Genus_Localised":"Fonticulua", "Species":"$Codex_Ent_Fonticulus_02_Name;", "Species_Localised":"Fonticulua Campestris", "Variant":"$Codex_Ent_Fonticulus_02_M_Name;", "Variant_Localised":"Fonticulua Campestris - Amethyst", "SystemAddress":654311629785, "Body":6 }`,
		`{ "timestamp":"2025-01-11T12:05:35Z", "event":"ScanOrganic", "ScanType":"Analyse", "Genus":"$Codex_Ent_Fonticulus_Genus_Name;", "Genus_Localised":"Fonticulua", "Species":"$Codex_Ent_Fonticulus_02_Name;", "Species_Localised":"Fonticulua Campestris", "Variant":"$Codex_Ent_Fonticulus_02_M_Name;", "Variant_Localised":"Fonticulua Campestris - Amethyst", "SystemAddress":654311629785, "Body":6 }`,
		`{ "timestamp":"2025-01-11T14:11:01Z", "event":"ScanOrganic", "ScanType":"Log", "Genus":"$Codex_Ent_Stratum_Genus_Name;", "Genus_Localised":"Stratum", "Species":"$Codex_Ent_Stratum_07_Name;", "Species_Localised":"Stratum Tectonicas", "Variant":"$Codex_Ent_Stratum_07_M_Name;", "Variant_Localised":"Stratum Tectonicas - Green", "SystemAddress":80899871202, "Body":16 }`,
		`{ "timestamp":"2025-01-11T14:13:00Z", "event":"ScanOrganic", "ScanType":"Sample", "Genus":"$Codex_Ent_Stratum_Genus_Name;", "Genus_Localised":"Stratum", "Species":"$Codex_Ent_Stratum_07_Name;", "Species_Localised":"Stratum Tectonicas", "Variant":"$Codex_Ent_Stratum_07_M_Name;", "Variant_Localised":"Stratum Tectonicas - Green", "SystemAddress":80899871202, "Body":16 }`,
		`{ "timestamp":"2025-01-11T14:16:53Z", "event":"ScanOrganic", "ScanType":"Sample", "Genus":"$Codex_Ent_Stratum_Genus_Name;", "Genus_Localised":"Stratum", "Species":"$Codex_Ent_Stratum_07_Name;", "Species_Localised":"Stratum Tectonicas", "Variant":"$Codex_Ent_Stratum_07_M_Name;", "Variant_Localised":"Stratum Tectonicas - Green", "SystemAddress":80899871202, "Body":16 }`,
		`{ "timestamp":"2025-01-11T14:16:58Z", "event":"ScanOrganic", "ScanType":"Analyse", "Genus":"$Codex_Ent_Stratum_Genus_Name;", "Genus_Localised":"Stratum", "Species":"$Codex_Ent_Stratum_07_Name;", "Species_Localised":"Stratum Tectonicas", "Variant":"$Codex_Ent_Stratum_07_M_Name;", "Variant_Localised":"Stratum Tectonicas - Green", "SystemAddress":80899871202, "Body":16 }`,
		`{ "timestamp":"2025-01-11T14:17:25Z", "event":"ScanOrganic", "ScanType":"Log", "Genus":"$Codex_Ent_Bacterial_Genus_Name;", "Genus_Localised":"Bacterium", "Species":"$Codex_Ent_Bacterial_01_Name;", "Species_Localised":"Bacterium Aurasus", "Variant":"$Codex_Ent_Bacterial_01_M_Name;", "Variant_Localised":"Bacterium Aurasus - Teal", "SystemAddress":80899871202, "Body":16 }`,
		`{ "timestamp":"2025-01-11T14:24:28Z", "event":"ScanOrganic", "ScanType":"Sample", "Genus":"$Codex_Ent_Bacterial_Genus_Name;", "Genus_Localised":"Bacterium", "Species":"$Codex_Ent_Bacterial_01_Name;", "Species_Localised":"Bacterium Aurasus", "Variant":"$Codex_Ent_Bacterial_01_M_Name;", "Variant_Localised":"Bacterium Aurasus - Teal", "SystemAddress":80899871202, "Body":16 }`,
		`{ "timestamp":"2025-01-11T14:58:36Z", "event":"ScanOrganic", "ScanType":"Sample", "Genus":"$Codex_Ent_Bacterial_Genus_Name;", "Genus_Localised":"Bacterium", "Species":"$Codex_Ent_Bacterial_01_Name;", "Species_Localised":"Bacterium Aurasus", "Variant":"$Codex_Ent_Bacterial_01_M_Name;", "Variant_Localised":"Bacterium Aurasus - Teal", "SystemAddress":80899871202, "Body":16 }`,
		`{ "timestamp":"2025-01-11T14:58:41Z", "event":"ScanOrganic", "ScanType":"Analyse", "Genus":"$Codex_Ent_Bacterial_Genus_Name;", "Genus_Localised":"Bacterium", "Species":"$Codex_Ent_Bacterial_01_Name;", "Species_Localised":"Bacterium Aurasus", "Variant":"$Codex_Ent_Bacterial_01_M_Name;", "Variant_Localised":"Bacterium Aurasus - Teal", "SystemAddress":80899871202, "Body":16 }`,
	}

	for _, rawEvent := range rawEvents {
		s.eventHandler.handleEventScanOrganic(rawEvent)
	}

	retrievedScans := make([]*models.BiologicalScan, 0)

	for i, body := range bodies {
		scans, err := models.GetBiologicalScans(systems[i].SystemAddress, body.BodySystemID)
		c.Assert(err, check.IsNil)

		retrievedScans = append(retrievedScans, scans...)
	}

	c.Assert(retrievedScans, check.HasLen, 3)

	for i, scan := range retrievedScans {
		c.Assert(scan.Species, check.Equals, species[i])
		c.Assert(scan.EstimatedEarnings, check.Equals, expectedValues[i])
	}
}
