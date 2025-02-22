package events

import (
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

type testEventScanBodyProps struct {
	BodyName      string
	BodySystemID  int64
	SystemName    string
	SystemAddress int64
	WasDiscovered bool
	WasMapped     bool
}

func (s *EventSuite) TestHandleEventScan(c *check.C) {
	bodies := []testEventScanBodyProps{{
		BodyName:      "Synuefai IC-A b6-0 A",
		BodySystemID:  3,
		SystemName:    "Synuefai IC-A b6-0",
		SystemAddress: 664779891761,
		WasDiscovered: true,
		WasMapped:     false,
	}, {
		BodyName:      "Synuefai IC-A b6-0 B",
		BodySystemID:  4,
		SystemName:    "Synuefai IC-A b6-0",
		SystemAddress: 664779891761,
		WasDiscovered: true,
		WasMapped:     false,
	}, {
		BodyName:      "Synuefai IC-A b6-0 D",
		BodySystemID:  6,
		SystemName:    "Synuefai IC-A b6-0",
		SystemAddress: 664779891761,
		WasDiscovered: true,
		WasMapped:     false,
	}, {
		BodyName:      "Synuefai IC-A b6-0 C",
		BodySystemID:  5,
		SystemName:    "Synuefai IC-A b6-0",
		SystemAddress: 664779891761,
		WasDiscovered: true,
		WasMapped:     false,
	}, {
		BodyName:      "Synuefai YA-C b5-1",
		BodySystemID:  0,
		SystemName:    "Synuefai YA-C b5-1",
		SystemAddress: 2862729471017,
		WasDiscovered: true,
		WasMapped:     false,
	}, {
		BodyName:      "Synuefai YA-C b5-1 4",
		BodySystemID:  25,
		SystemName:    "Synuefai YA-C b5-1",
		SystemAddress: 2862729471017,
		WasDiscovered: false,
		WasMapped:     false,
	}, {
		BodyName:      "Synuefai YA-C b5-1 4 a",
		BodySystemID:  26,
		SystemName:    "Synuefai YA-C b5-1",
		SystemAddress: 2862729471017,
		WasDiscovered: true,
		WasMapped:     true,
	}, {
		BodyName:      "Synuefai YA-C b5-1 3",
		BodySystemID:  18,
		SystemName:    "Synuefai YA-C b5-1",
		SystemAddress: 2862729471017,
		WasDiscovered: false,
		WasMapped:     false,
	}, {
		BodyName:      "Synuefai YA-C b5-1 3 a",
		BodySystemID:  19,
		SystemName:    "Synuefai YA-C b5-1",
		SystemAddress: 2862729471017,
		WasDiscovered: true,
		WasMapped:     false,
	}}

	rawEvents := []string{
		`{ "timestamp":"2025-01-11T11:10:33Z", "event":"Scan", "ScanType":"AutoScan", "BodyName":"Synuefai IC-A b6-0 A", "BodyID":3, "Parents":[ {"Null":2}, {"Null":1}, {"Null":0} ], "StarSystem":"Synuefai IC-A b6-0", "SystemAddress":664779891761, "DistanceFromArrivalLS":0.000000, "StarType":"M", "Subclass":1, "StellarMass":0.445313, "Radius":406543168.000000, "AbsoluteMagnitude":8.167694, "Age_MY":404, "SurfaceTemperature":3505.000000, "Luminosity":"Va", "SemiMajorAxis":428066605.329514, "Eccentricity":0.001305, "OrbitalInclination":55.127749, "Periapsis":96.470575, "OrbitalPeriod":21845.548153, "AscendingNode":79.382460, "MeanAnomaly":90.006019, "RotationPeriod":261955.046353, "AxialTilt":0.000000, "WasDiscovered":true, "WasMapped":false }`,
		`{ "timestamp":"2025-01-11T11:10:33Z", "event":"Scan", "ScanType":"AutoScan", "BodyName":"Synuefai IC-A b6-0 B", "BodyID":4, "Parents":[ {"Null":2}, {"Null":1}, {"Null":0} ], "StarSystem":"Synuefai IC-A b6-0", "SystemAddress":664779891761, "DistanceFromArrivalLS":3.541883, "StarType":"M", "Subclass":6, "StellarMass":0.300781, "Radius":300418272.000000, "AbsoluteMagnitude":10.003540, "Age_MY":404, "SurfaceTemperature":2672.000000, "Luminosity":"Va", "SemiMajorAxis":633761107.921600, "Eccentricity":0.001305, "OrbitalInclination":55.127749, "Periapsis":276.470570, "OrbitalPeriod":21845.548153, "AscendingNode":79.382460, "MeanAnomaly":90.006019, "RotationPeriod":135390.262022, "AxialTilt":0.000000, "WasDiscovered":true, "WasMapped":false }`,
		`{ "timestamp":"2025-01-11T11:10:34Z", "event":"Scan", "ScanType":"AutoScan", "BodyName":"Synuefai IC-A b6-0 D", "BodyID":6, "Parents":[ {"Null":0} ], "StarSystem":"Synuefai IC-A b6-0", "SystemAddress":664779891761, "DistanceFromArrivalLS":168326.288060, "StarType":"L", "Subclass":0, "StellarMass":0.222656, "Radius":260515328.000000, "AbsoluteMagnitude":11.692566, "Age_MY":404, "SurfaceTemperature":1945.000000, "Luminosity":"V", "SemiMajorAxis":31474419236183.167969, "Eccentricity":0.316494, "OrbitalInclination":-25.912898, "Periapsis":113.130752, "OrbitalPeriod":116198790073.394775, "AscendingNode":165.224229, "MeanAnomaly":175.454528, "RotationPeriod":138440.499813, "AxialTilt":0.000000, "WasDiscovered":true, "WasMapped":false }`,
		`{ "timestamp":"2025-01-11T11:10:34Z", "event":"Scan", "ScanType":"AutoScan", "BodyName":"Synuefai IC-A b6-0 C", "BodyID":5, "Parents":[ {"Null":1}, {"Null":0} ], "StarSystem":"Synuefai IC-A b6-0", "SystemAddress":664779891761, "DistanceFromArrivalLS":371.281702, "StarType":"M", "Subclass":8, "StellarMass":0.273438, "Radius":295324288.000000, "AbsoluteMagnitude":10.724136, "Age_MY":404, "SurfaceTemperature":2283.000000, "Luminosity":"Va", "SemiMajorAxis":82747566699.981689, "Eccentricity":0.161787, "OrbitalInclination":-40.716218, "Periapsis":192.060791, "OrbitalPeriod":20536280.870438, "AscendingNode":173.046022, "MeanAnomaly":76.553516, "RotationPeriod":127528.373941, "AxialTilt":0.000000, "WasDiscovered":true, "WasMapped":false }`,
		`{ "timestamp":"2025-01-11T11:12:40Z", "event":"Scan", "ScanType":"AutoScan", "BodyName":"Synuefai YA-C b5-1", "BodyID":0, "StarSystem":"Synuefai YA-C b5-1", "SystemAddress":2862729471017, "DistanceFromArrivalLS":0.000000, "StarType":"M", "Subclass":2, "StellarMass":0.425781, "Radius":413802112.000000, "AbsoluteMagnitude":8.389725, "Age_MY":12950, "SurfaceTemperature":3301.000000, "Luminosity":"Va", "RotationPeriod":229751.808268, "AxialTilt":0.000000, "WasDiscovered":true, "WasMapped":false }`,
		`{ "timestamp":"2025-01-11T11:13:25Z", "event":"Scan", "ScanType":"Detailed", "BodyName":"Synuefai YA-C b5-1 4", "BodyID":25, "Parents":[ {"Star":0} ], "StarSystem":"Synuefai YA-C b5-1", "SystemAddress":2862729471017, "DistanceFromArrivalLS":3228.764578, "TidalLock":false, "TerraformState":"", "PlanetClass":"Icy body", "Atmosphere":"helium atmosphere", "AtmosphereType":"Helium", "AtmosphereComposition":[ { "Name":"Helium", "Percent":89.334976 }, { "Name":"Hydrogen", "Percent":8.427828 }, { "Name":"Neon", "Percent":2.237204 } ], "Volcanism":"water geysers volcanism", "MassEM":9.808647, "Radius":14724175.000000, "SurfaceGravity":18.032525, "SurfaceTemperature":39.712727, "SurfacePressure":175697.328125, "Landable":false, "Composition":{ "Ice":0.678760, "Rock":0.215300, "Metal":0.105940 }, "SemiMajorAxis":974905431270.599365, "Eccentricity":0.007323, "OrbitalInclination":-0.084330, "Periapsis":100.485958, "OrbitalPeriod":798586064.577103, "AscendingNode":23.955065, "MeanAnomaly":13.242059, "RotationPeriod":144198.601167, "AxialTilt":-2.569886, "WasDiscovered":false, "WasMapped":false }`,
		`{ "timestamp":"2025-01-11T11:13:33Z", "event":"Scan", "ScanType":"Detailed", "BodyName":"Synuefai YA-C b5-1 4 a", "BodyID":26, "Parents":[ {"Planet":25}, {"Star":0} ], "StarSystem":"Synuefai YA-C b5-1", "SystemAddress":2862729471017, "DistanceFromArrivalLS":3237.746268, "TidalLock":false, "TerraformState":"", "PlanetClass":"Icy body", "Atmosphere":"", "AtmosphereType":"None", "Volcanism":"", "MassEM":0.457913, "Radius":6519473.500000, "SurfaceGravity":4.294051, "SurfaceTemperature":38.253101, "SurfacePressure":76.072929, "Landable":true, "Materials":[ { "Name":"sulphur", "Percent":27.951500 }, { "Name":"carbon", "Percent":23.504318 }, { "Name":"phosphorus", "Percent":15.047868 }, { "Name":"iron", "Percent":12.068430 }, { "Name":"nickel", "Percent":9.128055 }, { "Name":"chromium", "Percent":5.427574 }, { "Name":"vanadium", "Percent":2.963586 }, { "Name":"zirconium", "Percent":1.401394 }, { "Name":"cadmium", "Percent":0.937168 }, { "Name":"niobium", "Percent":0.824813 }, { "Name":"ruthenium", "Percent":0.745302 } ], "Composition":{ "Ice":0.879937, "Rock":0.103496, "Metal":0.016567 }, "SemiMajorAxis":4642766177.654266, "Eccentricity":0.000000, "OrbitalInclination":20.009360, "Periapsis":212.174226, "OrbitalPeriod":31072292.923927, "AscendingNode":166.549156, "MeanAnomaly":61.084475, "RotationPeriod":956325.475162, "AxialTilt":-0.295070, "WasDiscovered":true, "WasMapped":true }`,
		`{ "timestamp":"2025-01-11T11:13:55Z", "event":"Scan", "ScanType":"Detailed", "BodyName":"Synuefai YA-C b5-1 3", "BodyID":18, "Parents":[ {"Star":0} ], "StarSystem":"Synuefai YA-C b5-1", "SystemAddress":2862729471017, "DistanceFromArrivalLS":1625.551537, "TidalLock":false, "TerraformState":"", "PlanetClass":"Sudarsky class II gas giant", "Atmosphere":"", "AtmosphereComposition":[ { "Name":"Hydrogen", "Percent":73.672821 }, { "Name":"Helium", "Percent":26.327177 } ], "Volcanism":"", "MassEM":693.691284, "Radius":76940432.000000, "SurfaceGravity":46.705325, "SurfaceTemperature":166.382370, "SurfacePressure":0.000000, "Landable":false, "SemiMajorAxis":487277430295.944214, "Eccentricity":0.000770, "OrbitalInclination":-0.005432, "Periapsis":114.650603, "OrbitalPeriod":282190471.887589, "AscendingNode":111.288333, "MeanAnomaly":262.281992, "RotationPeriod":129721.181213, "AxialTilt":1.598500, "WasDiscovered":false, "WasMapped":false }`,
		`{ "timestamp":"2025-01-11T11:14:00Z", "event":"Scan", "ScanType":"Detailed", "BodyName":"Synuefai YA-C b5-1 3 a", "BodyID":19, "Parents":[ {"Planet":18}, {"Star":0} ], "StarSystem":"Synuefai YA-C b5-1", "SystemAddress":2862729471017, "DistanceFromArrivalLS":1625.769706, "TidalLock":true, "TerraformState":"", "PlanetClass":"Icy body", "Atmosphere":"", "AtmosphereType":"None", "Volcanism":"major water geysers volcanism", "MassEM":0.013912, "Radius":2102775.500000, "SurfaceGravity":1.254002, "SurfaceTemperature":77.453156, "SurfacePressure":0.000000, "Landable":true, "Materials":[ { "Name":"sulphur", "Percent":26.475557 }, { "Name":"carbon", "Percent":22.263203 }, { "Name":"phosphorus", "Percent":14.253285 }, { "Name":"iron", "Percent":11.787989 }, { "Name":"nickel", "Percent":8.915940 }, { "Name":"chromium", "Percent":5.301449 }, { "Name":"manganese", "Percent":4.868319 }, { "Name":"selenium", "Percent":4.143649 }, { "Name":"cadmium", "Percent":0.915391 }, { "Name":"molybdenum", "Percent":0.769749 }, { "Name":"polonium", "Percent":0.305469 } ], "Composition":{ "Ice":0.826229, "Rock":0.158395, "Metal":0.015376 }, "SemiMajorAxis":505279725.790024, "Eccentricity":0.000002, "OrbitalInclination":-0.014093, "Periapsis":329.851258, "OrbitalPeriod":135710.841417, "AscendingNode":168.400954, "MeanAnomaly":285.159374, "RotationPeriod":135717.318608, "AxialTilt":0.518580, "WasDiscovered":true, "WasMapped":false }`,
	}

	for i, rawEvent := range rawEvents {
		body := bodies[i]

		system := &models.System{
			Name:          body.SystemName,
			SystemAddress: body.SystemAddress,
		}

		err := models.SaveSystem(system)
		c.Assert(err, check.IsNil)

		err = s.eventHandler.handleEventScan(rawEvent)
		c.Assert(err, check.IsNil)

		retrievedBody, err := models.GetBody(system.SystemAddress, body.BodySystemID)
		c.Assert(err, check.IsNil)

		c.Assert(retrievedBody.Name, check.Equals, body.BodyName)
		c.Assert(retrievedBody.WasDiscovered, check.Equals, body.WasDiscovered)
		c.Assert(retrievedBody.WasMapped, check.Equals, body.WasMapped)
	}
}
