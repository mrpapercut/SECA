package events

type ScanType string

const (
	Detailed ScanType = "Detailed"
	AutoScan ScanType = "AutoScan"
)

type TerraformState string

const (
	NotTerraformable TerraformState = ""
	Terraformable    TerraformState = "Terraformable"
	Terraforming     TerraformState = "Terraforming"
	Terraformed      TerraformState = "Terraformed"
)

type PlanetClass string

const (
	IcyBody                  PlanetClass = "Icy body"
	RockyBody                PlanetClass = "Rocky body"
	RockyIceBody             PlanetClass = "Rocky ice body"
	MetalRichBody            PlanetClass = "Metal rich body"
	HighMetalContentBody     PlanetClass = "High metal content body"
	EarthLikeWorld           PlanetClass = "Earthlike body"
	WaterWorld               PlanetClass = "Water world"
	AmmoniaWorld             PlanetClass = "Ammonia world"
	HeliumGasGiant           PlanetClass = "Helium rich gas giant"
	GasGiantWaterBasedLife   PlanetClass = "Gas giant with water based life"
	GasGiantAmmoniaBasedLife PlanetClass = "Gas giant with ammonia based life"
	WaterGiant               PlanetClass = "Water giant"
	ClassIGasGiant           PlanetClass = "Sudarsky class I gas giant"
	ClassIIGasGiant          PlanetClass = "Sudarsky class II gas giant"
	ClassIIIGasGiant         PlanetClass = "Sudarsky class III gas giant"
	ClassIVGasGiant          PlanetClass = "Sudarsky class IV gas giant"
	ClassVGasGiant           PlanetClass = "Sudarsky class V gas giant"
)

type Atmosphere string
type AtmosphereType string
type AtmosphereComposition map[string]float64
type Composition map[string]float64
type Materials []NamePercentMap
type Volcanism string

type StarType string

const (
	// Main Sequence
	ClassO StarType = "O"
	ClassB StarType = "B"
	ClassA StarType = "A"
	ClassF StarType = "F"
	ClassG StarType = "G"
	ClassK StarType = "K"
	ClassM StarType = "M"
	// Giants
	ClassBBlueWhiteSupergiant   StarType = "B_BlueWhiteSupergiant"
	ClassABlueWhiteSupergiant   StarType = "A_BlueWhiteSupergiant"
	ClassFWhiteSupergiant       StarType = "F_WhiteSupergiant"
	ClassGWhiteYellowSupergiant StarType = "G_WhiteYellowSupergiant"
	ClassKOrangeGiant           StarType = "K_OrangeGiant"
	ClassMRedGiant              StarType = "M_RedGiant"
	ClassMRedSupergiant         StarType = "M_RedSupergiant"
	// Proto stars
	ClassAeBe StarType = "AeBe" // Herbig Ae/Be
	ClassTTS  StarType = "TTS"  // T Tauri
	// Carbon stars
	ClassC  StarType = "C"
	ClassCJ StarType = "CJ"
	ClassCN StarType = "CN"
	ClassMS StarType = "MS"
	ClassS  StarType = "S"
	// Wolf-Rayet
	ClassW   StarType = "W"
	ClassWC  StarType = "WC"
	ClassWN  StarType = "WN"
	ClassWNC StarType = "WNC"
	ClassWO  StarType = "WO"
	// White dwarfs
	ClassD   StarType = "D"
	ClassDA  StarType = "DA"
	ClassDAB StarType = "DAB"
	ClassDAV StarType = "DAV"
	ClassDAZ StarType = "DAZ"
	ClassDB  StarType = "DB"
	ClassDBV StarType = "DBV"
	ClassDBZ StarType = "DBZ"
	ClassDC  StarType = "DC"
	ClassDCV StarType = "DCV"
	ClassDQ  StarType = "DQ"
	// Brown dwarfs
	ClassL StarType = "L"
	ClassT StarType = "T"
	ClassY StarType = "Y"
	// Non-sequence
	ClassN StarType = "N"
	ClassH StarType = "H"
)

type EventScan struct {
	Timestamp             EventTimestamp
	Event                 EventType
	ScanType              ScanType
	Parents               []map[string]int
	BodyName              BodyName
	BodyID                BodyID
	StarSystem            StarSystem
	SystemAddress         SystemAddress
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
	WasDiscovered      bool
	WasMapped          bool

	// Star-specific
	StarType          StarType
	Subclass          int
	StellarMass       float64
	AbsoluteMagnitude float64
	Age_MY            float64
	Luminosity        string

	// Planet-specific
	TidalLock             bool
	TerraformState        TerraformState
	PlanetClass           PlanetClass
	Atmosphere            Atmosphere
	AtmosphereType        AtmosphereType
	AtmosphereComposition AtmosphereComposition
	Volcanism             Volcanism
	MassEM                float64
	SurfaceGravity        float64
	SurfacePressure       float64
	Landable              bool
	Materials             []NamePercentMap
	Composition           Composition
}
