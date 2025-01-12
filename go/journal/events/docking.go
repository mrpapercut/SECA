package events

type StationType string
type StationName string
type StationGovernment string
type StationEconomy string
type StationService string
type StationLandingPads struct {
	Small  int
	Medium int
	Large  int
}

type EventDocked struct {
	Timestamp         EventTimestamp
	Event             EventType
	StationName       StationName
	StationType       StationType
	Taxi              bool
	Multicrew         bool
	StarSystem        StarSystem
	SystemAddress     SystemAddress
	MarketID          MarketID
	StationFaction    map[string]string
	StationGovernment StationGovernment `json:"StationGovernment_Localised"`
	StationServices   []StationService
	StationEconomy    StationEconomy `json:"StationEconomy_Localised"`
	DistFromStarLS    int64
	LandingPads       StationLandingPads
}

type EventUndocked struct {
	Timestamp   EventTimestamp
	Event       EventType
	StationName StationName
	StationType StationType
	MarketID    MarketID
	Taxi        bool
	Multicrew   bool
}

type EventEmbark struct {
	Timestamp     EventTimestamp
	Event         EventType
	SRV           bool
	Taxi          bool
	Multicrew     bool
	ID            int
	StarSystem    StarSystem
	SystemAddress SystemAddress
	Body          BodyName
	BodyID        BodyID
	OnStation     bool
	OnPlanet      bool
	StationName   StationName
	StationType   StationType
	MarketID      MarketID
}

type EventDisembark struct{}
