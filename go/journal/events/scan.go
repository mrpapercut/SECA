package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type ScanEvent struct {
	GenericEvent
	ScanType              string
	BodyName              string
	BodySystemID          int64 `json:"BodyID"`
	StarSystem            string
	SystemAddress         int64
	DistanceFromArrivalLS float64

	SurfaceTemperature float64
	Radius             float64
	SemiMajorAxis      float64
	Eccentricity       float64
	OrbitalInclination float64
	Periapsis          float64
	OrbitalPeriod      float64
	AscendingNode      float64
	MeanAnomaly        float64
	RotationPeriod     float64
	AxialTilt          float64

	WasDiscovered bool
	WasMapped     bool

	// Star-specific
	StarType          string
	Subclass          int
	StellarMass       float64
	AbsoluteMagnitude float64
	Age_MY            float64
	Luminosity        string

	// Planet-specific
	TidalLock      bool
	TerraformState string
	PlanetClass    string
	Atmosphere     string
	AtmosphereType string
	// AtmosphereComposition AtmosphereComposition
	Volcanism       string
	MassEM          float64
	SurfaceGravity  float64
	SurfacePressure float64
	Landable        bool
	// Materials             []NamePercentMap
	// Composition           Composition
}

func (eh *EventHandler) handleEventScan(rawEvent string) error {
	event, err := ParseEvent[ScanEvent](rawEvent)
	if err != nil {
		return err
	}

	system, err := models.GetSystemByAddress(event.SystemAddress)
	if err != nil {
		return fmt.Errorf("error retrieving system: %v", err)
	}

	body := &models.Body{
		Name:                  event.BodyName,
		BodySystemID:          event.BodySystemID,
		SystemID:              system.ID,
		System:                *system,
		DistanceFromArrivalLS: event.DistanceFromArrivalLS,
		WasDiscovered:         event.WasDiscovered,
		WasMapped:             event.WasMapped,
		Discovered:            true,
		Mapped:                false,
		SurfaceTemperature:    event.SurfaceTemperature,
		Radius:                event.Radius,
		SemiMajorAxis:         event.SemiMajorAxis,
		Eccentricity:          event.Eccentricity,
		OrbitalInclination:    event.OrbitalInclination,
		Periapsis:             event.Periapsis,
		OrbitalPeriod:         event.OrbitalPeriod,
		AscendingNode:         event.AscendingNode,
		MeanAnomaly:           event.MeanAnomaly,
		RotationPeriod:        event.RotationPeriod,
		AxialTilt:             event.AxialTilt,
	}

	if event.StarType != "" {
		body.BodyType = "Star"
		body.StarType = models.StarType(event.StarType)
		body.Subclass = event.Subclass
		body.StellarMass = event.StellarMass
		body.AbsoluteMagnitude = event.AbsoluteMagnitude
		body.Age_MY = event.Age_MY
		body.Luminosity = event.Luminosity
	} else if event.PlanetClass != "" {
		body.TidalLock = event.TidalLock
		body.TerraformState = models.TerraformState(event.TerraformState)
		body.PlanetClass = models.PlanetClass(event.PlanetClass)
		body.Atmosphere = models.Atmosphere(event.Atmosphere)
		body.AtmosphereType = models.AtmosphereType(event.AtmosphereType)
		body.Volcanism = models.Volcanism(event.Volcanism)
		body.MassEM = event.MassEM
		body.SurfaceGravity = event.SurfaceGravity
		body.SurfacePressure = event.SurfacePressure
		body.Landable = event.Landable
	}

	err = models.SaveBody(body)
	if err != nil {
		return fmt.Errorf("error creating or updating body: %v", err)
	}

	scan := &models.ExplorationScan{
		SystemID:  system.ID,
		System:    *system,
		BodyID:    body.ID,
		Body:      *body,
		Timestamp: event.Timestamp,
	}

	scan.EstimatedEarnings = models.GetExplorationScanValue(scan)

	err = models.SaveExplorationScan(scan)
	if err != nil {
		return fmt.Errorf("error saving exploration scan: %v", err)
	}

	return nil
}
