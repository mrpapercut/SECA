package events

import (
	"time"

	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func (s *EventSuite) TestHandleEventSellOrganicData(c *check.C) {
	system := &models.System{
		Name:          "Synuefai EQ-Y e0",
		SystemAddress: 1594367289,
	}

	err := models.SaveSystem(system)
	c.Assert(err, check.IsNil)

	bodies := []*models.Body{{
		Name:          "Synuefai EQ-Y e0 A 1",
		BodySystemID:  1,
		BodyType:      "Planet",
		PlanetClass:   "Ammonia world",
		MassEM:        0.049756,
		WasDiscovered: false,
		WasMapped:     false,
	}, {
		Name:          "Synuefai EQ-Y e0 A 2",
		BodySystemID:  2,
		BodyType:      "Planet",
		PlanetClass:   "Rocky body",
		MassEM:        0.721473,
		WasDiscovered: false,
		WasMapped:     false,
	}}

	for _, body := range bodies {
		body.SystemID = system.ID
		body.System = *system

		if body.SystemID == 0 {
			c.Fatalf("error finding system for body %s", body.Name)
		}

		err := models.SaveBody(body)
		c.Assert(err, check.IsNil)
	}

	scans := []*models.BiologicalScan{{
		SystemID:  system.ID,
		System:    *system,
		BodyID:    bodies[0].ID,
		Body:      *bodies[0],
		Timestamp: time.Now(),
		Genus:     string(models.GenusTussock),
		Species:   string(models.SpeciesTussockVentusa),
		Variant:   "Tussock Ventusa - Yellow",
	}, {
		SystemID:  system.ID,
		System:    *system,
		BodyID:    bodies[0].ID,
		Body:      *bodies[0],
		Timestamp: time.Now(),
		Genus:     string(models.GenusBacterium),
		Species:   string(models.SpeciesBacteriumBullaris),
		Variant:   "Bacterium Bullaris - Cobalt",
	}, {
		SystemID:  system.ID,
		System:    *system,
		BodyID:    bodies[0].ID,
		Body:      *bodies[0],
		Timestamp: time.Now(),
		Genus:     string(models.GenusFonticulua),
		Species:   string(models.SpeciesFonticuluaCampestris),
		Variant:   "Fonticulua Campestris - Emerald",
	}, {
		SystemID:  system.ID,
		System:    *system,
		BodyID:    bodies[0].ID,
		Body:      *bodies[0],
		Timestamp: time.Now(),
		Genus:     string(models.GenusFonticulua),
		Species:   string(models.SpeciesFonticuluaCampestris),
		Variant:   "Fonticulua Campestris - Amethyst",
	}, {
		SystemID:  system.ID,
		System:    *system,
		BodyID:    bodies[1].ID,
		Body:      *bodies[1],
		Timestamp: time.Now(),
		Genus:     string(models.GenusStratum),
		Species:   string(models.SpeciesStratumTectonicas),
		Variant:   "Stratum Tectonicas - Green",
	}, {
		SystemID:  system.ID,
		System:    *system,
		BodyID:    bodies[1].ID,
		Body:      *bodies[1],
		Timestamp: time.Now(),
		Genus:     string(models.GenusBacterium),
		Species:   string(models.SpeciesBacteriumAurasus),
		Variant:   "Bacterium Aurasus - Teal",
	}, {
		SystemID:  system.ID,
		System:    *system,
		BodyID:    bodies[1].ID,
		Body:      *bodies[1],
		Timestamp: time.Now(),
		Genus:     string(models.GenusFonticulua),
		Species:   string(models.SpeciesFonticuluaCampestris),
		Variant:   "Fonticulua Campestris - Amethyst",
	}}

	for _, scan := range scans {
		scan.EstimatedEarnings = models.GetBiologicalScanValue(models.BiologicalSpecies(scan.Species), true)

		err = models.SaveBiologicalScan(scan)
		c.Assert(err, check.IsNil)
	}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T10:09:10Z", "event":"SellOrganicData", "MarketID":128737014, "BioData":[ { "Genus":"$Codex_Ent_Tussocks_Genus_Name;", "Genus_Localised":"Tussock", "Species":"$Codex_Ent_Tussocks_02_Name;", "Species_Localised":"Tussock Ventusa", "Variant":"$Codex_Ent_Tussocks_02_F_Name;", "Variant_Localised":"Tussock Ventusa - Yellow", "Value":3227700, "Bonus":12910800 }, { "Genus":"$Codex_Ent_Bacterial_Genus_Name;", "Genus_Localised":"Bacterium", "Species":"$Codex_Ent_Bacterial_10_Name;", "Species_Localised":"Bacterium Bullaris", "Variant":"$Codex_Ent_Bacterial_10_Antimony_Name;", "Variant_Localised":"Bacterium Bullaris - Cobalt", "Value":1152500, "Bonus":4610000 }, { "Genus":"$Codex_Ent_Fonticulus_Genus_Name;", "Genus_Localised":"Fonticulua", "Species":"$Codex_Ent_Fonticulus_02_Name;", "Species_Localised":"Fonticulua Campestris", "Variant":"$Codex_Ent_Fonticulus_02_K_Name;", "Variant_Localised":"Fonticulua Campestris - Emerald", "Value":1000000, "Bonus":4000000 }, { "Genus":"$Codex_Ent_Fonticulus_Genus_Name;", "Genus_Localised":"Fonticulua", "Species":"$Codex_Ent_Fonticulus_02_Name;", "Species_Localised":"Fonticulua Campestris", "Variant":"$Codex_Ent_Fonticulus_02_M_Name;", "Variant_Localised":"Fonticulua Campestris - Amethyst", "Value":1000000, "Bonus":4000000 } ] }`,
		`{ "timestamp":"2025-01-11T15:44:20Z", "event":"SellOrganicData", "MarketID":3702789120, "BioData":[ { "Genus":"$Codex_Ent_Stratum_Genus_Name;", "Genus_Localised":"Stratum", "Species":"$Codex_Ent_Stratum_07_Name;", "Species_Localised":"Stratum Tectonicas", "Variant":"$Codex_Ent_Stratum_07_M_Name;", "Variant_Localised":"Stratum Tectonicas - Green", "Value":19010800, "Bonus":76043200 }, { "Genus":"$Codex_Ent_Bacterial_Genus_Name;", "Genus_Localised":"Bacterium", "Species":"$Codex_Ent_Bacterial_01_Name;", "Species_Localised":"Bacterium Aurasus", "Variant":"$Codex_Ent_Bacterial_01_M_Name;", "Variant_Localised":"Bacterium Aurasus - Teal", "Value":1000000, "Bonus":4000000 }, { "Genus":"$Codex_Ent_Fonticulus_Genus_Name;", "Genus_Localised":"Fonticulua", "Species":"$Codex_Ent_Fonticulus_02_Name;", "Species_Localised":"Fonticulua Campestris", "Variant":"$Codex_Ent_Fonticulus_02_M_Name;", "Variant_Localised":"Fonticulua Campestris - Amethyst", "Value":1000000, "Bonus":4000000 } ] }`,
	}

	for _, rawEvent := range rawEvents {
		s.eventHandler.handleEventSellOrganicData(rawEvent)
	}

	for _, body := range bodies {
		retrievedScans, err := models.GetBiologicalScans(body.System.SystemAddress, body.BodySystemID)
		c.Assert(err, check.IsNil)

		for _, scan := range retrievedScans {
			c.Assert(scan.DataSold, check.Equals, true)
		}
	}
}
