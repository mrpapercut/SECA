package events

type ExplorationDataDiscovery struct {
	SystemName string
	NumBodies  int
}

type EventMultiSellExplorationData struct {
	Timestamp     EventTimestamp
	Event         EventType
	Discovered    []ExplorationDataDiscovery
	BaseValue     int64
	Bonus         int64
	TotalEarnings int64
}

type OrganicDataBioData struct {
	Genus   string `json:"Genus_Localised"`
	Species string `json:"Species_Localised"`
	Variant string `json:"Variant_Localised"`
	Value   int64
	Bonus   int64
}

type EventSellOrganicData struct {
	Timestamp EventTimestamp
	Event     EventType
	MarketID  MarketID
	BioData   []OrganicDataBioData
}
