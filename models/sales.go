package models

type ExplorationDataDiscovery struct {
	SystemName string
	NumBodies  int
}

type OrganicDataBioData struct {
	Genus   string `json:"Genus_Localised"`
	Species string `json:"Species_Localised"`
	Variant string `json:"Variant_Localised"`
	Value   int64
	Bonus   int64
}
